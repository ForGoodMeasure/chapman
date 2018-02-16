
import google from 'googleapis'
import dotty from 'dotty';

const CLIENT_ID = "60031795940-9nsghhd263ve2nfclonbkqcsdjbc9rum.apps.googleusercontent.com";
const CLIENT_SECRET = "Aafp_MfAV_9c52_LpJb6dXTL";
const REDIRECT_URL = "localhost:3000/redirect";
const ACCESS_TOKEN = "ya29.GltOBYWdH3a1nB923X_dDxWoFnx5JbjpZGZo1pd35Ao0UWZCQ87mU3jU3YDlXzYJcxk254xt7CfJAWg9m9g1XEhJj9plI48rEeOvg2nB6Psh_1_1JCZQ0wPdfdZ9";
const REFRESH_TOKEN = "1/rBsyJkY_iDeKURqFJnDXy0KokrLgRsPKIVFIixukcYE"

export default function getStream(callback) {

  const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URL
  );

  oauth2Client.setCredentials({
    access_token: ACCESS_TOKEN,
    refresh_token: REFRESH_TOKEN
  });

  var youtube = google.youtube({
    version: 'v3',
    auth: oauth2Client
  });

  youtube.liveBroadcasts.list({
    part: 'contentDetails,snippet',
    broadcastType: 'all',
    broadcastStatus: 'active'
  }, (err, res) => {
    if (err) {
      return callback(err);
    }
    callback(null, dotty.get(res, 'data.items.0'));
  });

};
