<template>
  <s-layout title="积分商城" navbar="normal" :leftWidth="0" :rightWidth="0">
    <scroll-view
      class="scroll-box"
      :style="{ height: pageHeight + 'rpx' }"
      scroll-y="true"
      :scroll-with-animation="false"
      :enable-back-to-top="true">
      
      <s-point-card ref="sPointCardRef" class="point-card"/>
      
      <s-empty
        v-if="activityTotal === 0"
        icon="/static/images/goods-empty.png"
        text="暂无积分商品"
      />
      
      <uni-load-more
        v-if="activityTotal > 0"
        :status="loadStatus"
        :content-text="{
          contentdown: '上拉加载更多'
        }"
        @tap="loadMore"
      />
      
    </scroll-view>
  </s-layout>
</template>

<script setup>
  import sheep from '@/sheep';
  import { onLoad, onReachBottom } from '@dcloudio/uni-app';
  import { reactive, ref } from 'vue';
  import PointApi from '@/sheep/api/promotion/point';
  
  // 计算页面高度
  const { safeAreaInsets, safeArea } = sheep.$platform.device;
  const statusBarHeight = sheep.$platform.device.statusBarHeight * 2;
  const pageHeight = (safeArea.height + safeAreaInsets.bottom) * 2 + statusBarHeight - sheep.$platform.navbar - 100;

  const sPointCardRef = ref();
  const activityPageParams = reactive({
    pageNo: 1,
    pageSize: 5,
  });

  const activityTotal = ref(0);
  const activityCount = ref(0);
  const loadStatus = ref('loading');  // 初始为 loading

  const LoadStatus = {
    LOADING: 'loading',
    MORE: 'more',
    NO_MORE: 'noMore'
  };

  // 获取活动列表
  async function getActivityList() {
    loadStatus.value = LoadStatus.LOADING;
    
    try {
      const { data } = await PointApi.getPointActivityPage(activityPageParams);
      await sPointCardRef.value.concatActivity(data.list);
      activityCount.value = sPointCardRef.value.getActivityCount();
      activityTotal.value = data.total;

      loadStatus.value = activityCount.value < activityTotal.value ? LoadStatus.MORE : LoadStatus.NO_MORE;
    } catch (error) {
      console.error('加载活动失败:', error);
      loadStatus.value = LoadStatus.NO_MORE;  // 错误时显示没有更多
    }
  }

  // 加载更多
  function loadMore() {
    if (loadStatus.value !== LoadStatus.NO_MORE) {
      activityPageParams.pageNo += 1;
      getActivityList();
    }
  }

  // 上拉加载更多
  onReachBottom(() => {
    loadMore();
  });

  onLoad(() => {
    getActivityList();
  });
</script>

<style lang="scss" scoped>
  .scroll-box {
    margin-top: 15rpx;
	padding-top: 0rpx;
	.point-card{
		margin-top: 0rpx;
		padding-top: 0rpx;
	}
  }
</style>