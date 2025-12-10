// LevelApi.js
import request from '@/sheep/request';

/**
 * LevelApi - 用户相关的 API 接口封装
 * @author 北京智匠坊科技有限公司
 */
const LevelApi = {
  /**
   * 获取会员等级
   * @returns {Promise} 返回获取会员等级的 Promise
   */
  getLevelList: () => {
    return request({
      url: '/member/level/list',
      method: 'GET',
      custom: {
        showLoading: false, // 请求时不显示加载动画
        auth: true, // 需要认证
      },
    });
  },
};

export default LevelApi;
