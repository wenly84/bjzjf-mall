import request from '@/sheep/request';

/**
 * 文章相关 API
 * 提供获取文章详情等功能
 * @author 北京智匠坊科技有限公司
 */
export default {
  /**
   * 获取指定文章的详细信息
   * @param {number|string} id - 文章的唯一标识 ID
   * @param {string} title - 文章的标题
   * @returns {Promise} 返回文章详情的请求 Promise
   */
  getArticle: (id, title) => {
    return request({
      url: '/promotion/article/get', // 请求获取文章的接口路径
      method: 'GET', // 请求方法为 GET
      params: { id, title }, // 请求参数，包含文章的 ID 和标题
    });
  },
};
