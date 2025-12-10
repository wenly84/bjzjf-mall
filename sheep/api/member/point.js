// pointApi.js
import request from '@/sheep/request';

/**
 * PointApi - 用户积分相关的 API 接口封装
 * @author 北京智匠坊科技有限公司
 */
const PointApi = {
  /**
   * 获得用户积分记录分页
   * @param {Object} params - 请求的查询参数
   * @param {Number} [params.addStatus] - 可选的积分状态
   * @returns {Promise} 返回积分记录分页结果的 Promise
   */
  getPointRecordPage: (params) => {
    // 移除 addStatus 参数，如果未定义
    if (params.addStatus === undefined) {
      delete params.addStatus;
    }

    // 构建查询字符串
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])) // 对参数值进行编码
      .join('&'); // 将每个参数对通过 & 连接起来

    return request({
      url: `/member/point/record/page?${queryString}`, // 拼接查询字符串到 URL
      method: 'GET', // 使用 GET 请求方式
    });
  },
};

export default PointApi;
