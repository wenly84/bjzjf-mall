<template>
  <s-goods-item
    :title="goodsData.spuName"
    :img="goodsData.picUrl"
    :price="goodsData.price"
    :skuText="goodsData.introduction"
    priceColor="var(--ui-BG-Main)"
    :titleWidth="400"
  />
</template>

<script setup>
  const props = defineProps({
    goodsData: {
      type: Object,
      default: {},
    },
  });
</script>
