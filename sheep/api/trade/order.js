import request from '@/sheep/request';
import { isEmpty } from '@/sheep/helper/utils';

/**
 * 订单相关 API
 * 提供订单结算、创建、查询、取消、删除等功能
 * @author 北京智匠坊科技有限公司
 */
const OrderApi = {
  /**
   * 计算订单信息
   * @param {Object} data 订单数据
   * @returns {Promise} 返回订单结算请求的 Promise
   */
  settlementOrder: (data) => {
    const data2 = { ...data };

    // 移除多余的字段，确保只发送必要的字段
    if (!(data.couponId > 0)) delete data2.couponId;
    if (!(data.addressId > 0)) delete data2.addressId;
    if (!(data.pickUpStoreId > 0)) delete data2.pickUpStoreId;
    if (isEmpty(data.receiverName)) delete data2.receiverName;
    if (isEmpty(data.receiverMobile)) delete data2.receiverMobile;
    if (!(data.combinationActivityId > 0)) delete data2.combinationActivityId;
    if (!(data.combinationHeadId > 0)) delete data2.combinationHeadId;
    if (!(data.seckillActivityId > 0)) delete data2.seckillActivityId;
	if (!(data.pointActivityId > 0)) {delete data2.pointActivityId;}
	if (!(data.deliveryType > 0)) {delete data2.deliveryType;}

    // 处理 SpringMVC 接受 List<Item> 参数的问题
    delete data2.items;
    data.items.forEach((item, index) => {
      data2[encodeURIComponent(`items[${index}].skuId`)] = `${item.skuId}`;
      data2[encodeURIComponent(`items[${index}].count`)] = `${item.count}`;
      if (item.cartId) {
        data2[encodeURIComponent(`items[${index}].cartId`)] = `${item.cartId}`;
      }
    });

    // 将参数转为查询字符串
    const queryString = Object.keys(data2)
      .map((key) => `${key}=${data2[key]}`)
      .join('&');

    return request({
      url: `/trade/order/settlement?${queryString}`,
      method: 'GET',
      custom: {
        showError: true,
        showLoading: true,
      },
    });
  },

  /**
   * 创建订单
   * @param {Object} data 订单数据
   * @returns {Promise} 返回创建订单请求的 Promise
   */
  createOrder: (data) => {
    return request({
      url: '/trade/order/create',
      method: 'POST',
      data,
    });
  },

  /**
   * 获取订单详情
   * @param {number} id 订单ID
   * @returns {Promise} 返回订单详情请求的 Promise
   */
  getOrder: (id) => {
    return request({
      url: '/trade/order/get-detail',
      method: 'GET',
      params: { id },
      custom: {
        showLoading: false,
      },
    });
  },

  /**
   * 获取订单分页列表
   * @param {Object} params 分页参数
   * @returns {Promise} 返回订单列表请求的 Promise
   */
  getOrderPage: (params) => {
    return request({
      url: '/trade/order/page',
      method: 'GET',
      params,
      custom: {
        showLoading: false,
      },
    });
  },

  /**
   * 确认收货
   * @param {number} id 订单ID
   * @returns {Promise} 返回确认收货请求的 Promise
   */
  receiveOrder: (id) => {
    return request({
      url: '/trade/order/receive',
      method: 'PUT',
      params: { id },
    });
  },

  /**
   * 取消订单
   * @param {number} id 订单ID
   * @returns {Promise} 返回取消订单请求的 Promise
   */
  cancelOrder: (id) => {
    return request({
      url: '/trade/order/cancel',
      method: 'DELETE',
      params: { id },
    });
  },

  /**
   * 删除订单
   * @param {number} id 订单ID
   * @returns {Promise} 返回删除订单请求的 Promise
   */
  deleteOrder: (id) => {
    return request({
      url: '/trade/order/delete',
      method: 'DELETE',
      params: { id },
    });
  },

  /**
   * 获取订单物流轨迹
   * @param {number} id 订单ID
   * @returns {Promise} 返回订单物流轨迹请求的 Promise
   */
  getOrderExpressTrackList: (id) => {
    return request({
      url: '/trade/order/get-express-track-list',
      method: 'GET',
      params: { id },
    });
  },

  /**
   * 获取交易订单数量
   * @returns {Promise} 返回订单数量请求的 Promise
   */
  getOrderCount: () => {
    return request({
      url: '/trade/order/get-count',
      method: 'GET',
      custom: {
        showLoading: false,
        auth: true,
      },
    });
  },

  /**
   * 创建单个订单评论
   * @param {Object} data 评论数据
   * @returns {Promise} 返回评论创建请求的 Promise
   */
  createOrderItemComment: (data) => {
    return request({
      url: '/trade/order/item/create-comment',
      method: 'POST',
      data,
    });
  },
};

export default OrderApi;
