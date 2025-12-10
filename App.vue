<script setup>
  // 导入生命周期钩子和依赖初始化方法
  import { onLaunch, onShow, onError } from '@dcloudio/uni-app';
  import { ZjfShopInit } from './sheep';

  // 应用启动时触发的事件
  onLaunch(() => {
    // 隐藏原生的导航栏，改用自定义的底部导航栏
    uni.hideTabBar();

    // 初始化 ZjfShop 的底层依赖
    ZjfShopInit();
  });

  // 全局错误捕获
  onError((err) => {
    // 打印错误信息到控制台，便于调试和排查问题
    console.log('AppOnError:', err);
  });

  // 应用显示时触发的事件
  onShow((options) => {
    // #ifdef APP-PLUS
    // 如果是在 App 平台下执行

    // 获取通过 urlSchemes 传递的启动参数
    const args = plus.runtime.arguments;
    if (args) {
      // 如果有传递参数，可以在此处处理逻辑
    }

    // 获取剪贴板内容，适用于处理用户从外部复制的信息
    uni.getClipboardData({
      success: (res) => {
        // 可以在这里处理剪贴板的内容，例如解析数据或执行特定操作
      },
    });
    // #endif

    // #ifdef MP-WEIXIN
    // 如果是在微信小程序平台下执行

    // 处理用户确认收货的回调结果
    console.log(options, 'options');
    // #endif
  });
</script>

<style lang="scss">
  /* 引入全局样式文件，以确保应用具有统一的外观 */
  @import '@/sheep/scss/index.scss';
</style>
