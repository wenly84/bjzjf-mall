<template>
  <s-layout title="佣金排行榜">
    <view class="CommissionRank">
      <!-- 排行榜头部 -->
      <view class="header">
        <!-- 用户当前排名显示 -->
        <view class="rank" v-if="state.position">
          您目前的排名
          <text class="num">{{ state.position }}</text> 名
        </view>
        <view class="rank" v-else>您目前暂无排名</view>
      </view>

      <view class="wrapper">
        <!-- 时间切换按钮 -->
        <view class="nav acea-row row-around" style="justify-content: space-around; display: flex">
          <view
            class="item"
            :class="state.currentTab === index ? 'font-color' : ''"
            v-for="(item, index) in tabLabels"
            :key="index"
            @click="switchTab(index)">
            {{ item }}
          </view>
        </view>

        <!-- 排名列表 -->
        <view class="list">
          <view
            class="item acea-row row-between-wrapper"
            v-for="(item, index) in state.rankList"
            :key="index">
			<!-- 显示排名号 -->
			<view class="num">{{ index + 1 }}</view>

			<!-- 用户信息展示 -->
			<view class="picTxt acea-row">
			  <view class="pictrue">
				<image :src="item.avatar" alt="用户头像" />
			  </view>
			  <view class="text line1">{{ item.nickname || '匿名用户' }}</view>
			</view>

			<!-- 显示佣金金额 -->
			<view class="font-color">￥{{ fen2yuan(item.brokeragePrice) }}</view>
          </view>
        </view>

        <!-- 排名为空时的提示 -->
        <view
          class="noCommodity"
          v-if="state.rankList.length === 0 && (state.page !== 1 || state.active === 0)">
		  <view>暂无排行～</view>
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
  import { fen2yuan } from '@/sheep/hooks/useGoods';

  // 设置头部背景图
  const headerBg = sheep.$url.css('/static/image/mall/commission/commission_rank_header.png');

  // 设置时间排行标签
  const tabLabels = ['周排行', '月排行'];

  // 定义响应式状态
  const state = reactive({
    currentTab: 0, // 当前选中的时间选项
    position: 0, // 当前用户的排名
    rankList: [], // 排行榜列表
    isLoading: false, // 是否正在加载
    times: [], // 时间范围
    page: 1, // 当前页数
  });

  /**
   * 切换时间选项
   * @param {number} index - 当前选项的索引
   */
  async function switchTab(index) {
    state.currentTab = index;
    state.rankList = []; // 清空排行榜数据
    calculateTimes(); // 根据选项重新计算时间范围
    getBrokerageRankList(); // 获取佣金排行榜
    getBrokerageRankNumber(); // 获取用户当前排名
  }

  /**
   * 获取佣金排行榜数据
   */
  async function getBrokerageRankList() {
    state.isLoading = true;
    try {
      const { code, data } = await BrokerageApi.getBrokerageUserChildSummaryPageByPrice({
        pageNo: state.page,
        pageSize: 10,
        'times[0]': state.times[0],
        'times[1]': state.times[1],
      });
      if (code === 0) {
        state.rankList = data.list; // 更新排行榜数据
      }
    } catch (error) {
      console.error('获取排行榜数据失败:', error);
    } finally {
      state.isLoading = false;
    }
  }

  /**
   * 获取当前用户的排名
   */
  async function getBrokerageRankNumber() {
    try {
      const { code, data } = await BrokerageApi.getRankByPrice({
        times: state.times,
      });
      if (code === 0) {
        state.position = data; // 更新排名
      }
    } catch (error) {
      console.error('获取用户排名失败:', error);
    }
  }

  // 格式化日期为字符串
  function formatDate(date) {
    return sheep.$helper.timeFormat(date, 'yyyy-mm-dd hh:MM:ss');
  }

  /**
   * 计算当前选项对应的时间范围
   */
  function calculateTimes() {
    let times;
    if (state.currentTab === 0) {
      times = getWeekTimes(); // 获取本周时间范围
    } else {
      times = getMonthTimes(); // 获取本月时间范围
    }
    state.times = [formatDate(times[0]), formatDate(times[1])]; // 格式化并保存时间范围
  }

  /**
   * 页面加载时获取数据
   */
  onLoad(function () {
    calculateTimes(); // 计算时间范围
    getBrokerageRankList(); // 获取排行榜数据
    getBrokerageRankNumber(); // 获取用户排名
  });

  /**
   * 获取当前周的开始和结束时间
   */
  function getWeekTimes() {
    const today = new Date();
    const dayOfWeek = today.getDay();
    return [
      new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek, 0, 0, 0), // 周一
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + (6 - dayOfWeek),
        23,
        59,
        59, // 周日
      ),
    ];
  }

  /**
   * 获取当前月的开始和结束时间
   */
  function getMonthTimes() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const startDate = new Date(year, month, 1, 0, 0, 0); // 本月第一天
    const nextMonth = new Date(year, month + 1, 1);
    const endDate = new Date(nextMonth.getTime() - 1); // 上个月最后一天
    return [startDate, endDate];
  }
</script>

<style lang="scss" scoped>
  /* 样式定义，确保页面布局和元素样式符合设计规范 */
  .CommissionRank .header {
    //background: v-bind(headerBg) no-repeat;
	background: v-bind(headerBg) no-repeat, linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
    width: 100%;
    height: 344rpx;
    background-size: 100% 100%;
  }

  .CommissionRank .header .rank {
    font-size: 33rpx;
    color: $white;
    position: absolute;
    top: 160rpx;
    left: 48rpx;
  }

  .CommissionRank .header .rank .num {
    font-size: 51rpx;
    font-weight: bold;
    margin: 0 10rpx;
  }

  .CommissionRank .wrapper {
    width: 710rpx;
    background-color: #fff;
    border-radius: 14rpx;
    margin: -76rpx auto 0 auto;
  }

  .CommissionRank .wrapper .nav {
    height: 99rpx;
    border-bottom: 2.5rpx solid #f3f3f3;
    font-size: 30rpx;
    font-weight: bold;
    color: #999;
    line-height: 99rpx;
  }

  .CommissionRank .wrapper .nav .item.font-color {
    border-bottom: 4rpx solid var(--ui-BG-Main);
    margin-top: -2rpx;
    color: var(--ui-BG-Main);
  }

  .CommissionRank .wrapper .list {
    padding: 0 30rpx;
  }

  .CommissionRank .wrapper .list .item {
	display: flex;
	align-items: center;
	padding: 10rpx 0;
	border-bottom: 1px solid #f3f3f3;
  }

  .CommissionRank .wrapper .list .item .num {
    color: #666;
    width: 70rpx;
  }

  .CommissionRank .wrapper .list .item .num image {
    width: 34rpx;
    height: 40rpx;
    display: block;
  }

  .CommissionRank .wrapper .list .item .picTxt {
    display: flex;
    align-items: center;
    flex: 1;
    margin-left: 20rpx;
  }

  .CommissionRank .wrapper .list .item .picTxt .pictrue {
    width: 68rpx;
    height: 68rpx;
	margin-right: 10rpx;
  }

  .CommissionRank .wrapper .list .item .picTxt .pictrue image {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 50%;
  }
  
  .CommissionRank .wrapper .list .font-color  {
	color: var(--ui-BG-Main);
  }


</style>
