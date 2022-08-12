import {getSetting, updatesSetting} from '../repositories/settingsRepository';
import getCurrentUserInstance from '../helpers/auth';

export async function get(ctx) {
  try {
    const {shopID} = getCurrentUserInstance(ctx);
    const data = await getSetting(shopID);
    return (ctx.body = {
      success: true,
      data: data
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}

export async function putSettings(ctx) {
  try {
    const requestData = ctx.req.body;
    const {shopID} = getCurrentUserInstance(ctx);
    const data = await updatesSetting(shopID, requestData);
    return (ctx.body = {
      success: true
    });
  } catch (e) {
    ctx.status = 404;
    ctx.body = {
      success: false,
      error: e.message
    };
  }
}
