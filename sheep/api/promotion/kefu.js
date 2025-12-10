import request from '@/sheep/request';

/**
 * 客服相关 API
 * 提供发送消息和获取客服消息分页功能
 * @author 北京智匠坊科技有限公司
 */
const KeFuApi = {
  /**
   * 发送客服消息
   * @param {Object} data - 发送的消息内容
   * @returns {Promise} 返回发送消息请求的 Promise
   */
  sendKefuMessage: (data) => {
    return request({
      url: '/promotion/kefu-message/send', // 发送客服消息的接口路径
      method: 'POST', // 请求方法为 POST
      data, // 请求体，包含发送的消息内容
      custom: {
        auth: true, // 请求需要认证
        showLoading: true, // 显示加载提示
        loadingMsg: '发送中', // 加载时显示的提示信息
        showSuccess: true, // 请求成功后显示成功提示
        successMsg: '发送成功', // 请求成功时显示的提示信息
      },
    });
  },

  /**
   * 获取客服消息分页
   * @param {Object} params - 分页请求参数（如 pageNo, pageSize 等）
   * @returns {Promise} 返回客服消息分页的请求 Promise
   */
  getKefuMessagePage: (params) => {
    return request({
      url: '/promotion/kefu-message/page', // 获取客服消息分页的接口路径
      method: 'GET', // 请求方法为 GET
      params, // 请求参数，包含分页信息
      custom: {
        auth: true, // 请求需要认证
        showLoading: false, // 不显示加载提示
      },
    });
  },
};

export default KeFuApi;
