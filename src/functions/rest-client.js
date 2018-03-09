import util from 'util';
import AWS from 'aws-sdk';
import uuid from 'uuid/v4';

const MAP_TYPE_TO_TABLE = {
  'posts': 'chapman-test-3'
};

AWS.config.update({
  accessKeyId: process.env.aws_id,
  secretAccessKey: process.env.aws_key,
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

const restClient = (event, callback) => {
  const { type, params, resource } = JSON.parse(event.body);
  const executeFunction = fn => fn( MAP_TYPE_TO_TABLE[resource], params, callback);

  switch (type) {
    case 'GET_LIST':
      return executeFunction(getList);
    case 'GET_ONE':
      return executeFunction(getOne);
    case 'CREATE':
      return executeFunction(createItem);
    case 'UPDATE':
      return executeFunction(updateItem);
    case 'DELETE':
      return executeFunction(deleteItem);
    case 'GET_MANY':
      return executeFunction(getMany);
    case 'GET_MANY_REFERENCE':
      return executeFunction(getManyReference);
  }
}

function getList(table, params, callback) {
  const args = {
    TableName: table
  };
  dynamodb.scan(args, (err, res) => {
    if (err) {
      return callback(err)
    }
    callback(null, {
      data: res.Items,
      total: res.Count
    })
  });
}

function createItem(table, params, callback) {
  const item = params.data;
  const args = {
    TableName: table,
    Item: {
      id: uuid(),
      ...item
    }
  };
  dynamodb.put(args, (err, res) => {
    if (err) {
      return callback(err)
    }
    callback(null, {
      data: args.Item
    })
  })
}

function getOne(table, params, callback) {
  const id = params.id;
  const args = {
    TableName: table,
    Key: { id }
  };
  dynamodb.get(args, (err, res) => {
    if (err) {
      return callback(err)
    }
    callback(null, {
      data: res.Item
    })
  });
}

function getMany(table, params, callback) {
  const ids = params.ids;
  const args = {
    RequestItems: {
      [table]: {
        Keys: ids.map( id => ({ id }))
      }
    }
  }
  dynamodb.batchGet(args, (err, res) => {
    if (err) {
      return callback(err)
    }
    callback(null, {
      data: res.Responses[table]
    })
  });
}

export default restClient;
