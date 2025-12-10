import request from '@/sheep/request';

/**
 * Apple 相关 API
 * @author 北京智匠坊科技有限公司
 */
export default {
  // 苹果相关功能
  apple: {
    /**
     * 第三方登录 - 使用苹果账号登录
     * @param {Object} data - 登录请求所需的数据
     * @returns {Promise} 请求返回的 Promise 对象
     */
    login: (data) =>
      request({
        url: 'third/apple/login', // 第三方登录接口路径
        method: 'POST', // 请求方法
        data, // 传递的数据
        custom: {
          showSuccess: true, // 登录成功后展示成功消息
          loadingMsg: '登陆中', // 登录中显示的消息
        },
      }),
  },
};
