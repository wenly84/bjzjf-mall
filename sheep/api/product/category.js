import request from '@/sheep/request';

/**
 * 分类相关 API
 * 提供与产品分类相关的接口
 * @author 北京智匠坊科技有限公司
 */
const CategoryApi = {
  /**
   * 查询分类列表
   * @returns {Promise} 返回分类列表的请求 Promise
   */
  getCategoryList: () => {
    return request({
      url: '/product/category/list', // 分类列表的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 查询指定编号的分类列表
   * @param {Array} ids - 分类的 IDs 列表
   * @returns {Promise} 返回指定 ID 的分类列表的请求 Promise
   */
  getCategoryListByIds: (ids) => {
    return request({
      url: '/product/category/list-by-ids', // 查询指定 ID 分类列表的接口路径
      method: 'GET', // 请求方法为 GET
      params: { ids }, // 请求参数包含分类 ID 列表
    });
  },
};

export default CategoryApi;
