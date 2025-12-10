import request from '@/sheep/request';

/**
 * DIY 模板和页面相关 API
 * 提供获取已使用的 DIY 模板、DIY 模板详情、DIY 页面等功能
 * @author 北京智匠坊科技有限公司
 */
const DiyApi = {
  /**
   * 获取已使用的 DIY 模板
   * @returns {Promise} 返回已使用 DIY 模板的请求 Promise
   */
  getUsedDiyTemplate: () => {
    return request({
      url: '/promotion/diy-template/used', // 获取已使用的 DIY 模板接口路径
      method: 'GET', // 请求方法为 GET
      custom: {
        showError: false, // 不展示错误提示
        showLoading: false, // 不显示加载提示
      },
    });
  },

  /**
   * 获取 DIY 模板详情
   * @param {string|number} id - DIY 模板的 ID
   * @returns {Promise} 返回 DIY 模板详情的请求 Promise
   */
  getDiyTemplate: (id) => {
    return request({
      url: '/promotion/diy-template/get', // 获取 DIY 模板详情的接口路径
      method: 'GET', // 请求方法为 GET
      params: { id }, // 请求参数，包含 DIY 模板 ID
      custom: {
        showError: false, // 不展示错误提示
        showLoading: false, // 不显示加载提示
      },
    });
  },

  /**
   * 获取 DIY 页面详情
   * @param {string|number} id - DIY 页面 ID
   * @returns {Promise} 返回 DIY 页面详情的请求 Promise
   */
  getDiyPage: (id) => {
    return request({
      url: '/promotion/diy-page/get', // 获取 DIY 页面详情的接口路径
      method: 'GET', // 请求方法为 GET
      params: { id }, // 请求参数，包含 DIY 页面 ID
    });
  },
};

export default DiyApi;
