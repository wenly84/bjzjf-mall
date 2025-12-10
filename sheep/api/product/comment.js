import request from '@/sheep/request';

/**
 * 商品评价相关 API
 * 提供与商品评价相关的接口
 * @author 北京智匠坊科技有限公司
 */
const CommentApi = {
  /**
   * 获得商品的评价分页列表
   * @param {number} spuId - 商品的唯一标识
   * @param {number} pageNo - 当前页码
   * @param {number} pageSize - 每页显示的条目数
   * @param {string} type - 评价类型（如好评、中评、差评等）
   * @returns {Promise} 返回分页数据的请求 Promise
   */
  getCommentPage: (spuId, pageNo, pageSize, type) => {
    return request({
      url: '/product/comment/page', // 商品评价分页接口路径
      method: 'GET', // 请求方法为 GET
      params: {
        spuId, // 商品 ID
        pageNo, // 当前页码
        pageSize, // 每页条目数
        type, // 评价类型
      },
      custom: {
        showLoading: false, // 不显示加载中的提示
        showError: false, // 不显示错误提示
      },
    });
  },
};

export default CommentApi;
