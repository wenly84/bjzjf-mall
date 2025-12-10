import request from '@/sheep/request';

/**
 * 商品浏览历史相关 API
 * 提供删除浏览记录、清空浏览记录和分页查询浏览记录等功能
 * @author 北京智匠坊科技有限公司
 */
const SpuHistoryApi = {
  /**
   * 删除指定商品的浏览历史记录
   * @param {Array<number>} spuIds - 商品的唯一标识数组
   * @returns {Promise} 返回删除商品浏览记录的请求 Promise
   */
  deleteBrowseHistory: (spuIds) => {
    return request({
      url: '/product/browse-history/delete', // 删除浏览历史接口路径
      method: 'DELETE', // 请求方法为 DELETE
      data: { spuIds }, // 请求体数据，包含商品 ID 数组
      custom: {
        showSuccess: true, // 显示成功提示
        successMsg: '删除成功', // 成功提示信息
      },
    });
  },

  /**
   * 清空所有商品的浏览历史记录
   * @returns {Promise} 返回清空浏览历史记录的请求 Promise
   */
  cleanBrowseHistory: () => {
    return request({
      url: '/product/browse-history/clean', // 清空浏览历史接口路径
      method: 'DELETE', // 请求方法为 DELETE
      custom: {
        showSuccess: true, // 显示成功提示
        successMsg: '清空成功', // 成功提示信息
      },
    });
  },

  /**
   * 获取商品浏览历史记录的分页数据
   * @param {Object} data - 请求参数，通常包括分页信息
   * @returns {Promise} 返回商品浏览历史记录分页数据的请求 Promise
   */
  getBrowseHistoryPage: (data) => {
    return request({
      url: '/product/browse-history/page', // 商品浏览历史分页接口路径
      method: 'GET', // 请求方法为 GET
      data, // 请求参数，通常包括分页信息
      custom: {
        showLoading: false, // 不显示加载提示
      },
    });
  },
};

export default SpuHistoryApi;
