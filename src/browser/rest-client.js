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
