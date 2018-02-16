import React from 'react';
import dotty from 'dotty';
import { Redirect } from 'found';
import axios from 'axios';

import App from './components/app.jsx';
import Admin from './components/admin.jsx';

export const routeConfig = [
    {
      path: '/admin',
      Component: Admin
    },
    {
      path: '/:string?',
      Component: App,
      getData: () => axios({
        method: 'get',
        url: "https://eywsik7fe7.execute-api.us-east-1.amazonaws.com/dev/get-stream"
      })
    }
];
