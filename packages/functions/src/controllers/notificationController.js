import {getNotification} from '../repositories/notificationRepository';
import getCurrentUserInstance from '../helpers/auth';
import moment from 'moment';
import {getSetting} from '../repositories/settingsRepository';
import {getByShopifyDomain} from '../repositories/shopRepository';

export async function getNotifications(ctx) {
  try {
    const {shopID} = getCurrentUserInstance(ctx);
    const sort = ctx.query.sort;

    const [notifications, settings] = await Promise.all([
      getNotification({
        key: 'shopId',
        value: shopID,
        sort
      }),
      getSetting(shopID)
    ]);

    ctx.status = 200;
    return (ctx.body = {
      success: true,
      data: notifications.map(notification => {
        return {
          ...notification,
          id: notification.order_id
        };
      })
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}

export async function getNotificationByShopifyDomain(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const shop = await getByShopifyDomain(shopifyDomain);

    const [notifications, settings] = await Promise.all([
      getNotification({
        key: 'shopifyDomain',
        value: shopifyDomain
      }),
      getSetting(shop.id)
    ]);

    ctx.status = 200;
    return (ctx.body = {
      notifications: notifications.map(data => {
        return {
          id: data.order_id,
          relativeDate: moment(data.timestamp).fromNow(),
          productId: data.productId,
          productName: data.productName,
          productImage: data.productImage,
          firstName: data.firstName,
          city: data.city,
          country: data.country,
          productUrl: data.productUrl,
        };
      }),
      settings: settings
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      data: [],
      error: e.message
    };
  }
}
