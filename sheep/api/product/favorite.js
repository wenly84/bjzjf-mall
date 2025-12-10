import request from '@/sheep/request';

/**
 * 商品收藏相关 API
 * 提供商品收藏、取消收藏、获取收藏分页等功能
 * @author 北京智匠坊科技有限公司
 */
const FavoriteApi = {
  /**
   * 获得商品收藏的分页数据
   * @param {Object} data - 请求参数，通常包括分页信息
   * @returns {Promise} 返回商品收藏分页数据的请求 Promise
   */
  getFavoritePage: (data) => {
    return request({
      url: '/product/favorite/page', // 商品收藏分页接口路径
      method: 'GET', // 请求方法为 GET
      params: data, // 请求参数
    });
  },

  /**
   * 检查是否收藏过某个商品
   * @param {number} spuId - 商品的唯一标识
   * @returns {Promise} 返回检查结果的请求 Promise
   */
  isFavoriteExists: (spuId) => {
    return request({
      url: '/product/favorite/exits', // 商品是否收藏的接口路径
      method: 'GET', // 请求方法为 GET
      params: {
        spuId, // 商品 ID
      },
    });
  },

  /**
   * 添加商品到收藏
   * @param {number} spuId - 商品的唯一标识
   * @returns {Promise} 返回收藏结果的请求 Promise
   */
  createFavorite: (spuId) => {
    return request({
      url: '/product/favorite/create', // 添加商品收藏接口路径
      method: 'POST', // 请求方法为 POST
      data: {
        spuId, // 商品 ID
      },
      custom: {
        auth: true, // 需要身份验证
        showSuccess: true, // 显示成功提示
        successMsg: '收藏成功', // 成功提示信息
      },
    });
  },

  /**
   * 取消商品的收藏
   * @param {number} spuId - 商品的唯一标识
   * @returns {Promise} 返回取消收藏结果的请求 Promise
   */
  deleteFavorite: (spuId) => {
    return request({
      url: '/product/favorite/delete', // 取消商品收藏接口路径
      method: 'DELETE', // 请求方法为 DELETE
      data: {
        spuId, // 商品 ID
      },
      custom: {
        auth: true, // 需要身份验证
        showSuccess: true, // 显示成功提示
        successMsg: '取消成功', // 成功提示信息
      },
    });
  },
};

export default FavoriteApi;
