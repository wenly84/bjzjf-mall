// socialApi.js
import request from '@/sheep/request';

/**
 * SocialApi - 社交用户相关的 API 接口封装
 * @author 北京智匠坊科技有限公司
 */
const SocialApi = {
  /**
   * 获取社交用户信息
   * @param {String} type - 社交平台类型，如 "wechat", "qq" 等
   * @returns {Promise} 返回获取社交用户信息的 Promise
   */
  getSocialUser: (type) => {
    return request({
      url: '/member/social-user/get',
      method: 'GET',
      params: { type },
      custom: {
        showLoading: false, // 请求时不显示加载动画
      },
    });
  },

  /**
   * 社交用户绑定
   * @param {String} type - 社交平台类型
   * @param {String} code - 社交平台授权返回的 code
   * @param {String} state - 附加的 state 参数
   * @returns {Promise} 返回绑定结果的 Promise
   */
  socialBind: (type, code, state) => {
    return request({
      url: '/member/social-user/bind',
      method: 'POST',
      data: { type, code, state },
      custom: {
        showSuccess: true, // 请求成功时显示成功提示
        loadingMsg: '绑定中', // 加载时的提示消息
        successMsg: '绑定成功', // 成功后的提示消息
      },
    });
  },

  /**
   * 社交用户解绑
   * @param {String} type - 社交平台类型
   * @param {String} openid - 社交平台用户的唯一标识
   * @returns {Promise} 返回解绑结果的 Promise
   */
  socialUnbind: (type, openid) => {
    return request({
      url: '/member/social-user/unbind',
      method: 'DELETE',
      data: { type, openid },
      custom: {
        showLoading: false, // 请求时不显示加载动画
        loadingMsg: '解除绑定', // 加载时的提示消息
        successMsg: '解绑成功', // 成功后的提示消息
      },
    });
  },

  /**
   * 获取订阅消息模板列表
   * @returns {Promise} 返回订阅消息模板列表的 Promise
   */
  getSubscribeTemplateList: () =>
    request({
      url: '/member/social-user/get-subscribe-template-list',
      method: 'GET',
      custom: {
        showError: false, // 请求失败时不显示错误提示
        showLoading: false, // 请求时不显示加载动画
      },
    }),

  /**
   * 获取微信小程序二维码
   * @param {String} path - 小程序页面路径
   * @param {String} query - 生成二维码时携带的参数
   * @returns {Promise} 返回二维码生成结果的 Promise
   */
  getWxaQrcode: async (path, query) => {
    return await request({
      url: '/member/social-user/wxa-qrcode',
      method: 'POST',
      data: {
        scene: query,
        path,
        checkPath: false, // TODO: 开发环境暂不检查 path 是否存在
      },
    });
  },
};

export default SocialApi;
