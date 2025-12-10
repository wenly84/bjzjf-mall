import $url from '@/sheep/url';
import $router from '@/sheep/router';
import $platform from '@/sheep/platform';
import $helper from '@/sheep/helper';
import zIndex from '@/sheep/config/zIndex.js';
import $store from '@/sheep/store';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import duration from 'dayjs/plugin/duration';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
dayjs.extend(relativeTime);
dayjs.extend(duration);

const sheep = {
  $store,
  $url,
  $router,
  $platform,
  $helper,
  $zIndex: zIndex,
};

// 加载 ZjfShop 底层依赖
export async function ZjfShopInit() {
  try {
    // 应用初始化
    await $store('app').init();

    // 平台初始化加载
    try {
      $platform.load();
    } catch (error) {
      console.error('Platform Load Error:', error);
    }

    // 开发模式
    if (process.env.NODE_ENV === 'development') {
      ZjfShopDebug();
    }
  } catch (error) {
    console.error('ZjfShopInit Error:', error);
  }
}

// 开发模式
function ZjfShopDebug() {
  // 开发环境引入 vconsole 调试
  // #ifdef H5
  import('vconsole').then((vconsole) => {
    new vconsole.default();
  });
  // #endif

  // 打印路由信息（确保 ROUTES 定义）
  if (typeof ROUTES !== 'undefined') {
    //console.log('路由列表:', ROUTES);
  } else {
    console.warn('ROUTES is not defined');
  }
}

export default sheep;
