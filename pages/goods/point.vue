<!-- 积分商品详情 -->
<template>
  <s-layout :onShareAppMessage="shareInfo" navbar="goods">
    <!-- 标题栏 -->
    <detailNavbar />
    <!-- 骨架屏 -->
    <detailSkeleton v-if="state.skeletonLoading" />
    <!-- 下架/售罄提醒 -->
    <s-empty
      v-else-if="
        state.goodsInfo === null ||
        state.goodsInfo.activity_type !== PromotionActivityTypeEnum.POINT.type"
      text="活动不存在或已结束"
      icon="/static/soldout-empty.png"
      showAction
      actionText="再逛逛"
      actionUrl="/pages/goods/list" />
    <block v-else>
      <view class="detail-swiper-selector">
        <!-- 商品图轮播 -->
        <su-swiper
          class="ss-m-b-14"
          isPreview
          :list="state.goodsSwiper"
          dotStyle="tag"
          imageMode="widthFix"
          dotCur="bg-mask-40"
          :seizeHeight="750" />

        <!-- 价格+标题 -->
        <view class="title-card detail-card ss-p-y-40 ss-p-x-20">
          <view class="ss-flex ss-row-between ss-col-center ss-m-b-18">
            <view class="price-box ss-flex ss-col-bottom">
              <image
                :src="sheep.$url.static('/static/image/mall/goods/score.png')"
                class="point-img"></image>
              <text class="point-text ss-m-r-16">
                {{ getShowPrice.point }}
                {{
                  !getShowPrice.price || getShowPrice.price === 0 ? '' : `+￥${getShowPrice.price}`
                }}
              </text>
            </view>
            <view class="sales-text">
              {{ formatExchange(state.goodsInfo.sales_show_type, state.goodsInfo.sales) }}
            </view>
          </view>
          <view class="origin-price-text ss-m-b-60" v-if="state.goodsInfo.marketPrice">
            原价：￥{{ fen2yuan(state.selectedSku.marketPrice || state.goodsInfo.marketPrice) }}
          </view>
          <view class="title-text ss-line-2 ss-m-b-6">{{ state.goodsInfo.name || '' }}</view>
          <view class="subtitle-text ss-line-1">{{ state.goodsInfo.introduction }}</view>
        </view>

        <!-- 功能卡片 -->
        <view class="detail-cell-card detail-card ss-flex-col">
          <detail-cell-sku :sku="state.selectedSku" @tap="state.showSelectSku = true" />
        </view>
        <!-- 规格与数量弹框 -->
        <s-select-seckill-sku
          v-model="state.goodsInfo"
          :show="state.showSelectSku"
          :single-limit-count="activity.singleLimitCount"
          @buy="onBuy"
          @change="onSkuChange"
          @close="state.showSelectSku = false" />
      </view>

      <!-- 评价 -->
      <detail-comment-card class="detail-comment-selector" :goodsId="state.goodsInfo.id" />
      <!-- 详情 -->
      <detail-content-card class="detail-content-selector" :content="state.goodsInfo.description" />

      <!-- 详情tabbar -->
      <detail-tabbar v-model="state.goodsInfo">
        <view class="buy-box ss-flex ss-col-center ss-p-r-20">
          <button
            class="ss-reset-button origin-price-btn ss-flex-col"
            v-if="state.goodsInfo.marketPrice"
            @tap="sheep.$router.go('/pages/goods/index', { id: state.goodsInfo.id })">
            <view>
              <view class="btn-price">{{ fen2yuan(state.goodsInfo.marketPrice) }}</view>
              <view>原价购买</view>
            </view>
          </button>
          <button
            class="ss-reset-button btn-box ss-flex-col"
            @tap="state.showSelectSku = true"
            :class="state.goodsInfo.stock != 0 ? 'check-btn-box' : 'disabled-btn-box'"
            :disabled="state.goodsInfo.stock === 0">
            <view class="price-box ss-flex">
              <image
                :src="sheep.$url.static('/static/image/mall/goods/score.png')"
                style="width: 36rpx; height: 36rpx; margin: 0 4rpx"></image>
              <text class="point-text ss-m-r-16">
                {{ getShowPrice.point }}
                {{
                  !getShowPrice.price || getShowPrice.price === 0 ? '' : `+￥${getShowPrice.price}`
                }}
              </text>
            </view>
            <view v-if="state.goodsInfo.stock === 0">已售罄</view>
            <view v-else>立即兑换</view>
          </button>
        </view>
      </detail-tabbar>
    </block>
  </s-layout>
