import express from 'express';

import restClient from '../functions/rest-client';
import getStream from '../functions/get-stream';
import getBoards from '../functions/get-boards';

const app = express();

const apiGatewayRequest = (req) => ({
    "resource": "/",
    "path": req.url,
    "httpMethod": req.method,
    "headers": {
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-GB,en-US;q=0.8,en;q=0.6,zh-CN;q=0.4",
        "cache-control": "max-age=0"
    },
    "queryStringParameters": null,
    "pathParameters": null,
    "stageVariables": null,
    "requestContext": {},
    "body": JSON.stringify(req.body),
    "isBase64Encoded": false
})

app.post('/rest-client', (req, res, next) => {
  restClient(apiGatewayRequest(req), (err, response) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).send(response)
  })
});

export default app;
