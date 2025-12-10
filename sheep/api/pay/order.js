import request from '@/sheep/request';

/**
 * 支付订单 API
 * 提供与支付订单相关的接口
 * @author 北京智匠坊科技有限公司
 */
const PayOrderApi = {
  /**
   * 获取支付订单信息
   * @param {string} id - 支付订单的 ID
   * @returns {Promise} 返回请求的 Promise 对象，包含支付订单的详细信息
   */
  getOrder: (id) => {
    return request({
      url: '/pay/order/get', // 获取支付订单的接口路径
      method: 'GET', // 请求方法为 GET
      params: { id }, // 请求参数中包含支付订单的 ID
    });
  },

  /**
   * 提交支付订单
   * @param {Object} data - 提交的支付订单数据
   * @returns {Promise} 返回请求的 Promise 对象，表示支付订单的提交状态
   */
  submitOrder: (data) => {
    return request({
      url: '/pay/order/submit', // 提交支付订单的接口路径
      method: 'POST', // 请求方法为 POST
      data, // 请求体中包含支付订单数据
    });
  },
};

export default PayOrderApi;
