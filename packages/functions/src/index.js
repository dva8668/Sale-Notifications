import * as functions from 'firebase-functions';
import apiHandler from './handlers/api';
import authHandler from './handlers/auth';
import webhookHandler from './handlers/webhook';
import clientApiHandler from './handlers/clientApi';

export const api = functions.https.onRequest(apiHandler.callback());
export const auth = functions.https.onRequest(authHandler.callback());
export const webhook = functions.https.onRequest(webhookHandler.callback());
export const clientApi = functions.https.onRequest(clientApiHandler.callback());
