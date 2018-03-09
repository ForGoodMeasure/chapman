import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.aws_id,
  secretAccessKey: process.env.aws_key,
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

const restClient = (event, callback) => {

  const params = {
    TableName: 'chapman-test-2'
  };

  dynamodb.scan(params, (err, res) => {
    if (err) {
      return callback(err)
    }
    callback(null, {
      data: res.Items,
      total: res.Count
    })
  })
}

export default restClient;
