import request from '@/sheep/request';

/**
 * 地区相关 API
 * 提供获取地区树的功能
 * @author 北京智匠坊科技有限公司
 */
const AreaApi = {
  /**
   * 获取地区树
   * @returns {Promise} 返回地区树的请求 Promise
   */
  getAreaTree: () => {
    return request({
      url: '/system/area/tree', // 获取地区树的接口路径
      method: 'GET', // 请求方法为 GET
    });
  },
};

export default AreaApi;
