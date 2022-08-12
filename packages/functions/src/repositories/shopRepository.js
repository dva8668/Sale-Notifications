import {Firestore} from '@google-cloud/firestore';
import Shopify from 'shopify-api-node';
import {checkIfExists} from '../helpers/checkIfExists';

const firestore = new Firestore();
const shopCollection = firestore.collection('shops');
const webhookAdress =
  'https://b289-117-6-131-199.ap.ngrok.io/webhook/order/new';
const ScripttagUrl = 'https://localhost:3000/scripttag/avada-sale-pop.min.js';

export async function getByShopifyDomain(shopifyDomain) {
  const listShops = await shopCollection
    .where('shopifyDomain', '==', shopifyDomain)
    .limit(1)
    .get();
  if (checkIfExists(listShops)) return;
  const doc = listShops.docs[0];

  return {
    ...doc.data(),
    id: doc.id
  };
}

export async function createWebHook({shopifyDomain, accessToken}) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });

  const listWebhook = await shopify.webhook.list();
  const appWebhook = listWebhook.find(
    webhook => webhook.address === webhookAdress
  );
  if (appWebhook) return;

  return await shopify.webhook.create({
    address: webhookAdress,
    topic: 'orders/create'
  });
}

export async function createScriptTag({shopifyDomain, accessToken}) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });
  const scriptTags = await shopify.scriptTag.list();
  const appScripttag = scriptTags.find(
    scripttag => scripttag.src === ScripttagUrl
  );

  if (appScripttag) return;

  return await shopify.scriptTag.create({
    event: 'onload',
    src: ScripttagUrl
  });
}
