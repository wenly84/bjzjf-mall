import request from '@/sheep/request';

/**
 * 满减送活动相关 API
 * 提供获取满减送活动的功能
 * @author 北京智匠坊科技有限公司
 */
const RewardActivityApi = {
  /**
   * 获取满减送活动详情
   * @param {number} id - 活动的 ID
   * @returns {Promise} 返回活动详情的请求 Promise
   */
  getRewardActivity: (id) => {
    return request({
      url: '/promotion/reward-activity/get', // 获取满减送活动详情的接口路径
      method: 'GET', // 请求方法为 GET
      params: { id }, // 请求参数，传递活动的 ID
    });
  },
};

export default RewardActivityApi;