</template>

<script setup>
  import { computed, reactive, ref, unref } from 'vue';
  import { onLoad, onPageScroll } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import { isEmpty } from 'lodash-es';
  import { fen2yuan, formatExchange, formatGoodsSwiper } from '@/sheep/hooks/useGoods';
  import detailNavbar from './components/detail/detail-navbar.vue';
  import detailCellSku from './components/detail/detail-cell-sku.vue';
  import detailTabbar from './components/detail/detail-tabbar.vue';
  import detailSkeleton from './components/detail/detail-skeleton.vue';
  import detailCommentCard from './components/detail/detail-comment-card.vue';
  import detailContentCard from './components/detail/detail-content-card.vue';
  import SpuApi from '@/sheep/api/product/spu';
  import { PromotionActivityTypeEnum } from '@/sheep/util/const';
  import PointApi from '@/sheep/api/promotion/point';

  // 定义各个组件所需的背景图片链接
  const headerBg = sheep.$url.css('/static/image/mall/goods/groupon-bg.png');
  const btnBg = sheep.$url.css('/static/image/mall/goods/seckill-btn.png');
  const disabledBtnBg = sheep.$url.css('/static/image/mall/goods/activity-btn-disabled.png');
  const seckillBg = sheep.$url.css('/static/image/mall/goods/seckill-tip-bg.png');
  const grouponBg = sheep.$url.css('/static/image/mall/goods/groupon-tip-bg.png');

  // 页面滚动监听器（当前无实际功能）
  onPageScroll(() => {});

  // 组件的响应式状态管理
  const state = reactive({
    skeletonLoading: true,   // 用来控制骨架屏加载状态
    goodsInfo: {},           // 存储商品详情
    showSelectSku: false,    // 控制是否显示SKU选择
    goodsSwiper: [],         // 存储商品的轮播图链接
    selectedSku: {},         // 存储选中的SKU
    showModel: false,        // 控制模型框的显示
    total: 0,                // 商品总数
    price: '',               // 商品价格
  });

  // SKU变化时的处理函数
  function onSkuChange(e) {
    state.selectedSku = e;
  }

  // 立即购买操作，跳转到订单确认页面
  function onBuy(sku) {
    sheep.$router.go('/pages/order/confirm', {
      data: JSON.stringify({
        order_type: 'goods',
        buy_type: 'point',
        pointActivityId: activity.value.id,
        items: [
          {
            skuId: sku.id,
            count: sku.count,
          },
        ],
      }),
    });
  }

  // 计算分享信息，生成可分享的内容
  const shareInfo = computed(() => {
    if (isEmpty(unref(activity))) return {};
    return sheep.$platform.share.getShareInfo(
      {
        title: activity.value.name,
        image: sheep.$url.cdn(state.goodsInfo.picUrl),
        params: {
          page: '6',
          query: activity.value.id,
        },
      },
      {
        type: 'goods', // 商品海报
        title: activity.value.name, // 商品标题
        image: sheep.$url.cdn(state.goodsInfo.picUrl), // 商品主图
        price: (getShowPrice.value.price || 0) + ` + ${getShowPrice.value.point} 积分`, // 积分价格
        marketPrice: fen2yuan(state.goodsInfo.marketPrice), // 商品原价
      },
    );
  });

  const activity = ref();

  // 计算显示价格和积分
  const getShowPrice = computed(() => {
    if (!isEmpty(state.selectedSku)) {
      const sku = state.selectedSku;
      return {
        point: sku.point,
        price: !sku.pointPrice ? '' : fen2yuan(sku.pointPrice),
      };
    }
    return {
      point: activity.value.point,
      price: !activity.value.price ? '' : fen2yuan(activity.value.price),
    };
  });

  // 计算显示的价格文本
  const getShowPriceText = computed(() => {
    let priceText = `￥${fen2yuan(state.goodsInfo.price)}`;
    if (!isEmpty(state.selectedSku)) {
      const sku = state.selectedSku;
      priceText = `${sku.point}${!sku.pointPrice ? '' : `+￥${fen2yuan(sku.pointPrice)}`}`;
    }
    return priceText;
  });

  // 查询活动信息
  const getActivity = async (id) => {
    try {
      const { data } = await PointApi.getPointActivity(id);
      activity.value = data;
      // 查询对应商品信息
      await getSpu(data.spuId);
    } catch (error) {
      console.error('获取活动数据失败:', error);
    }
  };

  // 查询商品信息
  const getSpu = async (id) => {
    try {
      const { data } = await SpuApi.getSpuDetail(id);
      data.activity_type = PromotionActivityTypeEnum.POINT.type;
      state.goodsInfo = data;
      state.goodsInfo.stock = Math.min(data.stock, activity.value.stock); // 取最小库存
      state.goodsSwiper = formatGoodsSwiper(state.goodsInfo.sliderPicUrls); // 格式化轮播图

      // 设置SKU的价格和库存
      data.skus.forEach((sku) => {
        const product = activity.value.products.find((product) => product.skuId === sku.id);
        if (product) {
          sku.point = product.point;
          sku.pointPrice = product.price;
          sku.stock = Math.min(sku.stock, product.stock);
          sku.limitCount = product.count; // 限购数量
        } else {
          sku.stock = 0; // 找不到配置的SKU，库存为0
        }
      });

      state.skeletonLoading = false; // 结束骨架屏加载
    } catch (error) {
      console.error('获取商品信息失败:', error);
    }
  };

  // 页面加载时，获取活动信息
  onLoad((options) => {
    // 参数非法
    if (!options.id) {
      state.goodsInfo = null;
      return;
    }

    // 查询活动信息
    getActivity(options.id);
  });
