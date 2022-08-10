import {Firestore} from '@google-cloud/firestore';
import {
  getOrdersFromShopify,
  getProductsFromShopify,
  getNotificationFromShopify
} from '../services/shopifyService';
import {checkIfExists} from '../helpers/checkIfExists';
import {
  addNotification,
  deleteAllNotification
} from '../repositories/notificationRepository';
import defaultSettings from '../config/defaultSettings';

const firestore = new Firestore();
const settingCollection = firestore.collection('settings');
const notificationCollection = firestore.collection('notifications');

export async function syncNotifications({shopifyDomain, shopId, accessToken}) {
  const notifications = await notificationCollection
    .where('shopId', '==', shopId)
    .get();

  if (!checkIfExists(notifications)) {
    await deleteAllNotification(notifications);
  }

  const orders = await getOrdersFromShopify({shopifyDomain, accessToken});
  const ids = [...new Set(orders.map(order => order.line_items[0].product_id))];
  const products = await getProductsFromShopify({
    shopifyDomain,
    accessToken,
    ids
  });
  const getNotifications = getNotificationFromShopify({orders, products});

  return Promise.all(
    getNotifications.map(notification =>
      addNotification({shopId, shopifyDomain, data: notification})
    )
  );
}

export async function syncDefaultSettings({shopId}) {
  const settings = await settingCollection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  if (!checkIfExists(settings)) return;
  return settingCollection.add({
    ...defaultSettings,
    shopId: shopId,
    shopifyDomain: shopifyDomain
  });
}
