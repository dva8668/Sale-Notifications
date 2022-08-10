import App from 'koa';
import 'isomorphic-fetch';
import {shopifyAuth} from '@avada/shopify-auth';
import shopifyConfig from '../config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '../middleware/errorHandler';
import firebase from 'firebase-admin';
import * as errorService from '../services/errorService';
import api from './api';
import {syncNotifications, syncDefaultSettings} from '../services/syncService';
import {
  getByShopifyDomain,
  createWebHook,
  createScriptTag
} from '../repositories/shopRepository';

if (firebase.apps.length === 0) {
  firebase.initializeApp();
}

// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    initialPlan: {
      features: {},
      id: 'free',
      name: 'Free plan',
      periodDays: 3650,
      price: 0,
      trialDays: 0
    },
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/',
    afterInstall: async ctx => {
      try {
        const shopifyDomain = ctx.state.shopify.shop;
        const shop = await getByShopifyDomain(shopifyDomain);
        await Promise.all([
          syncDefaultSettings({
            shopId: shop.id,
            shopifyDomain
          }),
          syncNotifications({
            shopifyDomain,
            shopId: shop.id,
            accessToken: shop.accessToken
          }),
          createWebHook({
            shopifyDomain,
            accessToken: shop.accessToken
          }),
          createScriptTag({
            shopifyDomain,
            accessToken: shop.accessToken
          })
        ]);
      } catch (e) {
        ctx.body = {
          success: false,
          error: e.message
        };
      }
    }
  }).routes()
);

// Handling all errors
api.on('error', errorService.handleError);

export default app;
