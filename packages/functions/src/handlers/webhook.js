import App from 'koa';
import * as errorService from '../services/errorService';
import router from '../routes/webhook';
import cors from 'koa2-cors';

// Initialize all demand configuration for an application
const api = new App();
api.proxy = true;
api.use(
  cors({
    origin: function(ctx) {
      return '*';
    }
  })
);

// Register all routes for the application
api.use(router.allowedMethods());
api.use(router.routes());

// Handling all errors
api.on('error', errorService.handleError);

export default api;
