<!-- 分销商信息：展示用户基本资料 -->
<template>
  <!-- 用户资料卡片 -->
  <view class="user-card ss-flex ss-col-bottom">
    <!-- 卡片顶部内容 -->
    <view class="card-top ss-flex ss-row-between">
      <view class="ss-flex">
        <!-- 用户头像 -->
        <view class="head-img-box">
          <image
            class="head-img"
            :src="sheep.$url.cdn(userInfo.avatar)"
            mode="aspectFill"
          ></image>
        </view>
        <!-- 用户昵称 -->
        <view class="ss-flex-col">
          <view class="user-name">{{ userInfo.nickname }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  // 引入依赖模块
  import sheep from '@/sheep';
  import { computed, reactive } from 'vue';

  // 获取用户信息
  const userInfo = computed(() => sheep.$store('user').userInfo);

  // 背景图路径
  const headerBg = sheep.$url.css('/static/image/mall/commission/background.png');

  // 定义组件状态
  const state = reactive({
    showMoney: false, // 控制是否显示金额（预留功能）
  });
</script>

<style lang="scss" scoped>
/* 用户资料卡片样式 */
.user-card {
  height: 192rpx; /* 卡片高度 */
  border-radius: 8rpx; /* 圆角 */
  margin: 0rpx 16rpx 16rpx 16rpx; /* 外边距 */
  padding-top: 50rpx; /* 上内边距 */
  background: v-bind(headerBg) no-repeat, linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient)); /* 背景图片和渐变 */
  background-size: 100% 100%; /* 背景大小为全覆盖 */

  /* 用户头像样式 */
  .head-img-box {
    margin-left: 10rpx;
    margin-right: 20rpx;
    width: 100rpx; /* 宽度 */
    height: 100rpx; /* 高度 */
    border-radius: 50%; /* 圆形边框 */
    position: relative;
    background: $white; /* 背景为白色 */

    .head-img {
      width: 92rpx; /* 头像宽度 */
      height: 92rpx; /* 头像高度 */
      border-radius: 50%; /* 圆形边框 */
      position: absolute; /* 绝对定位 */
      top: 50%; /* 垂直居中 */
      left: 50%; /* 水平居中 */
      transform: translate(-50%, -50%); /* 中心点对齐 */
    }
  }

  /* 卡片顶部样式 */
  .card-top {
    box-sizing: border-box; /* 包含内边距和边框 */
    padding-bottom: 34rpx; /* 下内边距 */

    .user-name {
      font-size: 32rpx; /* 字体大小 */
      font-weight: bold; /* 字体加粗 */
      color: $white; /* 字体颜色为白色 */
      line-height: 30rpx; /* 行高 */
      margin-bottom: 20rpx; /* 下边距 */
    }
  }
}
</style>
