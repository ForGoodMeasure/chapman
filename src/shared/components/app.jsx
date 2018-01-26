import { Link } from 'found';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { localContextType } from '../util';

const VIDEO_ID = 'FH0qBWrug6Y';

const Style = styled.div`
  a {
    display: block;
  }
  .content {
    background: papayawhip;
    text-align: center;
    padding: 1em;
  }
  iframe {
    width: 100vw;
    height: 100vh;
    pointer-events: none;
  }
  .text {
    height: 100vh;
    position: fixed;
    color: white;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 13em;
    mix-blend-mode: soft-light;
    line-height: 0.9em;
    letter-spacing: 0.2em;
  }
`;

const App = (props, {localContext}) => {
  return (
    <Style>
      <iframe
        src={
          `https://www.youtube.com/embed/${ VIDEO_ID }?controls=0&autoplay=1&showinfo=0&modestbranding=1`
        }
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen />
    </Style>
  );
}

App.contextTypes = localContextType;

export default App;
