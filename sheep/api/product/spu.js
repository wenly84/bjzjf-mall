import request from '@/sheep/request';

/**
 * 商品 SPU 相关 API
 * 提供获取商品 SPU 列表、分页查询 SPU、查询商品详情等功能
 * @author 北京智匠坊科技有限公司
 */
const SpuApi = {
  /**
   * 根据商品 ID 列表获取商品 SPU 列表
   * @param {Array<number>} ids - 商品 SPU 的 ID 数组
   * @returns {Promise} 返回商品 SPU 列表的请求 Promise
   */
  getSpuListByIds: (ids) => {
    return request({
      url: '/product/spu/list-by-ids', // 商品 SPU 列表查询接口路径
      method: 'GET', // 请求方法为 GET
      params: { ids }, // 请求参数，包含商品 ID 数组
      custom: {
        showLoading: false, // 不显示加载提示
        showError: false, // 不显示错误提示
      },
    });
  },

  /**
   * 获取商品 SPU 的分页数据
   * @param {Object} params - 请求参数，通常包括分页信息和筛选条件
   * @returns {Promise} 返回商品 SPU 分页数据的请求 Promise
   */
  getSpuPage: (params) => {
    return request({
      url: '/product/spu/page', // 商品 SPU 分页查询接口路径
      method: 'GET', // 请求方法为 GET
      params, // 请求参数，包含分页信息和筛选条件
      custom: {
        showLoading: false, // 不显示加载提示
        showError: false, // 不显示错误提示
      },
    });
  },

  /**
   * 根据商品 ID 获取商品的详细信息
   * @param {number} id - 商品的唯一标识 ID
   * @returns {Promise} 返回商品详情的请求 Promise
   */
  getSpuDetail: (id) => {
    return request({
      url: '/product/spu/get-detail', // 商品详情查询接口路径
      method: 'GET', // 请求方法为 GET
      params: { id }, // 请求参数，包含商品的 ID
      custom: {
        showLoading: false, // 不显示加载提示
        showError: false, // 不显示错误提示
      },
    });
  },
};

export default SpuApi;
