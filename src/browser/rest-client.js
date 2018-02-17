import axios from 'axios';
import dotty from 'dotty';

const restClient = config => (type, resource, params) => {

  const API_BASE = dotty.get(config, 'apiBase');

  return axios({
    method: 'POST',
    url: `${ API_BASE }/rest-client`,
    data: {
      type,
      resource,
      params
    }
  }).then(response => response.data)
}

export default restClient;

// switch type {
//   case 'GET_LIST':
//   case 'GET_ONE':
//   case 'CREATE':
//   case 'UPDATE':
//   case 'DELETE':
//   case 'GET_MANY':
//   case 'GET_MANY_REFERENCE':
// }
