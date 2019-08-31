require('dotenv').config();
const _ = require('lodash');
const axios = require('axios');

const fbGraphUrl = process.env.FACEBOOK_BASE_URL || 'https://graph.facebook.com/v4.0';
const fbAppId = process.env.FACEBOOK_APP_ID || '';
const fbAppSecret = process.env.FACEBOOK_APP_SECRET || '';

function getFacebookEndpoint (url, accessToken = false, haveQuery = true, needAppId = false, needAppSecret = false) {
  let endpoint = `${fbGraphUrl}${url}${haveQuery ? '&' : '?'}${accessToken ? 'access_token='+ accessToken : ''}${needAppId ? '&client_id='+ fbAppId : ''}${needAppSecret ? '&client_secret=' + fbAppSecret : ''}`;
  console.log('endpoint', endpoint);
  return endpoint;
}

module.exports = {
  verifyClientToken: async (token) => {
    try {
      return await axios({
        method: 'get',
        url: getFacebookEndpoint(`/oauth/access_token?grant_type=fb_exchange_token&fb_exchange_token=${token}`, false, true, true, true)
      });
    } catch (e) {
      console.log('facebook call error', e.response.data.error.message);
      return e;
    }
  },
};
