import request from '@/sheep/request';

/**
 * 拼团 API
 * 提供拼团活动相关接口，如获取活动列表、记录详情等功能
 * @author 北京智匠坊科技有限公司
 */
const CombinationApi = {
  /**
   * 获取拼团活动列表
   * @param {number} count - 要获取的拼团活动数量
   * @returns {Promise} 返回拼团活动列表的请求 Promise
   */
  getCombinationActivityList: (count) => {
    return request({
      url: '/promotion/combination-activity/list', // 获取拼团活动列表的接口路径
      method: 'GET', // 请求方法为 GET
      params: { count }, // 请求参数，指定要获取的活动数量
    });
  },

  /**
   * 获取拼团活动分页
   * @param {Object} params - 查询参数，分页信息等
   * @returns {Promise} 返回拼团活动分页的请求 Promise
   */
  getCombinationActivityPage: (params) => {
    return request({
      url: '/promotion/combination-activity/page', // 获取拼团活动分页的接口路径
      method: 'GET', // 请求方法为 GET
      params, // 请求参数，包含分页信息等
    });
  },

  /**
   * 获取拼团活动的详细信息
   * @param {string|number} id - 拼团活动的唯一标识 ID
   * @returns {Promise} 返回拼团活动详情的请求 Promise
   */
  getCombinationActivity: (id) => {
    return request({
      url: '/promotion/combination-activity/get-detail', // 获取拼团活动详情的接口路径
      method: 'GET', // 请求方法为 GET
      params: { id }, // 请求参数，包含活动 ID
    });
  },

  /**
   * 获取最近 n 条拼团记录（团长发起的）
   * @param {string|number} activityId - 拼团活动的唯一标识 ID
   * @param {string} status - 拼团活动的状态（如：进行中，已完成）
   * @param {number} count - 要获取的拼团记录数量
   * @returns {Promise} 返回拼团记录列表的请求 Promise
   */
  getHeadCombinationRecordList: (activityId, status, count) => {
    return request({
      url: '/promotion/combination-record/get-head-list', // 获取拼团记录（团长发起的）的接口路径
      method: 'GET', // 请求方法为 GET
      params: { activityId, status, count }, // 请求参数，包含活动 ID、状态和数量
    });
  },

  /**
   * 获取我的拼团记录分页
   * @param {Object} params - 查询参数，分页信息等
   * @returns {Promise} 返回拼团记录分页的请求 Promise
   */
  getCombinationRecordPage: (params) => {
    return request({
      url: '/promotion/combination-record/page', // 获取拼团记录分页的接口路径
      method: 'GET', // 请求方法为 GET
      params, // 请求参数，包含分页信息等
    });
  },

  /**
   * 获取拼团记录的详细信息
   * @param {string|number} id - 拼团记录的唯一标识 ID
   * @returns {Promise} 返回拼团记录详情的请求 Promise
   */
  getCombinationRecordDetail: (id) => {
    return request({
      url: '/promotion/combination-record/get-detail', // 获取拼团记录详情的接口路径
      method: 'GET', // 请求方法为 GET
      params: { id }, // 请求参数，包含拼团记录 ID
    });
  },

  /**
   * 获取拼团记录的概要信息
   * @returns {Promise} 返回拼团记录概要信息的请求 Promise
   */
  getCombinationRecordSummary: () => {
    return request({
      url: '/promotion/combination-record/get-summary', // 获取拼团记录概要信息的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },
};

export default CombinationApi;
