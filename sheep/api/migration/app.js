// mpliveApi.js
import request from '@/sheep/request';

/**
 * 小程序直播 API 封装
 * @author 北京智匠坊科技有限公司
 */
export default {
  // 小程序直播相关接口
  mplive: {
    /**
     * 获取直播房间列表
     * @param {Array} ids - 直播房间 ID 数组
     * @returns {Promise} 返回直播房间列表的 Promise
     */
    getRoomList: (ids) => {
      // 确保传入的 ids 数组有效，并且使用 join() 将其转为逗号分隔的字符串
      if (!Array.isArray(ids) || ids.length === 0) {
        return Promise.reject(new Error('ids 参数必须是一个非空数组'));
      }

      return request({
        url: 'app/mplive/getRoomList',
        method: 'GET',
        params: {
          ids: ids.join(','), // 将数组转为逗号分隔的字符串传递给接口
        },
      });
    },

    /**
     * 获取小程序直播链接
     * @returns {Promise} 返回直播链接的 Promise
     */
    getMpLink: () => {
      return request({
        url: 'app/mplive/getMpLink',
        method: 'GET',
      });
    },
  },
};
