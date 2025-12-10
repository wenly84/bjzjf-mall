<!-- 首页，支持店铺装修 -->
<template>
  <view v-if="template">
    <s-layout
      title="首页"
      navbar="custom"
      tabbar="/pages/index/index"
      :bgStyle="template.page"
      :navbarStyle="template.navigationBar"
      onShareAppMessage>
      <s-block
        v-for="(item, index) in template.components"
        :key="index"
        :styles="item.property.style"
      >
        <s-block-item :type="item.id" :data="item.property" :styles="item.property.style" />
      </s-block>
    </s-layout>
  </view>
</template>

<script setup>
  import { computed } from 'vue';
  import { onLoad, onPageScroll, onPullDownRefresh } from '@dcloudio/uni-app';
  import sheep from '@/sheep';
  import $share from '@/sheep/platform/share';
  import sys from '@/sheep/store/sys';
  // 隐藏原生tabBar
  uni.hideTabBar();
  
  const template = computed(() => sheep.$store('app').template?.home);

  onLoad((options) => {
    // #ifdef MP
    // 小程序识别二维码
    if (options.scene) {
      const sceneParams = decodeURIComponent(options.scene).split('=');
      console.log('sceneParams=>', sceneParams);
      options[sceneParams[0]] = sceneParams[1];
    }
    // #endif

    // 预览模板
    if (options.templateId) {
      sheep.$store('app').init(options.templateId);
    }

    // 解析分享信息
    if (options.spm) {
      $share.decryptSpm(options.spm);
    }
	
    // 进入指定页面(完整页面路径)
    if (options.page) {
      sheep.$router.go(decodeURIComponent(options.page));
    }
  });

  // 下拉刷新
  onPullDownRefresh(() => {
    sheep.$store('app').init();
    setTimeout(function () {
      uni.stopPullDownRefresh();
    }, 800);
  });

  onPageScroll(() => {});
</script>

<style></style>