</script>


<style lang="scss" scoped>
  /* 禁用按钮样式 */
  .disabled-btn-box[disabled] {
    background-color: transparent; /* 禁用时背景透明 */
  }

  /* 详情卡片样式 */
  .detail-card {
    background-color: $white; /* 白色背景 */
    margin: 14rpx 20rpx; /* 外边距 */
    border-radius: 10rpx; /* 圆角 */
    overflow: hidden; /* 超出部分隐藏 */
  }

  // 价格标题卡片样式
  .title-card {
    width: 710rpx; /* 卡片宽度 */
    box-sizing: border-box; /* 包括内边距和边框在内的宽度计算 */
    background-size: 100% 100%; /* 背景图大小 */
    border-radius: 10rpx; /* 圆角 */
    background: v-bind(headerBg) no-repeat, linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient)); /* 背景图和渐变 */
    background-repeat: no-repeat; /* 背景不重复 */

    /* 价格框样式 */
    .price-box {
      .point-img {
        width: 36rpx;
        height: 36rpx;
        margin: 0 4rpx; /* 图片两侧间距 */
      }

      .point-text {
        font-size: 42rpx; /* 字体大小 */
        font-weight: 500; /* 字体粗细 */
        color: $white; /* 字体颜色 */
        line-height: 36rpx; /* 行高 */
        font-family: OPPOSANS; /* 字体 */
      }

      .price-text {
        font-size: 42rpx;
        font-weight: 500;
        color: var(--ui-BG-Main); /* 主颜色 */
        line-height: 36rpx;
        font-family: OPPOSANS;
      }
    }

    /* 原价文本 */
    .origin-price-text {
      font-size: 26rpx;
      font-weight: 400;
      text-decoration: line-through; /* 删除线 */
      color: $gray-c; /* 灰色 */
      font-family: OPPOSANS;
    }

    /* 销售数量文本 */
    .sales-text {
      font-size: 26rpx;
      font-weight: 500;
      color: $white; /* 白色 */
    }

    /* 折扣区域 */
    .discounts-box {
      .discounts-tag {
        padding: 4rpx 10rpx;
        font-size: 24rpx;
        font-weight: 500;
        border-radius: 4rpx;
        color: var(--ui-BG-Main); /* 主颜色 */
        background: var(--ui-BG-Main-tag); /* 背景色 */
      }

      .discounts-title {
        font-size: 24rpx;
        font-weight: 500;
        color: var(--ui-BG-Main); /* 主颜色 */
        line-height: normal;
      }

      .cicon-forward {
        color: var(--ui-BG-Main); /* 主颜色 */
        font-size: 24rpx;
        line-height: normal;
        margin-top: 4rpx; /* 上边距 */
      }
    }

    /* 商品标题文本 */
    .title-text {
      font-size: 30rpx;
      font-weight: bold;
      color: $white; /* 白色 */
      line-height: 42rpx;
    }

    /* 商品副标题 */
    .subtitle-text {
      font-size: 26rpx;
      font-weight: 400;
      color: $white;
      line-height: 42rpx;
    }
  }

  // 购买按钮区域样式
  .buy-box {
    /* 可用按钮样式 */
    .check-btn-box {
      width: 248rpx;
      height: 80rpx;
      font-size: 24rpx;
      font-weight: 600;
      margin-left: -36rpx; /* 左边距 */
      background-image: v-bind(btnBg); /* 背景图 */
	  //background-image: v-bind(btnBg), linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient)); /* 背景图 */
      background-repeat: no-repeat; /* 背景不重复 */
      background-size: 100% 100%; /* 背景适应 */
      color: #ffffff; /* 字体颜色 */
      line-height: normal;
      border-radius: 0px 40rpx 40rpx 0px; /* 圆角 */
    }

    /* 禁用按钮样式 */
    .disabled-btn-box {
      width: 248rpx;
      height: 80rpx;
      font-size: 24rpx;
      font-weight: 600;
      margin-left: -36rpx;
      background-image: v-bind(disabledBtnBg); /* 背景图 */
      background-repeat: no-repeat;
      background-size: 100% 100%; /* 背景适应 */
      color: #999999; /* 禁用时字体颜色 */
      line-height: normal;
      border-radius: 0px 40rpx 40rpx 0px;
    }

    .btn-price {
      font-family: OPPOSANS;

      &::before {
        content: '￥'; /* 价格前的符号 */
      }
    }

    /* 原价购买按钮 */
    .origin-price-btn {
      width: 236rpx;
      height: 80rpx;
      background: var(--ui-BG-Main-light); /* 背景渐变 */
      color: var(--ui-BG-Main); /* 主颜色 */
      border-radius: 40rpx 0px 0px 40rpx; /* 圆角 */
      line-height: normal;
      font-size: 24rpx;
      font-weight: 500;

      /* 禁用原价按钮 */
      .no-original {
        font-size: 28rpx;
      }

      .btn-title {
        font-size: 28rpx;
      }
    }
  
  
  }

  // 秒杀活动卡片样式
  .seckill-box {
    background: v-bind(seckillBg) no-repeat;
    background-size: 100% 100%; /* 背景适应 */
  }

  // 团购活动卡片样式
  .groupon-box {
    background: v-bind(grouponBg) no-repeat;
    background-size: 100% 100%; /* 背景适应 */
  }

  // 活动卡片样式
  .activity-box {
    width: 100%;
    height: 80rpx;
    box-sizing: border-box; /* 包括内边距和边框计算 */
    margin-bottom: 10rpx; /* 下边距 */

    .activity-title {
      font-size: 26rpx;
      font-weight: 500;
      color: #ffffff; /* 白色 */
      line-height: 42rpx;

      .activity-icon {
        width: 38rpx;
        height: 38rpx;
      }
    }

    .activity-go {
      width: 70rpx;
      height: 32rpx;
      background: #ffffff;
      border-radius: 16rpx;
      font-weight: 500;
      color: var(--ui-BG-Main); /* 主颜色 */
      font-size: 24rpx;
      line-height: normal;
    }
  }

  /* 弹框样式 */
  .model-box {
    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333333; /* 标题颜色 */
    }

    .subtitle {
      font-size: 26rpx;
      font-weight: 500;
      color: #333333; /* 副标题颜色 */
    }
  }
</style>
