<template>
  <s-layout title="推广人排行榜">
    <view class="PromoterRank">
      <view>
        <view class="header">
          <view class="nav acea-row row-center-wrapper" style='display:flex'>
            <view 
              class="item" 
              :class="state.currentTab === index ? 'font-color' : ''"
              v-for="(item, index) in tabMaps" 
              :key="index" 
              @click="switchTap(index)"
            >
              {{ item }}
            </view>
          </view>

          <!-- top3 排名 -->
          <view class="rank">
            <view class="item" v-if="state.one && state.one.id">
              <view class="pictrue">
                <image :src="state.one.avatar"></image>
              </view>
              <view class="name">{{ state.one.nickname }}</view>
              <view class="num">{{ state.one.brokerageUserCount }}人</view>
            </view>

            <view class="item" v-if="state.two && state.two.id">
              <view class="pictrue">
                <image :src="state.two.avatar"></image>
              </view>
              <view class="name">{{ state.two.nickname }}</view>
              <view class="num">{{ state.two.brokerageUserCount }}人</view>
            </view>

            <view class="item" v-if="state.three && state.three.id">
              <view class="pictrue">
                <image :src="state.three.avatar"></image>
              </view>
              <view class="name">{{ state.three.nickname }}</view>
              <view class="num">{{ state.three.brokerageUserCount }}人</view>
            </view>
          </view>
        </view>

        <!-- 其它排名 -->
        <view class="list" v-if="state.rankList.length">
          <view class="picTxt" v-for="(item, index) in state.rankList" :key="index">
            <view class="num">{{ index + 4 }}</view>
            <view style="display:flex; align-items: center;">
              <view class="pictrue">
                <image :src="item.avatar"></image>
              </view>
              <view class="text_line1">{{ item.nickname }}</view>
            </view>
            <view class="font-color">{{ item.brokerageUserCount }}人</view>
          </view>
        </view>
      </view>
    </view>
  </s-layout>
</template>


<script setup>
  import sheep from '@/sheep';
  import { onLoad } from '@dcloudio/uni-app';
  import { reactive } from 'vue';
  import BrokerageApi from '@/sheep/api/trade/brokerage';
  
  const headerBg = sheep.$url.css('/static/image/mall/commission/promoter_rank_header.png');
  const promoterRankFirst = sheep.$url.css('/static/image/mall/commission/promoter_rank_first.png');
  const promoterRankSecond = sheep.$url.css('/static/image/mall/commission/promoter_rank_second.png');
  const promoterRankThird = sheep.$url.css('/static/image/mall/commission/promoter_rank_third.png');
  const tabMaps = ['周排行', '月排行'];

  const state = reactive({
    currentTab: 0,

    rankList: [],
    times: [],

    one: {}, // 排名第一
    two: {}, // 排名第二
    three: {}, // 排名第三
  });

  function switchTap(index) {
    if (state.currentTab === index) {
      return;
    }
    state.currentTab = index;
    calculateTimes();
    getRankList();
  }

  async function getRankList() {
    // 重置数据
    state.one = {};
    state.two = {};
    state.three = {};
    state.rankList = [];
    // 查询
    const { code, data } = await BrokerageApi.getBrokerageUserRankPageByUserCount({
      pageNo: 1,
      pageSize: 10,
      'times[0]': state.times[0],
      'times[1]': state.times[1],
    });
    if (code !== 0) {
      return;
    }
    state.rankList = data.list;
    state.one = state.rankList.shift() || {};
    state.two = state.rankList.shift() || {};
    state.three = state.rankList.shift() || {};
  }

  function calculateTimes() {
    let times;
    if (state.currentTab === 0) {
      times = getWeekTimes();
    } else {
      times = getMonthTimes();
    }
    state.times = [formatDate(times[0]), formatDate(times[1])];
  }

  onLoad(function () {
    calculateTimes();
    getRankList();
  });

  function formatDate(date) {
    return sheep.$helper.timeFormat(date, 'yyyy-mm-dd hh:MM:ss');
  }

  /**
   * 获得当前周的开始和结束时间
   */
  function getWeekTimes() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    return [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek, 0, 0, 0),
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + (6 - dayOfWeek), 23, 59, 59, ),
    ];
  }

  /**
   * 获得当前月的开始和结束时间
   */
  function getMonthTimes() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const startDate = new Date(year, month, 1, 0, 0, 0);
    const nextMonth = new Date(year, month + 1, 1);
    const endDate = new Date(nextMonth.getTime() - 1);
    return [startDate, endDate];
  }
