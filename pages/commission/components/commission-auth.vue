<!-- 分销权限弹窗：在用户无权限时进行提示 -->
<template>
  <su-popup
    :show="state.show"
    type="center"
    round="10"
    @close="state.show = false"
    :isMaskClick="false"
    maskBackgroundColor="rgba(0, 0, 0, 0.7)"
  >
    <view class="notice-box">
      <!-- 图标区域 -->
      <view class="img-wrap">
        <image
          class="notice-img"
          :src="sheep.$url.static('/static/image/mall/commission/forbidden.png')"
          mode="aspectFill"
        />
      </view>
      <!-- 提示标题 -->
      <view class="notice-title">抱歉！您没有分销权限</view>
      <!-- 提示详情 -->
      <view class="notice-detail">该功能暂不可用</view>
      <!-- 知道了按钮 -->
      <button
        class="ss-reset-button notice-btn ui-Shadow-Main ui-BG-Main-Gradient"
        @tap="sheep.$router.back()"
      >
        知道了
      </button>
      <!-- 返回按钮 -->
      <button
        class="ss-reset-button back-btn"
        @tap="sheep.$router.back()"
      >
        返回
      </button>
    </view>
  </su-popup>
</template>

<script setup>
  // 引入必要模块
  import { onShow } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import { reactive } from 'vue';
  import BrokerageApi from '@/sheep/api/trade/brokerage';

  // 定义组件状态
  const state = reactive({
    show: false, // 控制弹窗是否显示
  });

  // 页面显示时检查分销权限
  onShow(async () => {
    try {
      const { code, data } = await BrokerageApi.getBrokerageUser();
      if (code === 0 && !data?.brokerageEnabled) {
        state.show = true; // 如果没有权限，显示弹窗
      }
    } catch (error) {
      console.error('获取分销权限失败：', error);
    }
  });
</script>

<style lang="scss" scoped>
/* 样式：分销权限提示弹窗 */
.notice-box {
  display: flex;
  flex-direction: column; /* 垂直布局 */
  justify-content: center; /* 垂直居中 */
  align-items: center; /* 水平居中 */
  background-color: #fff;
  width: 612rpx; /* 宽度 */
  min-height: 658rpx; /* 最小高度 */
  padding: 30rpx; /* 内边距 */
  border-radius: 20rpx; /* 圆角 */
  
  .img-wrap {
    margin-bottom: 50rpx; /* 图片与标题的间距 */
    .notice-img {
      width: 180rpx; /* 图片宽度 */
      height: 170rpx; /* 图片高度 */
    }
  }

  .notice-title {
    font-size: 35rpx; /* 标题字体大小 */
    font-weight: bold; /* 字体加粗 */
    color: #333; /* 字体颜色 */
    margin-bottom: 28rpx; /* 标题与详情的间距 */
  }

  .notice-detail {
    font-size: 28rpx; /* 详情字体大小 */
    font-weight: 400; /* 正常字体 */
    color: #999; /* 字体颜色 */
    line-height: 36rpx; /* 行高 */
    margin-bottom: 50rpx; /* 详情与按钮的间距 */
  }

  .notice-btn {
    width: 492rpx; /* 按钮宽度 */
    line-height: 70rpx; /* 按钮高度 */
    border-radius: 35rpx; /* 按钮圆角 */
    font-size: 28rpx; /* 字体大小 */
    font-weight: 500; /* 字体加粗 */
    color: #fff; /* 字体颜色 */
    margin-bottom: 10rpx; /* 按钮之间的间距 */
  }

  .back-btn {
    width: 492rpx; /* 按钮宽度 */
    line-height: 70rpx; /* 按钮高度 */
    font-size: 28rpx; /* 字体大小 */
    font-weight: 500; /* 字体加粗 */
    color: var(--ui-BG-Main-gradient); /* 字体颜色 */
    background: none; /* 无背景 */
  }
}
</style>
