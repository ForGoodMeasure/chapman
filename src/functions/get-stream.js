var axios = require('axios');
const API_KEY = 'AIzaSyBok4UR_gk7mc5AjclikV07ZmBcr0cSSWI';

exports.handler = function (event, context) {

  axios({
    method: 'GET',
    url: `https://www.googleapis.com/youtube/v3/liveBroadcasts?part=snippet&broadcastStatus=active&broadcastType=all&key=${API_KEY}`
  }).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err.response);
  })

};


exports.handler();
