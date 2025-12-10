<!-- 装修商品组件：商品卡片 -->
<template>
  <view>
    <!-- 布局1. 单列大图（上图，下内容）-->
    <view
      v-if="layoutType === LayoutTypeEnum.ONE_COL_BIG_IMG && state.goodsList?.length"
      class="goods-sl-box"
    >
      <view
        class="goods-box"
        v-for="item in state.goodsList"
        :key="item.id"
        :style="[{ marginBottom: data.space * 2 + 'rpx' }]"
      >
        <s-goods-column
          size="sl"
          :goodsFields="data.fields"
          :tagStyle="data.badge"
          :data="item"
          :titleColor="data.fields.name?.color"
          :subTitleColor="data.fields.introduction?.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
        >
          <!-- 购买按钮 -->
          <template v-slot:cart>
            <button class="ss-reset-button cart-btn" :style="[buyStyle]">
              {{ btnBuy?.type === 'text' ? btnBuy.text : '' }}
            </button>
          </template>
        </s-goods-column>
      </view>
    </view>

    <!-- 布局2. 双列（每一列：上图，下内容）-->
    <view
      v-if="layoutType === LayoutTypeEnum.TWO_COL && state.goodsList?.length"
      class="goods-md-wrap ss-flex ss-flex-wrap ss-col-top"
    >
      <view class="goods-list-box">
        <view
          class="left-list"
          :style="[{ paddingRight: data.space + 'rpx', marginBottom: data.space + 'px' }]"
          v-for="item in state.leftGoodsList"
          :key="item.id"
        >
          <s-goods-column
            class="goods-md-box"
            size="md"
            :goodsFields="data.fields"
            :tagStyle="data.badge"
            :data="item"
            :titleColor="data.fields.name?.color"
            :subTitleColor="data.fields.introduction?.color"
            :topRadius="data.borderRadiusTop"
            :bottomRadius="data.borderRadiusBottom"
            :titleWidth="330 - marginLeft - marginRight"
            @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            @getHeight="calculateGoodsColumn($event, 'left')"
          >
            <!-- 购买按钮 -->
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn" :style="[buyStyle]">
                {{ btnBuy?.type === 'text' ? btnBuy.text : '' }}
              </button>
            </template>
          </s-goods-column>
        </view>
      </view>
      <view class="goods-list-box">
        <view
          class="right-list"
          :style="[{ paddingLeft: data.space + 'rpx', marginBottom: data.space + 'px' }]"
          v-for="item in state.rightGoodsList"
          :key="item.id"
        >
          <s-goods-column
            class="goods-md-box"
            size="md"
            :goodsFields="data.fields"
            :tagStyle="data.badge"
            :data="item"
            :titleColor="data.fields.name?.color"
            :subTitleColor="data.fields.introduction?.color"
            :topRadius="data.borderRadiusTop"
            :bottomRadius="data.borderRadiusBottom"
            :titleWidth="330 - marginLeft - marginRight"
            @click="sheep.$router.go('/pages/goods/index', { id: item.id })"
            @getHeight="calculateGoodsColumn($event, 'right')"
          >
            <!-- 购买按钮 -->
            <template v-slot:cart>
              <button class="ss-reset-button cart-btn" :style="[buyStyle]">
                {{ btnBuy?.type === 'text' ? btnBuy.text : '' }}
              </button>
            </template>
          </s-goods-column>
        </view>
      </view>
    </view>

    <!-- 布局3. 单列小图（左图，右内容） -->
    <view
      v-if="layoutType === LayoutTypeEnum.ONE_COL_SMALL_IMG && state.goodsList?.length"
      class="goods-lg-box"
    >
      <view
        class="goods-box"
        :style="[{ marginBottom: data.space + 'px' }]"
        v-for="item in state.goodsList"
        :key="item.id"
      >
        <s-goods-column
          class="goods-card"
          size="lg"
          :goodsFields="data.fields"
          :data="item"
          :tagStyle="data.badge"
          :titleColor="data.fields.name?.color"
          :subTitleColor="data.fields.introduction?.color"
          :topRadius="data.borderRadiusTop"
          :bottomRadius="data.borderRadiusBottom"
          @tap="sheep.$router.go('/pages/goods/index', { id: item.id })"
        >
          <!-- 购买按钮 -->
          <template v-slot:cart>
            <button class="ss-reset-button cart-btn" :style="[buyStyle]">
              {{ btnBuy?.type === 'text' ? btnBuy.text : '' }}
            </button>
          </template>
        </s-goods-column>
      </view>
    </view>
  </view>
