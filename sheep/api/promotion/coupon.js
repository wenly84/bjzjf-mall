import request from '@/sheep/request';

/**
 * 优惠券 API
 * 提供优惠券相关接口，如获取优惠券模板、领取优惠券等功能
 * @author 北京智匠坊科技有限公司
 */
const CouponApi = {
  /**
   * 获取优惠券模板列表（根据 IDs）
   * @param {Array<string|number>} ids - 优惠券模板的 ID 列表
   * @returns {Promise} 返回优惠券模板列表的请求 Promise
   */
  getCouponTemplateListByIds: (ids) => {
    return request({
      url: '/promotion/coupon-template/list-by-ids', // 获取优惠券模板列表的接口路径
      method: 'GET', // 请求方法为 GET
      params: { ids }, // 请求参数，优惠券模板的 IDs
      custom: {
        showLoading: false, // 不展示 Loading，避免领取优惠券时的错误提示
        showError: false, // 不展示错误提示
      },
    });
  },

  /**
   * 获取优惠券模板列表
   * @param {string|number} spuId - 商品 SPU ID
   * @param {string} productScope - 商品范围（如：全场、指定商品等）
   * @param {number} count - 获取的优惠券模板数量
   * @returns {Promise} 返回优惠券模板列表的请求 Promise
   */
  getCouponTemplateList: (spuId, productScope, count) => {
    return request({
      url: '/promotion/coupon-template/list', // 获取优惠券模板列表的接口路径
      method: 'GET', // 请求方法为 GET
      params: { spuId, productScope, count }, // 请求参数，包含商品 ID、范围及数量
    });
  },

  /**
   * 获取优惠券模板分页
   * @param {Object} params - 查询参数，分页信息等
   * @returns {Promise} 返回优惠券模板分页的请求 Promise
   */
  getCouponTemplatePage: (params) => {
    return request({
      url: '/promotion/coupon-template/page', // 获取优惠券模板分页的接口路径
      method: 'GET', // 请求方法为 GET
      params, // 请求参数，包含分页信息等
    });
  },

  /**
   * 获取单个优惠券模板
   * @param {string|number} id - 优惠券模板的 ID
   * @returns {Promise} 返回优惠券模板详情的请求 Promise
   */
  getCouponTemplate: (id) => {
    return request({
      url: '/promotion/coupon-template/get', // 获取优惠券模板详情的接口路径
      method: 'GET', // 请求方法为 GET
      params: { id }, // 请求参数，包含优惠券模板 ID
    });
  },

  /**
   * 获取我的优惠券分页
   * @param {Object} params - 查询参数，分页信息等
   * @returns {Promise} 返回我的优惠券分页的请求 Promise
   */
  getCouponPage: (params) => {
    return request({
      url: '/promotion/coupon/page', // 获取我的优惠券分页的接口路径
      method: 'GET', // 请求方法为 GET
      params, // 请求参数，包含分页信息等
    });
  },

  /**
   * 领取优惠券
   * @param {string|number} templateId - 优惠券模板的 ID
   * @returns {Promise} 返回领取优惠券的请求 Promise
   */
  takeCoupon: (templateId) => {
    return request({
      url: '/promotion/coupon/take', // 领取优惠券的接口路径
      method: 'POST', // 请求方法为 POST
      data: { templateId }, // 请求数据，包含优惠券模板 ID
      custom: {
        auth: true, // 需要授权
        showLoading: true, // 显示加载提示
        loadingMsg: '领取中', // 加载提示消息
        showSuccess: true, // 显示成功提示
        successMsg: '领取成功', // 成功提示消息
      },
    });
  },

  /**
   * 获取单个优惠券详情
   * @param {string|number} id - 优惠券的 ID
   * @returns {Promise} 返回优惠券详情的请求 Promise
   */
  getCoupon: (id) => {
    return request({
      url: '/promotion/coupon/get', // 获取优惠券详情的接口路径
      method: 'GET', // 请求方法为 GET
      params: { id }, // 请求参数，包含优惠券 ID
    });
  },

  /**
   * 获取未使用的优惠券数量
   * @returns {Promise} 返回未使用优惠券数量的请求 Promise
   */
  getUnusedCouponCount: () => {
    return request({
      url: '/promotion/coupon/get-unused-count', // 获取未使用优惠券数量的接口路径
      method: 'GET', // 请求方法为 GET
      custom: {
        showLoading: false, // 不显示加载提示
        auth: true, // 需要授权
      },
    });
  },

  /**
   * 获取匹配指定商品的优惠券列表
   * @param {number} price - 商品价格
   * @param {Array<string|number>} spuIds - 商品 SPU ID 列表
   * @param {Array<string|number>} skuIds - 商品 SKU ID 列表
   * @param {Array<string|number>} categoryIds - 商品分类 ID 列表
   * @returns {Promise} 返回匹配优惠券列表的请求 Promise
   */
  getMatchCouponList: (price, spuIds, skuIds, categoryIds) => {
    return request({
      url: '/promotion/coupon/match-list', // 获取匹配优惠券列表的接口路径
      method: 'GET', // 请求方法为 GET
      params: {
        price,
        spuIds: spuIds.join(','), // 将 SPU ID 列表转为逗号分隔的字符串
        skuIds: skuIds.join(','), // 将 SKU ID 列表转为逗号分隔的字符串
        categoryIds: categoryIds.join(','), // 将分类 ID 列表转为逗号分隔的字符串
      },
      custom: {
        showError: false, // 不显示错误提示
        showLoading: false, // 不显示加载提示，避免影响结算过程
      },
    });
  },
};

export default CouponApi;
