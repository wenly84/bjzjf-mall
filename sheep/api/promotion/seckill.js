import request from '@/sheep/request';

/**
 * 秒杀活动相关 API
 * 提供获取秒杀时间段、当前秒杀活动、秒杀活动分页等功能
 * @author 北京智匠坊科技有限公司
 */
const SeckillApi = {
  /**
   * 获取秒杀时间段列表
   * @returns {Promise} 返回秒杀时间段列表的请求 Promise
   */
  getSeckillConfigList: () => {
    return request({
      url: 'promotion/seckill-config/list', // 获取秒杀时间段列表的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 获取当前秒杀活动
   * @returns {Promise} 返回当前秒杀活动的请求 Promise
   */
  getNowSeckillActivity: () => {
    return request({
      url: 'promotion/seckill-activity/get-now', // 获取当前秒杀活动的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },

  /**
   * 获取秒杀活动分页
   * @param {Object} params - 分页请求参数
   * @returns {Promise} 返回秒杀活动分页数据的请求 Promise
   */
  getSeckillActivityPage: (params) => {
    return request({
      url: 'promotion/seckill-activity/page', // 获取秒杀活动分页的接口路径
      method: 'GET', // 请求方法为 GET
      params, // 请求参数，用于分页
    });
  },

  /**
   * 获取秒杀活动明细
   * @param {number} id - 秒杀活动编号
   * @returns {Promise} 返回秒杀活动明细的请求 Promise
   */
  getSeckillActivity: (id) => {
    return request({
      url: 'promotion/seckill-activity/get-detail', // 获取秒杀活动明细的接口路径
      method: 'GET', // 请求方法为 GET
      params: { id }, // 请求参数，传递秒杀活动编号
    });
  },
};

export default SeckillApi;
