<!-- 分销账户：展示基本统计信息 -->
<template>
  <view class="account-card">
    <!-- 账户信息卡片 -->
    <view class="account-card-box">
      <!-- 卡片头部：包含标题和操作按钮 -->
      <view class="ss-flex ss-row-between card-box-header">
        <!-- 左侧部分：标题和金额显示切换 -->
        <view class="ss-flex">
          <view class="header-title ss-m-r-16">账户信息</view>
          <!-- 切换金额显示/隐藏 -->
          <button
            class="ss-reset-button look-btn ss-flex"
            @tap="state.showMoney = !state.showMoney"
          >
            <uni-icons
              :type="state.showMoney ? 'eye-filled' : 'eye-slash-filled'"
              color="$white"
              size="20"
            />
          </button>
        </view>
        <!-- 右侧部分：查看账户明细 -->
        <view
          class="ss-flex"
          @tap="sheep.$router.go('/pages/commission/wallet')"
        >
          <view class="header-title ss-m-r-4">查看明细</view>
          <text class="cicon-play-arrow" />
        </view>
      </view>

      <!-- 收益信息展示 -->
      <view class="card-content ss-flex">
        <!-- 当前佣金 -->
        <view class="ss-flex-1 ss-flex-col ss-col-center">
          <view class="item-title">当前佣金(元)</view>
          <view class="item-detail">
            {{ state.showMoney ? fen2yuan(state.summary.brokeragePrice || 0) : '***' }}
          </view>
        </view>
        <!-- 昨天的佣金 -->
        <view class="ss-flex-1 ss-flex-col ss-col-center">
          <view class="item-title">昨天的佣金(元)</view>
          <view class="item-detail">
            {{ state.showMoney ? fen2yuan(state.summary.yesterdayPrice || 0) : '***' }}
          </view>
        </view>
        <!-- 累计已提金额 -->
        <view class="ss-flex-1 ss-flex-col ss-col-center">
          <view class="item-title">累计已提(元)</view>
          <view class="item-detail">
            {{ state.showMoney ? fen2yuan(state.summary.withdrawPrice || 0) : '***' }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  // 引入依赖模块
  import sheep from '@/sheep';
  import { computed, reactive, onMounted } from 'vue';
  import BrokerageApi from '@/sheep/api/trade/brokerage';
  import { fen2yuan } from '@/sheep/hooks/useGoods'; // 工具函数：分转元

  // 计算属性：用户信息
  const userInfo = computed(() => sheep.$store('user').userInfo);

  // 组件状态管理
  const state = reactive({
    showMoney: false, // 是否显示金额
    summary: {}, // 保存账户统计数据
  });

  // 获取账户统计信息
  onMounted(async () => {
    const { code, data } = await BrokerageApi.getBrokerageUserSummary();
    if (code === 0) {
      state.summary = data || {}; // 数据赋值
    }
  });
</script>

<style lang="scss" scoped>
/* 样式：账户卡片 */
.account-card {
  margin: 0rpx 16rpx 20rpx; /* 外边距 */
  padding: 2rpx; /* 内边距 */
  border: 2rpx solid var(--ui-BG-Main-light); /* 边框颜色 */
  border-radius: 12rpx; /* 圆角 */
  z-index: 3; /* 层级 */
  position: relative;

  .account-card-box {
    border-radius: 8rpx; /* 内部卡片圆角 */
    background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient)); /* 渐变背景 */

    .card-box-header {
      padding: 0 30rpx; /* 内边距 */
      height: 72rpx; /* 高度 */

      .header-title {
        font-size: 24rpx; /* 字体大小 */
        font-weight: 500; /* 字体加粗 */
        color: $white; /* 字体颜色 */
        line-height: 30rpx; /* 行高 */
      }

      .look-btn {
        color: $white; /* 按钮字体颜色 */
      }

      .cicon-play-arrow {
        color: $white; /* 图标颜色 */
        font-size: 24rpx; /* 图标大小 */
        line-height: 30rpx; /* 行高 */
      }
    }

    .card-content {
      height: 190rpx; /* 内容区域高度 */
      background: $white; /* 背景色 */

      .item-title {
        font-size: 24rpx; /* 标题字体大小 */
        font-weight: 500; /* 加粗 */
        color: #cba67e; /* 标题颜色 */
        line-height: 30rpx; /* 行高 */
        margin-bottom: 24rpx; /* 下边距 */
      }

      .item-detail {
        font-size: 36rpx; /* 金额字体大小 */
        font-family: OPPOSANS; /* 字体 */
        font-weight: bold; /* 加粗 */
        color: #692e04; /* 金额颜色 */
        line-height: 30rpx; /* 行高 */
      }
    }
  }
}
</style>
