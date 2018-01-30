import React from 'react';
import scaffold from './scaffold.js';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components'
import { Provider } from 'react-redux';
import { RouterProvider } from 'found/lib/server';
import { Actions as FarceActions, ServerProtocol } from 'farce';
import { getStoreRenderArgs, resolver, RedirectException } from 'found';
import serialize from 'serialize-javascript';

import getLocalContext from './get-local-context';
import withLocalContext from './with-local-context';
import getStageContext from './get-stage-context';
import { fetchSiteContent } from './rw-site-content';
import getMetaContent from './get-meta-content';
import render from './found-render';

function renderPage({
  locals,
  scaffolder=scaffold,
  store,
  renderArgs,
  globalStyles,
  metaContent,
  noSSR
}) {
  const localContext = getLocalContext(locals);
  globalStyles(localContext);

  /*
    Render React application root
  */
  const RouterContext = props => (
    <Provider store={store}>
      <RouterProvider router={renderArgs.router}>
        { render(renderArgs) }
      </RouterProvider>
    </Provider>
  );

  const RouterContextWithLocalContext = withLocalContext(
    RouterContext,
    localContext
  );

  const styleSheet = new ServerStyleSheet();
  const appContent = noSSR ? '' : renderToString(
    styleSheet.collectStyles(<RouterContextWithLocalContext />)
  );

  /*
    Inject app content into the HTML scaffold
  */
  return scaffolder(
    {localContext, styleSheet, metaContent},
    appContent
  );
}

const serverRenderer = (genStore, config, globalStyles) => (req, res) => {

  const stageContext = getStageContext(config, req);

  const store = genStore(new ServerProtocol(req.url));
  store.dispatch(FarceActions.init());
  const matchContext = { store };

  getStoreRenderArgs({
    store,
    matchContext,
    resolver
  }).then(renderArgs => {

    if (renderArgs.error) {
      return res.status(renderArgs.error.status).end();
    }

    fetchSiteContent(config, (err, content) => {
      const html = renderPage({
        locals: {
          stageContext,
          content,
          storeState: serialize(store.getState())
        },
        store,
        renderArgs,
        globalStyles,
        metaContent: getMetaContent(config),
        noSSR: Boolean(config.global.noSSR)
      });

      res.status(200).send(html);
    });

  })
    .catch(e => {
      console.log(e);
    });

};

export default serverRenderer;
