import Router from 'koa-router';
import * as notificationController from '../controllers/notificationController';
import {verifyRequest} from '@avada/shopify-auth';
import * as settingController from '../controllers/settingsController';
const router = new Router({
  prefix: '/api'
});

router.use(verifyRequest());
router.get('/settings', settingController.get);
router.put('/settings', settingController.putSettings);
router.get('/notifications', notificationController.getNotifications);

export default router;
