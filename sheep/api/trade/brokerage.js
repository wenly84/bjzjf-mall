import request from '@/sheep/request';

/**
 * 分销相关 API
 * 提供管理分销用户、分销记录、分销提现等功能
 * @author 北京智匠坊科技有限公司
 */
const BrokerageApi = {
  /**
   * 绑定分销用户
   * @param {Object} data - 绑定分销用户的数据
   * @returns {Promise} 返回绑定分销用户的请求 Promise
   */
  bindBrokerageUser: (data) => {
    return request({
      url: '/trade/brokerage-user/bind', // 绑定分销用户的接口路径
      method: 'PUT', // 请求方法为 PUT
      data, // 请求数据
    });
  },

  /**
   * 获取个人分销信息
   * @returns {Promise} 返回个人分销信息的请求 Promise
   */
  getBrokerageUser: () => {
    return request({
      url: '/trade/brokerage-user/get', // 获取个人分销信息的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 获取个人分销统计
   * @returns {Promise} 返回个人分销统计的请求 Promise
   */
  getBrokerageUserSummary: () => {
    return request({
      url: '/trade/brokerage-user/get-summary', // 获取个人分销统计的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 获取分销记录分页
   * @param {Object} params - 查询参数
   * @returns {Promise} 返回分销记录分页的请求 Promise
   */
  getBrokerageRecordPage: (params) => {
    // 如果没有指定状态，删除状态字段
    if (params.status === undefined) {
      delete params.status;
    }

    // 将查询参数转化为查询字符串
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + params[key])
      .join('&');

    return request({
      url: `/trade/brokerage-record/page?${queryString}`, // 获取分销记录分页的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 创建分销提现请求
   * @param {Object} data - 提现请求的数据
   * @returns {Promise} 返回创建分销提现的请求 Promise
   */
  createBrokerageWithdraw: (data) => {
    return request({
      url: '/trade/brokerage-withdraw/create', // 创建分销提现的接口路径
      method: 'POST', // 请求方法为 POST
      data, // 请求数据
    });
  },

  /**
   * 获取商品的分销金额
   * @param {string} spuId - 商品 ID
   * @returns {Promise} 返回商品的分销金额的请求 Promise
   */
  getProductBrokeragePrice: (spuId) => {
    return request({
      url: '/trade/brokerage-record/get-product-brokerage-price', // 获取商品分销金额的接口路径
      method: 'GET', // 请求方法为 GET
      params: { spuId }, // 商品 ID 作为查询参数
    });
  },

  /**
   * 获取分销用户排行（基于佣金）
   * @param {Object} params - 查询参数，包含时间区间
   * @returns {Promise} 返回分销用户排行的请求 Promise
   */
  getRankByPrice: (params) => {
    const queryString = `times=${params.times[0]}&times=${params.times[1]}`;
    return request({
      url: `/trade/brokerage-user/get-rank-by-price?${queryString}`, // 获取分销用户佣金排行的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 获取分销用户排行分页（基于佣金）
   * @param {Object} params - 查询参数
   * @returns {Promise} 返回分销用户佣金排行分页的请求 Promise
   */
  getBrokerageUserChildSummaryPageByPrice: (params) => {
    // 将查询参数转化为查询字符串
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + params[key])
      .join('&');

    return request({
      url: `/trade/brokerage-user/rank-page-by-price?${queryString}`, // 获取分销用户佣金排行分页的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 获取分销用户排行分页（基于用户量）
   * @param {Object} params - 查询参数
   * @returns {Promise} 返回分销用户用户量排行分页的请求 Promise
   */
  getBrokerageUserRankPageByUserCount: (params) => {
    // 将查询参数转化为查询字符串
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + params[key])
      .join('&');

    return request({
      url: `/trade/brokerage-user/rank-page-by-user-count?${queryString}`, // 获取分销用户用户量排行分页的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 获取下级分销统计分页
   * @param {Object} params - 查询参数
   * @returns {Promise} 返回下级分销统计分页的请求 Promise
   */
  getBrokerageUserChildSummaryPage: (params) => {
    return request({
      url: '/trade/brokerage-user/child-summary-page', // 获取下级分销统计分页的接口路径
      method: 'GET', // 请求方法为 GET
      params, // 查询参数
    });
  },
};

export default BrokerageApi;
