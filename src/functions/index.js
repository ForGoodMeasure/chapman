var getStream = require('./get-stream.js').default;
var restClient = require('./rest-client.js').default;

const httpWrapper = handler => (event, context, callback) => {
  handler(event, (err, res) => {
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

exports.getStream = httpWrapper(getStream);
exports.restClient = httpWrapper(restClient);
