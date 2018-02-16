/* eslint-disable no-var */
var app = require('./dist/server/server-bundle');
var getStream = require('./src/functions/get-stream.js');
var getBoards= require('./src/functions/get-boards.js');

const httpWrapper = handler => (event, context, callback) => {
  handler((err, res) => {
    if (err) {
      return callback(null, {
          "isBase64Encoded": false,
          "statusCode": 500,
          "headers": {
            'access-control-allow-origin': '*'
          },
          "body": "Error" + err
      })
    }
    callback(null, {
      "isBase64Encoded": false,
      "statusCode": 200,
      "headers": {
        'access-control-allow-origin': '*'
      },
      "body": JSON.stringify(res)
    })
  });
}

exports.handler = function (event, context) {
  app.awsServerlessProxy(event, context)
};

exports.getStream = httpWrapper(getStream);
exports.getBoards = httpWrapper(getBoards);
