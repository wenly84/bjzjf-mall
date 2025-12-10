// authUtil.js
import request from '@/sheep/request';

/**
 * AuthUtil - 用户认证相关的 API 接口封装
 * @author 北京智匠坊科技有限公司
 */
const AuthUtil = {
  /**
   * 使用手机 + 密码登录
   * @param {Object} data - 包含手机号和密码的登录信息
   * @returns {Promise} 返回登录结果的 Promise
   */
  login: (data) => {
    return request({
      url: '/member/auth/login', // 登录接口地址
      method: 'POST', // 使用 POST 方法提交登录信息
      data, // 登录数据（手机号 + 密码）
      custom: {
        showSuccess: true, // 登录成功后是否展示成功提示
        loadingMsg: '登录中', // 登录过程中显示的提示信息
        successMsg: '登录成功', // 登录成功后的提示信息
      },
    });
  },

  /**
   * 使用手机 + 验证码登录
   * @param {Object} data - 包含手机号和验证码的登录信息
   * @returns {Promise} 返回登录结果的 Promise
   */
  smsLogin: (data) => {
    return request({
      url: '/member/auth/sms-login', // 验证码登录接口地址
      method: 'POST', // 使用 POST 方法提交登录信息
      data, // 登录数据（手机号 + 验证码）
      custom: {
        showSuccess: true, // 登录成功后是否展示成功提示
        loadingMsg: '登录中', // 登录过程中显示的提示信息
        successMsg: '登录成功', // 登录成功后的提示信息
      },
    });
  },

  /**
   * 发送手机验证码
   * @param {String} mobile - 用户手机号
   * @param {String} scene - 验证码场景（例如注册、登录等）
   * @returns {Promise} 返回发送验证码结果的 Promise
   */
  sendSmsCode: (mobile, scene) => {
    return request({
      url: '/member/auth/send-sms-code', // 发送验证码接口地址
      method: 'POST', // 使用 POST 方法发送验证码请求
      data: {
        mobile, // 用户手机号
        scene, // 验证码场景
      },
      custom: {
        loadingMsg: '发送中', // 发送验证码时的加载提示
        showSuccess: true, // 是否展示成功提示
        successMsg: '发送成功', // 发送成功的提示信息
      },
    });
  },

  /**
   * 登出系统
   * @returns {Promise} 返回登出结果的 Promise
   */
  logout: () => {
    return request({
      url: '/member/auth/logout', // 登出接口地址
      method: 'POST', // 使用 POST 方法提交登出请求
    });
  },

  /**
   * 刷新令牌
   * @param {String} refreshToken - 刷新令牌
   * @returns {Promise} 返回刷新令牌结果的 Promise
   */
  refreshToken: (refreshToken) => {
    return request({
      url: '/member/auth/refresh-token', // 刷新令牌接口地址
      method: 'POST', // 使用 POST 方法提交刷新令牌请求
      params: { refreshToken }, // 刷新令牌作为请求参数
      custom: {
        loading: false, // 不显示加载提示
        showError: false, // 不展示错误提示
      },
    });
  },

  /**
   * 社交授权的跳转
   * @param {String} type - 授权类型（如微信、QQ等）
   * @param {String} redirectUri - 授权完成后的重定向 URI
   * @returns {Promise} 返回授权跳转的 Promise
   */
  socialAuthRedirect: (type, redirectUri) => {
    return request({
      url: '/member/auth/social-auth-redirect', // 社交授权跳转接口
      method: 'GET', // 使用 GET 方法请求授权跳转
      params: { type, redirectUri }, // 授权类型和重定向地址
      custom: {
        showSuccess: true, // 成功后是否显示提示
        loadingMsg: '登陆中', // 授权登录中的加载提示
      },
    });
  },

  /**
   * 社交快捷登录
   * @param {String} type - 授权类型（如微信、QQ等）
   * @param {String} code - 社交平台返回的登录凭证
   * @param {String} state - 状态值
   * @returns {Promise} 返回社交登录结果的 Promise
   */
  socialLogin: (type, code, state) => {
    return request({
      url: '/member/auth/social-login', // 社交登录接口地址
      method: 'POST', // 使用 POST 方法进行社交登录
      data: { type, code, state }, // 提交社交平台登录凭证
      custom: {
        showSuccess: true, // 登录成功后是否展示成功提示
        loadingMsg: '登陆中', // 登录中的加载提示
      },
    });
  },

  /**
   * 微信小程序的一键登录
   * @param {String} phoneCode - 手机验证码
   * @param {String} loginCode - 登录凭证
   * @param {String} state - 状态值
   * @returns {Promise} 返回一键登录结果的 Promise
   */
  weixinMiniAppLogin: (phoneCode, loginCode, state) => {
    return request({
      url: '/member/auth/weixin-mini-app-login', // 微信小程序登录接口地址
      method: 'POST', // 使用 POST 方法进行登录
      data: { phoneCode, loginCode, state }, // 提交微信登录凭证
      custom: {
        showSuccess: true, // 登录成功后是否展示成功提示
        loadingMsg: '登陆中', // 登录过程中的加载提示
        successMsg: '登录成功', // 登录成功的提示信息
      },
    });
  },

  /**
   * 创建微信 JS SDK 初始化所需的签名
   * @param {String} url - 当前页面的 URL
   * @returns {Promise} 返回签名结果的 Promise
   */
  createWeixinMpJsapiSignature: (url) => {
    return request({
      url: '/member/auth/create-weixin-jsapi-signature', // 获取微信签名的接口地址
      method: 'POST', // 使用 POST 方法请求签名
      params: { url }, // 当前页面 URL 作为请求参数
      custom: {
        showError: false, // 不显示错误提示
        showLoading: false, // 不显示加载提示
      },
    });
  },
};

export default AuthUtil;
