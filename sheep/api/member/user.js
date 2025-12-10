// userApi.js
import request from '@/sheep/request';

/**
 * UserApi - 用户相关的 API 接口封装
 * @author 北京智匠坊科技有限公司
 */
const UserApi = {
  /**
   * 获取用户基本信息
   * @returns {Promise} 返回用户基本信息的 Promise
   */
  getUserInfo: () => {
    return request({
      url: '/member/user/get',
      method: 'GET',
      custom: {
        showLoading: false, // 请求时不显示加载动画
        auth: true, // 需要认证
      },
    });
  },

  /**
   * 更新用户基本信息
   * @param {Object} data - 要更新的用户信息
   * @returns {Promise} 返回更新结果的 Promise
   */
  updateUser: (data) => {
    return request({
      url: '/member/user/update',
      method: 'PUT',
      data,
      custom: {
        auth: true, // 需要认证
        showSuccess: true, // 更新成功后显示成功提示
        successMsg: '更新成功', // 成功后的提示信息
      },
    });
  },

  /**
   * 修改用户手机号码
   * @param {Object} data - 包含手机号码的修改数据
   * @returns {Promise} 返回修改结果的 Promise
   */
  updateUserMobile: (data) => {
    return request({
      url: '/member/user/update-mobile',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中', // 显示加载中的提示信息
        showSuccess: true, // 显示成功提示
        successMsg: '修改成功', // 修改成功后的提示信息
      },
    });
  },

  /**
   * 基于微信小程序的授权码修改用户手机号码
   * @param {String} code - 微信小程序返回的授权码
   * @returns {Promise} 返回修改结果的 Promise
   */
  updateUserMobileByWeixin: (code) => {
    return request({
      url: '/member/user/update-mobile-by-weixin',
      method: 'PUT',
      data: { code },
      custom: {
        showSuccess: true, // 显示成功提示
        loadingMsg: '获取中', // 加载中的提示信息
        successMsg: '修改成功', // 修改成功后的提示信息
      },
    });
  },

  /**
   * 更新用户密码
   * @param {Object} data - 包含新密码的修改数据
   * @returns {Promise} 返回修改结果的 Promise
   */
  updateUserPassword: (data) => {
    return request({
      url: '/member/user/update-password',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中', // 显示验证中的提示信息
        showSuccess: true, // 显示成功提示
        successMsg: '修改成功', // 修改成功后的提示信息
      },
    });
  },

  /**
   * 重置用户密码
   * @param {Object} data - 包含重置密码所需数据
   * @returns {Promise} 返回重置结果的 Promise
   */
  resetUserPassword: (data) => {
    return request({
      url: '/member/user/reset-password',
      method: 'PUT',
      data,
      custom: {
        loadingMsg: '验证中', // 显示验证中的提示信息
        showSuccess: true, // 显示成功提示
        successMsg: '修改成功', // 修改成功后的提示信息
      },
    });
  },
};

export default UserApi;
