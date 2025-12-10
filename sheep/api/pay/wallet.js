import request from '@/sheep/request';

/**
 * 支付钱包 API
 * 提供与支付钱包相关的接口
 * @author 北京智匠坊科技有限公司
 */
const PayWalletApi = {
  /**
   * 获取支付钱包信息
   * @returns {Promise} 返回钱包信息的请求 Promise
   */
  getPayWallet() {
    return request({
      url: '/pay/wallet/get', // 获取钱包信息的接口路径
      method: 'GET', // 请求方法为 GET
      custom: {
        showLoading: false, // 不展示加载提示
        auth: true, // 需要身份验证
      },
    });
  },

  /**
   * 获取钱包流水分页列表
   * @param {Object} params - 请求参数，包括分页和筛选条件
   * @returns {Promise} 返回钱包流水分页数据的请求 Promise
   */
  getWalletTransactionPage: (params) => {
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + params[key]) // 构建查询字符串
      .join('&');
    return request({
      url: `/pay/wallet-transaction/page?${queryString}`, // 获取钱包流水分页的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 获取钱包流水统计
   * @param {Object} params - 请求参数，包含时间范围
   * @returns {Promise} 返回钱包流水统计数据的请求 Promise
   */
  getWalletTransactionSummary: (params) => {
    const queryString = `createTime=${params.createTime[0]}&createTime=${params.createTime[1]}`; // 构建时间范围查询字符串
    return request({
      url: `/pay/wallet-transaction/get-summary?${queryString}`, // 获取钱包流水统计的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 获取钱包充值套餐列表
   * @returns {Promise} 返回充值套餐列表的请求 Promise
   */
  getWalletRechargePackageList: () => {
    return request({
      url: '/pay/wallet-recharge-package/list', // 获取钱包充值套餐的接口路径
      method: 'GET', // 请求方法为 GET
      custom: {
        showError: false, // 不展示错误提示
        showLoading: false, // 不展示加载提示
      },
    });
  },

  /**
   * 创建钱包充值记录（发起充值）
   * @param {Object} data - 充值请求数据
   * @returns {Promise} 返回充值操作的请求 Promise
   */
  createWalletRecharge: (data) => {
    return request({
      url: '/pay/wallet-recharge/create', // 创建充值记录的接口路径
      method: 'POST', // 请求方法为 POST
      data, // 请求体包含充值数据
    });
  },

  /**
   * 获取钱包充值记录分页列表
   * @param {Object} params - 请求参数，包括分页和筛选条件
   * @returns {Promise} 返回充值记录分页数据的请求 Promise
   */
  getWalletRechargePage: (params) => {
    return request({
      url: '/pay/wallet-recharge/page', // 获取钱包充值记录分页的接口路径
      method: 'GET', // 请求方法为 GET
      params, // 请求参数
      custom: {
        showError: false, // 不展示错误提示
        showLoading: false, // 不展示加载提示
      },
    });
  },
};

export default PayWalletApi;
