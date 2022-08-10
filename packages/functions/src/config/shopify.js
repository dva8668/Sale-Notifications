import * as functions from 'firebase-functions';

export default {
  apiKey: functions.config().shopify.api_key,
  firebaseApiKey: functions.config().shopify.firebase_api_key,
  scopes: [
    'read_themes',
    'write_themes',
    'read_orders',
    'write_orders',
    'read_products',
    'write_products',
    'read_script_tags',
    'write_script_tags'
  ],
  secret: functions.config().shopify.secret
};
