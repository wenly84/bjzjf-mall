// 开发环境配置
export let baseUrl;
export let version;
if (process.env.NODE_ENV === 'development') {
  baseUrl = import.meta.env.ZJFSHOP_DEV_BASE_URL;
} else {
  baseUrl = import.meta.env.ZJFSHOP_BASE_URL;
}
version = import.meta.env.ZJFSHOP_VERSION;
console.log(`[智匠坊商城 ${version}]  https://www.hansi.site`);

export const apiPath = import.meta.env.ZJFSHOP_API_PATH;
export const staticUrl = import.meta.env.ZJFSHOP_STATIC_URL;
export const tenantId = import.meta.env.ZJFSHOP_TENANT_ID;
export const websocketPath = import.meta.env.ZJFSHOP_WEBSOCKET_PATH;

export default {
  baseUrl,
  apiPath,
  staticUrl,
  tenantId,
  websocketPath,
};
