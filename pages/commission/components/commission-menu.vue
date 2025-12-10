<!-- 分销：商菜单栏 -->
<template>
  <view class="menu-box ss-flex-col">
    <!-- 菜单栏顶部 -->
    <view class="header-box">
      <!-- 背景图 -->
      <image
        class="header-bg"
        :src="sheep.$url.static('/static/image/mall/commission/title1.png')"
      />
      <!-- 标题 -->
      <view class="ss-flex header-title">
        <view class="title">功能专区</view>
        <text class="cicon-forward"></text>
      </view>
    </view>

    <!-- 功能菜单列表 -->
    <view class="menu-list ss-flex ss-flex-wrap">
      <view
        v-for="(item, index) in state.menuList"
        :key="index"
        class="item-box ss-flex-col ss-col-center"
        @tap="sheep.$router.go(item.path)"
      >
        <!-- 菜单图标 -->
        <image
          class="menu-icon ss-m-b-10"
          :src="sheep.$url.static(item.img)"
          mode="aspectFill"
        ></image>
        <!-- 菜单标题 -->
        <view>{{ item.title }}</view>
      </view>
    </view>
  </view>
</template>

<script setup>
  // 引入依赖模块
  import sheep from '@/sheep';
  import { reactive } from 'vue';

  // 定义组件状态
  const state = reactive({
    menuList: [
      {
        img: '/static/image/mall/commission/commission_icon_wdtd.png',
        title: '我的团队', // 菜单标题
        path: '/pages/commission/team', // 路由路径
      },
      {
        img: '/static/image/mall/commission/commission_icon_yjmx.png',
        title: '佣金明细',
        path: '/pages/commission/wallet',
      },
      {
        img: '/static/image/mall/commission/commission_icon_fxdd.png',
        title: '分销订单',
        path: '/pages/commission/order',
      },
      {
        img: '/static/image/mall/commission/commission_icon_tgsp.png',
        title: '推广商品',
        path: '/pages/commission/goods',
      },
      {
        img: '/static/image/mall/commission/commission_icon_yqhb.png',
        title: '邀请海报',
        path: 'action:showShareModal',
      },
      {
        img: '/static/image/mall/commission/commission_icon_tgph.png',
        title: '推广排行',
        path: '/pages/commission/promoter',
      },
      {
        img: '/static/image/mall/commission/commission_icon_yjph.png',
        title: '佣金排行',
        path: '/pages/commission/commission-ranking',
      },
    ],
  });
</script>

<style lang="scss" scoped>
/* 菜单栏样式 */
.menu-box {
  margin: 0 16rpx 20rpx 16rpx; /* 外边距 */
  border-radius: 8rpx; /* 圆角 */
  z-index: 3;
  position: relative;
  border: 2rpx solid var(--ui-BG-Main-light); /* 边框颜色 */
}

/* 菜单栏顶部样式 */
.header-box {
  height: 76rpx; /* 高度 */
  position: relative;

  .header-bg {
    border-radius: 8rpx; /* 圆角 */
    background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient)); /* 渐变背景 */
    width: 100%; /* 宽度 */
    height: 76rpx; /* 高度 */
  }

  .header-title {
    position: absolute; /* 绝对定位 */
    left: 20rpx; /* 左边距 */
    top: 24rpx; /* 顶边距 */
  }

  .title {
    font-size: 28rpx; /* 字体大小 */
    font-weight: 500; /* 字重 */
    color: $white; /* 白色字体 */
    line-height: 30rpx; /* 行高 */
  }

  .cicon-forward {
    font-size: 30rpx; /* 字体大小 */
    font-weight: 400; /* 字重 */
    color: $white; /* 白色字体 */
    line-height: 30rpx; /* 行高 */
  }
}

/* 菜单列表样式 */
.menu-list {
  padding: 50rpx 0 10rpx 0; /* 内边距 */
  background: $white; /* 背景颜色 */
  border-radius: 0 0 12rpx 12rpx; /* 底部圆角 */
}

/* 单个菜单项样式 */
.item-box {
  width: 25%; /* 宽度占比 */
  margin-bottom: 40rpx; /* 下边距 */
}

.menu-icon {
  width: 68rpx; /* 图标宽度 */
  height: 68rpx; /* 图标高度 */
  background: $white; /* 图标背景色 */
  border-radius: 50%; /* 圆形边框 */
}

.menu-title {
  font-size: 26rpx; /* 标题字体大小 */
  font-weight: 500; /* 字体加粗 */
  color: $white; /* 字体颜色 */
}
</style>
