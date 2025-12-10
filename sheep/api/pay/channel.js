import request from '@/sheep/request';

/**
 * 支付渠道 API
 * 提供与支付渠道相关的接口
 * @author 北京智匠坊科技有限公司
 */
const PayChannelApi = {
  /**
   * 获取指定应用的已启用支付渠道编码列表
   * @param {string} appId - 应用的 ID
   * @returns {Promise} 返回请求的 Promise 对象，包含已启用的支付渠道编码列表
   */
  getEnableChannelCodeList: (appId) => {
    return request({
      url: '/pay/channel/get-enable-code-list', // 获取支付渠道编码列表的接口路径
      method: 'GET', // 请求方法为 GET
      params: { appId }, // 请求参数中包含应用 ID
    });
  },
};

export default PayChannelApi;
