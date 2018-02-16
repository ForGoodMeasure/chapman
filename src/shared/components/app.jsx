import { Link } from 'found';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { localContextType } from '../util';

const VIDEO_ID = 'FH0qBWrug6Y';

const Style = styled.div`
  cursor: pointer;
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

  /* youtube object-fit https://codepen.io/cvn/pen/WbXEoX/ */
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .video-bg {
    background: white;
    position: absolute;
    top: 0; right: 0; bottom: 0; left: 0;
    z-index: 1;
    /* overflow: hidden; */
  }
  .video-bg .video-fg,
  .video-bg iframe,
  .video-bg video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  /*
    Full page video background
    Simulate object-fit: cover
    Based on http://fvsch.com/code/video-background/
  */

  @media (min-aspect-ratio: 16/9) {
    .video-bg.cover .video-fg { height: 300%; top: -100%; }
  }
  @media (max-aspect-ratio: 16/9) {
    .video-bg.cover .video-fg { width: 300%; left: -100%; }
  }

  @supports (object-fit: cover) {
    .video-bg.cover .video-fg.supports-cover {
      width: 100%;
      height: 100%;
      top: 0; left: 0;
    }
    .video-bg.cover video {
      object-fit: cover;
    }
  }

`;


class App extends React.Component {



  componentDidMount() {
    initBadTv();
  }

  render () {
    const props = this.props;
    if (!props.data.data.id) {
      return <div />;
    }
    return (
      <Style>
        <div className="container">
          <div className="video-bg cover">
            <div className="video-fg">
              <iframe
                src={
                  `https://www.youtube.com/embed/${ props.data.data.id }?controls=0&autoplay=1&showinfo=0&modestbranding=1`
                }
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen />
            </div>
          </div>
        </div>
        <div id="bad-tv-root" />
      </Style>
    );
  }

}

App.contextTypes = localContextType;

export default App;