</template>

<script setup>
  /**
   * 商品卡片
   */
  import { computed, reactive, onMounted } from 'vue';
  import sheep from '@/sheep';
  import SpuApi from '@/sheep/api/product/spu';

  // 布局类型
  const LayoutTypeEnum = {
    // 单列大图
    ONE_COL_BIG_IMG: 'oneColBigImg',
    // 双列
    TWO_COL: 'twoCol',
    // 单列小图
    ONE_COL_SMALL_IMG: 'oneColSmallImg',
  };

  const state = reactive({
    goodsList: [],
    leftGoodsList: [],
    rightGoodsList: [],
  });

  const props = defineProps({
    data: {
      type: Object,
      default() {
        return {};
      },
    },
    styles: {
      type: Object,
      default() {
        return {};
      },
    },
  });

  const { layoutType = '', btnBuy = {}, spuIds = [] } = props.data || {};
  const { marginLeft = 0, marginRight = 0 } = props.styles || {};

  // 购买按钮样式
  const buyStyle = computed(() => {
    const style = {};

    if (btnBuy?.type === 'text') {
      style.background = `linear-gradient(to right, ${btnBuy.bgBeginColor}, ${btnBuy.bgEndColor})`;
    } else if (btnBuy?.type === 'img') {
      Object.assign(style, {
        width: '54rpx',
        height: '54rpx',
        background: `url(${sheep.$url.cdn(btnBuy.imgUrl)}) no-repeat`,
        backgroundSize: '100% 100%',
      });
    }

    return style;
  });

  //region 商品瀑布流布局
  // 下一个要处理的商品索引
  let count = 0;
  // 左列的高度
  let leftHeight = 0;
  // 右列的高度
  let rightHeight = 0;

  /**
   * 计算商品在左列还是右列
   * @param height 商品的高度
   * @param where 添加到哪一列
   */
  function calculateGoodsColumn(height = 0, where = 'left') {
    if (!state.goodsList?.[count]) return;

    if (where === 'left') {
      leftHeight += height;
    } else if (where === 'right') {
      rightHeight += height;
    }

    const targetList = leftHeight <= rightHeight ? state.leftGoodsList : state.rightGoodsList;
    targetList.push(state.goodsList[count]);
    count++;
  }
  //endregion

  /**
   * 根据商品编号列表，获取商品列表
   * @param ids 商品编号列表
   * @return {Promise<Array>} 商品列表
   */
  async function getGoodsListByIds(ids) {
    if (!ids) return [];
    try {
      const { data } = await SpuApi.getSpuListByIds(ids);
      return data || [];
    } catch (error) {
      console.error('获取商品列表失败:', error);
      return [];
    }
  }

  // 初始化
  onMounted(async () => {
    try {
      if (!spuIds?.length) return;

      state.goodsList = await getGoodsListByIds(spuIds.join(','));

      if (layoutType === LayoutTypeEnum.TWO_COL && state.goodsList.length) {
        calculateGoodsColumn();
      }
    } catch (error) {
      console.error('商品卡片初始化失败:', error);
    }
  });
</script>

<style lang="scss" scoped>
  .goods-md-wrap {
    width: 100%;
  }

  .goods-list-box {
    width: 50%;
    box-sizing: border-box;
    .left-list {
      &:nth-last-child(1) {
        margin-bottom: 0 !important;
      }
    }
    .right-list {
      &:nth-last-child(1) {
        margin-bottom: 0 !important;
      }
    }
  }

  .goods-box {
    &:nth-last-of-type(1) {
      margin-bottom: 0 !important;
    }
  }

  .goods-md-box,
  .goods-sl-box,
  .goods-lg-box {
    position: relative;

    .cart-btn {
      position: absolute;
      bottom: 18rpx;
      right: 20rpx;
      z-index: 11;
      height: 50rpx;
      line-height: 50rpx;
      padding: 0 20rpx;
      border-radius: 25rpx;
      font-size: 24rpx;
      color: #fff;
    }
  }
</style>
