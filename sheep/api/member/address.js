// addressApi.js
import request from '@/sheep/request';

/**
 * AddressApi - 用户收件地址相关的 API 接口封装
 * @author 北京智匠坊科技有限公司
 */
const AddressApi = {
  /**
   * 获取用户收件地址列表
   * @returns {Promise} 返回一个 Promise，包含用户地址列表数据
   */
  getAddressList: () => {
    return request({
      url: '/member/address/list', // 请求接口地址
      method: 'GET', // 使用 GET 方法请求数据
    });
  },

  /**
   * 创建用户收件地址
   * @param {Object} data - 包含用户收件地址信息的对象
   * @returns {Promise} 返回一个 Promise，包含操作结果
   */
  createAddress: (data) => {
    return request({
      url: '/member/address/create', // 请求接口地址
      method: 'POST', // 使用 POST 方法创建新的地址
      data, // 传递用户的地址数据
      custom: {
        showSuccess: true, // 操作成功时是否显示成功提示
        successMsg: '保存成功', // 成功提示消息
      },
    });
  },

  /**
   * 更新用户收件地址
   * @param {Object} data - 包含更新的地址信息的对象
   * @returns {Promise} 返回一个 Promise，包含操作结果
   */
  updateAddress: (data) => {
    return request({
      url: '/member/address/update', // 请求接口地址
      method: 'PUT', // 使用 PUT 方法更新现有地址
      data, // 传递更新的地址数据
      custom: {
        showSuccess: true, // 操作成功时是否显示成功提示
        successMsg: '更新成功', // 成功提示消息
      },
    });
  },

  /**
   * 获取单个用户收件地址
   * @param {number} id - 收件地址的唯一标识符
   * @returns {Promise} 返回一个 Promise，包含单个地址的数据
   */
  getAddress: (id) => {
    return request({
      url: '/member/address/get', // 请求接口地址
      method: 'GET', // 使用 GET 方法获取单个地址信息
      params: { id }, // 传递地址 ID 作为查询参数
    });
  },

  /**
   * 删除用户收件地址
   * @param {number} id - 要删除的地址的唯一标识符
   * @returns {Promise} 返回一个 Promise，包含操作结果
   */
  deleteAddress: (id) => {
    return request({
      url: '/member/address/delete', // 请求接口地址
      method: 'DELETE', // 使用 DELETE 方法删除地址
      params: { id }, // 传递地址 ID 作为查询参数
    });
  },
};

export default AddressApi;
