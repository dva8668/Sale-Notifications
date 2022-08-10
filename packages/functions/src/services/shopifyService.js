import Shopify from 'shopify-api-node';

export async function getOrdersFromShopify({shopifyDomain, accessToken}) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });
  return await shopify.order.list({limit: 30});
}

export async function getProductsFromShopify({
  shopifyDomain,
  accessToken,
  ids
}) {
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken: accessToken
  });

  if (ids.length === 0) return;
  return await shopify.product.list({
    ids: ids.join(',')
  });
}

export function getNotificationFromShopify({products, orders}) {
  return orders.map(order => {
    const item = order.line_items[0];
    const billing = order.billing_address;
    const product = products.find(product => product.id === item.product_id);
    const times = new Date(order.created_at);

    return {
      firstName: billing.first_name,
      city: billing.province,
      country: billing.country,
      productName: item.name,
      timestamp: times,
      productId: item.product_id,
      productImage: product.image.src,
      productUrl: order.referring_site
    };
  });
}
