<template>
  <s-layout title="会员等级" class="set-userinfo-wrap">
    <!-- 等级信息部分 -->
    <view class="notice-box">
      <view class="notice-box__content" style="overflow-x: auto; white-space: nowrap;">
        <!-- 遍历并展示等级信息 -->
        <view
          v-for="item in state.levelInfo"
          :key="item.id"
          class="background-container"
        >
          <!-- 确保 item 数据存在 -->
          <image
            v-if="item.backgroundUrl"
            class="background-image"
            :src="item.backgroundUrl"
            mode="aspectFill"
          />
          <image
            v-if="item.icon"
            class="icon-image"
            :src="item.icon"
            mode="aspectFit"
          />
          <!-- 文字覆盖层，展示等级信息 -->
          <view class="text-overlay">
            <text class="levelName">会员等级：{{ item.name || '未知' }}</text>
            <text class="discount">享受折扣：{{ item.discountPercent !== undefined ? item.discountPercent + '%' : '无' }}</text>
            <text class="experience">升级经验：{{ item.experience || '无' }}</text>
          </view>
        </view>
      </view>

      <!-- 当前等级信息展示 -->
      <view class="current-level">
        <view class="avatar-container">
          <image class="avatar" :src="state.model.avatar" mode="aspectFill" />
        </view>
        <view class="info-container">
          <view class="notice-item">
            <text class="title">当前等级：</text>
            <text class="detail">{{ state.model.level ? state.model.level.name : '未知' }}</text>
          </view>
          <view class="notice-item">
            <text class="title">当前经验：</text>
            <text class="detail">{{ state.model.experience || '无' }}</text>
          </view>
          <view class="notice-item">
            <text class="title">享受折扣：</text>
            <text class="detail">{{ state.model.level && state.model.level.discountPercent !== undefined ? state.model.level.discountPercent + '%' : '无' }}</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 文字说明区 -->
    <view class="description-area bg-white ss-m-t-16 ss-p-t-30 ss-p-b-60 ss-p-x-40">
      <text class="description-text"></text>
      <view class="activity-title ss-m-b-30">会员升级</view>
      <view class="activity-des">1、通过购物获取经验，提升您的会员等级，享受更多优惠！</view>
    </view>
  
    <!-- 信息区按钮部分 -->
    <view class="action-area">
      <view class="ss-reset-button action-button" @click="getExperience">
        <text class="button-text">获 取 经 验</text>
      </view>
    </view>
  </s-layout>
</template>

<script setup>
import { reactive, onBeforeMount } from 'vue';
import sheep from '@/sheep';
import { clone } from 'lodash-es';

const state = reactive({
  model: {}, // 用户个人信息
  levelInfo: [], // 用户等级信息
});

// 获取用户信息和等级信息
const getUserInfo = async () => {
  try {
    // 获取用户个人信息
    const userInfo = await sheep.$store('user').getInfo();
    state.model = clone(userInfo);

    // 获取用户等级信息
    const userLevel = await sheep.$store('user').getLevel();
    state.levelInfo = clone(userLevel);
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }
};

// 获取经验的处理方法
const getExperience = () => {
  console.log("获取经验的操作");
  // 跳转到类别页面进行相关操作
  uni.navigateTo({
    url: '/pages/index/category',
  });
};

// 在组件挂载前获取用户信息
onBeforeMount(() => {
  getUserInfo();
});
</script>

<style lang="scss" scoped>
.notice-box {
  background: #fff;
  border-radius: 8rpx;
  margin: 0 20rpx 20rpx 20rpx;

  .notice-box__content{
	border-radius: 20rpx; 
  }
  .current-level {
    display: flex;
    align-items: center;
    padding: 40rpx;
  }

  .avatar-container {
    margin-right: 20rpx;
  }

  .avatar {
    width: 180rpx;
    height: 180rpx;
    border-radius: 50%;
    margin-right: 50rpx;
  }

  .info-container {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .notice-item {
    display: flex;
    align-items: center;
    margin-bottom: 12rpx;
  }

  .title {
    font-size: 28rpx;
    color: #999;
    margin-right: 8rpx;
  }

  .detail {
    font-size: 28rpx;
    color: #333;
  }
}

/* 背景图及图标部分 */
.background-container {
  position: relative;
  display: inline-block;
  height: 400rpx;
  width: 100%;
}

.background-image {
  height: 100%;
  width: 100%;
}

.icon-image {
  position: absolute;
  top: 80rpx;
  right: 100rpx;
  width: 150rpx;
  height: 150rpx;
}

/* 等级信息文字覆盖层 */
.text-overlay {
  position: absolute;
  top: 100rpx;
  left: 20rpx;
  color: #fff;
  display: block;
}

.levelName,
.discount,
.experience {
  font-size: 30rpx;
  margin-bottom: 10rpx;
  display: block;
}

/* 文字说明区 */
.description-area {
  padding: 20rpx;
  border-radius: 8rpx;
  margin: 0 20rpx 20rpx 20rpx;
  background: #fff;
  text-align: left;
  .activity-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #333333;
  }
  .activity-des {
    font-size: 26rpx;
    font-weight: 500;
    color: #666666;
    line-height: 40rpx;
  }
}

/* 信息区按钮部分 */
.action-area {
  display: flex;
  justify-content: space-around;
  padding: 20rpx 0;
  background: #f7f7f7;
  .action-button {
    width: 710rpx;
    height: 80rpx;
    border-radius: 35rpx;
    font-size: 30rpx;
    font-weight: 500;
    box-shadow: 0 0.2em 0.5em rgba(var(--ui-BG-Main), 0.4);
    background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
    text-align: center;
    .button-text {
      font-size: 32rpx;
      color: #fff;
      text-align: center;
    }
  }
}
</style>
