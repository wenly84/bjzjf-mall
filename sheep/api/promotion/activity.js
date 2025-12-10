import request from '@/sheep/request';

/**
 * 活动相关 API
 * 提供获取商品参与的活动列表等功能
 * @author 北京智匠坊科技有限公司
 */
const ActivityApi = {
  /**
   * 获取指定商品参与的所有活动列表
   * @param {number} spuId - 商品的唯一标识 ID
   * @returns {Promise} 返回商品参与活动列表的请求 Promise
   */
  getActivityListBySpuId: (spuId) => {
    return request({
      url: '/promotion/activity/list-by-spu-id', // 活动列表查询接口路径
      method: 'GET', // 请求方法为 GET
      params: { spuId }, // 请求参数，包含商品的 ID
    });
  },
};

export default ActivityApi;
