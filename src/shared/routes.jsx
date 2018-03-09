import React from 'react';
import dotty from 'dotty';
import { Redirect } from 'found';
import axios from 'axios';

import App from './components/app.jsx';
import Admin from './components/admin.jsx';

export const routeConfig = stageContext => [
    {
      path: '/admin',
      Component: Admin
    },
    {
      path: '/',
      Component: App,
      getData: () => axios({
        method: 'get',
        url: `${ stageContext.apiBase }/get-stream`
      })
    }
];
