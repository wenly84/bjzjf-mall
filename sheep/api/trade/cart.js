import request from '@/sheep/request';

/**
 * 购物车相关 API
 * 提供管理购物车商品、更新商品数量、选择商品等功能
 * @author 北京智匠坊科技有限公司
 */
const CartApi = {
  /**
   * 添加商品到购物车
   * @param {Object} data - 添加到购物车的商品数据
   * @returns {Promise} 返回添加商品到购物车的请求 Promise
   */
  addCart: (data) => {
    return request({
      url: '/trade/cart/add', // 添加商品到购物车的接口路径
      method: 'POST', // 请求方法为 POST
      data, // 请求数据
      custom: {
        showSuccess: true, // 展示成功消息
        successMsg: '已添加到购物车~', // 成功消息内容
      },
    });
  },

  /**
   * 更新购物车商品的数量
   * @param {Object} data - 更新商品数量的数据
   * @returns {Promise} 返回更新购物车商品数量的请求 Promise
   */
  updateCartCount: (data) => {
    return request({
      url: '/trade/cart/update-count', // 更新购物车商品数量的接口路径
      method: 'PUT', // 请求方法为 PUT
      data, // 请求数据
    });
  },

  /**
   * 更新购物车商品的选择状态
   * @param {Object} data - 更新商品选择状态的数据
   * @returns {Promise} 返回更新购物车商品选择状态的请求 Promise
   */
  updateCartSelected: (data) => {
    return request({
      url: '/trade/cart/update-selected', // 更新购物车商品选择状态的接口路径
      method: 'PUT', // 请求方法为 PUT
      data, // 请求数据
    });
  },

  /**
   * 删除购物车中的商品
   * @param {Array} ids - 要删除的商品 ID 数组
   * @returns {Promise} 返回删除购物车商品的请求 Promise
   */
  deleteCart: (ids) => {
    return request({
      url: '/trade/cart/delete', // 删除购物车商品的接口路径
      method: 'DELETE', // 请求方法为 DELETE
      params: {
        ids, // 要删除的商品 ID 数组
      },
    });
  },

  /**
   * 获取购物车商品列表
   * @returns {Promise} 返回购物车商品列表的请求 Promise
   */
  getCartList: () => {
    return request({
      url: '/trade/cart/list', // 获取购物车商品列表的接口路径
      method: 'GET', // 请求方法为 GET
      custom: {
        showLoading: false, // 不显示加载中提示
        auth: true, // 需要用户认证
      },
    });
  },
};

export default CartApi;
