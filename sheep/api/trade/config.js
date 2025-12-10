import request from '@/sheep/request';

/**
 * 交易配置相关 API
 * 提供获取交易配置的功能
 * @author 北京智匠坊科技有限公司
 */
const TradeConfigApi = {
  /**
   * 获取交易配置
   * @returns {Promise} 返回获取交易配置的请求 Promise
   */
  getTradeConfig: () => {
    return request({
      url: '/trade/config/get', // 获取交易配置的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },
};

export default TradeConfigApi;
