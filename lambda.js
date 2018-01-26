/* eslint-disable no-var */
var app = require('./dist/server/server-bundle');
var getStream = require('./src/functions/get-stream.js');

exports.handler = function (event, context) {
  app.awsServerlessProxy(event, context)
};

exports.get = function (event, context, callback) {
  getStream((err, res) => {
    if (err) {
      return callback(null, {
          "isBase64Encoded": false,
          "statusCode": 500,
          "headers": {},
          "body": "Error" + err
      })
    }
    callback(null, {
      "isBase64Encoded": false,
      "statusCode": 200,
      "headers": {},
      "body": JSON.stringify(res)
    })
  });
};