</script>

<style lang="scss" scoped>

  .PromoterRank .header {
	background: v-bind(headerBg) no-repeat, linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
    width: 100%;
    height: 80rpx;
    background-size: 100% 100%;
  }

  .PromoterRank .header .nav {
    width: 450rpx;
    height: 66rpx;
    border: 1px solid $white;
    border-radius: 33rpx;
    font-size: 30rpx;
    color: $white;
    margin: 0 auto;
  }

  .PromoterRank .header .nav .item {
    width: 223rpx;
    height: 100%;
    text-align: center;
    line-height: 60rpx;	
  }

  .PromoterRank .header .nav .item.font-color:nth-of-type(1) {
    background-color: $white;
    border-radius: 33rpx 0 0 33rpx;
    color: var(--ui-BG-Main);
  }

  .PromoterRank .header .nav .item.font-color:nth-of-type(2) {
    background-color: $white;
    border-radius: 0 33rpx 33rpx 0;
    color: var(--ui-BG-Main);
  }

  .PromoterRank .header .rank {
    padding: 0 20rpx;
	background: linear-gradient(180deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
  }
  
  .PromoterRank .header .rank .item{
  	margin-bottom: 80rpx;
  	display: flex;
   }
  
  .PromoterRank .header .rank .item .pictrue {    
	background-image: v-bind(promoterRankFirst) ;
    background-size: 100% 100%;
	width: 156rpx;
	height: 205rpx;
    position: relative;
	margin-left: 200rpx;
  }

  .PromoterRank .header .rank .item .pictrue image {
    position: absolute;
	width: 150rpx;
	height: 150rpx;
	margin-left: -75rpx;
    display: block;
    bottom: 2rpx;
    border-radius: 50%;
    left: 50%;
  }
  
  .PromoterRank .header .rank .item:nth-of-type(2) .pictrue {
      background-image: v-bind(promoterRankSecond) ;
      background-size: 100% 100%;
	  width: 156rpx;
	  height: 205rpx;
   }
  
  .PromoterRank .header .rank .item:nth-of-type(3) .pictrue {
    background-image: v-bind(promoterRankThird) ;
	background-size: 100% 100%;
	width: 156rpx;
	height: 205rpx;
  }
  
  .PromoterRank .header .rank .item .name {
    font-size: 30rpx;
    color: $white;
    margin-top: 100rpx;
	margin-left: 20rpx;
  }

  .PromoterRank .header .rank .item .num {
    font-size: 30rpx;
	margin-top: 100rpx;
    color: $white;
	margin-left: 150rpx
  }

  .PromoterRank .list {
    width: 100%;
    background: var(--ui-BG-Main-gradient);
    padding: 0 30rpx;
  }

  .PromoterRank .list .picTxt {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 20rpx;
  }

  .PromoterRank .list .picTxt .num {
    color: $white;
    width: 70rpx;
	margin-right: 80rpx;
  }

  .PromoterRank .list .picTxt .pictrue image{
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
	margin-right: 20rpx;
  }

  .PromoterRank .list .picTxt .text_line1 {
    width: 100rpx;
    color: $white;
	margin-right: 100rpx;
  }

  .PromoterRank .list .picTxt .font-color {
    width: 100rpx;
    text-align: right;
	color: $white;
  }

</style>
