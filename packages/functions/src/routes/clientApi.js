import Router from 'koa-router';

import * as notificationController from '../controllers/notificationController';

const router = new Router({
  prefix: '/clientApi'
});

router.get(
  '/notifications',
  notificationController.getNotificationByShopifyDomain
);

export default router;
