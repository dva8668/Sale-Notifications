import {addNotification} from '../repositories/notificationRepository';
import {
  getProductsFromShopify,
  getNotificationFromShopify
} from '../services/shopifyService';
import {getByShopifyDomain} from '../repositories/shopRepository';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shop = await getByShopifyDomain(shopifyDomain);
    const productId = orderData.line_items[0].product_id;

    const products = await getProductsFromShopify({
      shopifyDomain,
      accessToken: shop.accessToken,
      ids: [productId]
    });

    const notifications = getNotificationFromShopify({
      products,
      orders: [orderData]
    });

    await addNotification({
      shopId: shop.id,
      shopifyDomain,
      data: notifications[0]
    });

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
