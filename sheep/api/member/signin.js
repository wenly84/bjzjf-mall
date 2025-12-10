// signInApi.js
import request from '@/sheep/request';

/**
 * SignInApi - 用户签到相关的 API 接口封装
 * @author 北京智匠坊科技有限公司
 */
const SignInApi = {
  /**
   * 获得签到规则列表
   * @returns {Promise} 返回签到规则列表的 Promise
   */
  getSignInConfigList: () => {
    return request({
      url: '/member/sign-in/config/list',
      method: 'GET',
    });
  },

  /**
   * 获得个人签到统计
   * @returns {Promise} 返回个人签到统计信息的 Promise
   */
  getSignInRecordSummary: () => {
    return request({
      url: '/member/sign-in/record/get-summary',
      method: 'GET',
    });
  },

  /**
   * 创建签到记录
   * @returns {Promise} 返回创建签到记录结果的 Promise
   */
  createSignInRecord: () => {
    return request({
      url: '/member/sign-in/record/create',
      method: 'POST',
    });
  },

  /**
   * 获得签到记录分页
   * @param {Object} params - 请求的查询参数
   * @param {Number} [params.pageNum] - 当前页数
   * @param {Number} [params.pageSize] - 每页记录数
   * @returns {Promise} 返回签到记录分页结果的 Promise
   */
  getSignRecordPage: (params) => {
    // 构建查询字符串
    const queryString = Object.keys(params)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key])) // 对参数值进行编码
      .join('&'); // 将每个参数对通过 & 连接起来

    return request({
      url: `/member/sign-in/record/page?${queryString}`, // 拼接查询字符串到 URL
      method: 'GET', // 使用 GET 请求方式
    });
  },
};

export default SignInApi;
