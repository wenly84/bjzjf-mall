import DiyApi from '@/sheep/api/promotion/diy';
import { defineStore } from 'pinia';
import $platform from '@/sheep/platform';
import $router from '@/sheep/router';
import user from './user';
import sys from './sys';

const app = defineStore({
  id: 'app',
  state: () => ({
    info: {
      // 应用信息
      name: '手心云商',
      logo: 'https://www.hansi.site/static/image/mall/logo.png',
      version: '1.3.1',
      copyright: '手心云商',
      copytime: 'Copyright© 2024-2028',
      url: 'https://www.hansi.site',
      cdnurl: 'https://www.hansi.site', // 云存储域名
      filesystem: 'https://www.hansi.site', // 云存储平台
    },
    platform: {
      share: {
        methods: [], // 支持的分享方式
        forwardInfo: {}, // 默认转发信息
        posterInfo: {}, // 海报信息
        linkAddress: '', // 复制链接地址
      },
      bind_mobile: 0, // 登陆后绑定手机号提醒 (弱提醒，可手动关闭)
    },
    template: {
      // 店铺装修模板
      basic: {}, // 基本信息
      home: {
        // 首页模板
        style: {},
        data: [],
      },
      user: {
        // 个人中心模板
        style: {},
        data: [],
      },
    },
    shareInfo: {}, // 全局分享信息
    has_wechat_trade_managed: 0, // 小程序发货信息管理  0 没有 || 1 有
  }),
  actions: {
    // 获取ZjfShop应用配置和模板
    async init(templateId = null) {
      // 检查网络
      if (!(await $platform.checkNetwork())) {
        $router.error('NetworkError', '当前网络不可用，请检查后重试');
        return;
      }
      try {
        await adaptTemplate(this.template, templateId);
        return true;
      } catch (error) {
        console.error('Init Error:', error);
        $router.error('InitError', error.message || '加载失败');
      }

      // 智匠坊科技,未来支持管理后台可配
      if (true) {
        this.info = {
          name: '手心云商',
          logo: 'https://www.hansi.site/static/image/mall/logo.png',
          version: '1.3.1',
          copyright: '手心云商',
          copytime: 'Copyright© 2024-2028',
          url: 'https://www.hansi.site',
          cdnurl: 'https://www.hansi.site', // 云存储域名
          //filesystem: 'minio', // 云存储平台
          filesystem: 'qiniu', // 云存储平台
        };
        this.platform = {
          share: {
            methods: ['poster', 'link'],
            linkAddress: 'http://127.0.0.1:3000',
            posterInfo: {
              user_bg: '/static/image/mall/user-poster-bg.png',
              goods_bg: '/static/image/mall/goods-poster-bg.png',
              groupon_bg: '/static/image/mall/groupon-poster-bg.png',
            },
          },
          bind_mobile: 0,
        };
        this.has_wechat_trade_managed = 0;

        // 加载主题
        const sysStore = sys();
        sysStore.setTheme();

        // 模拟用户登录
        //const userStore = user();
        //if (userStore.isLogin) {
        //userStore.loginAfter();
        //}
        return Promise.resolve(true);
      } else {
        $router.error('InitError', res.msg || '加载失败');
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app-store',
      },
    ],
  },
});

const adaptTemplate = async (appTemplate, templateId) => {
  const { data: diyTemplate } = templateId
    ? await DiyApi.getDiyTemplate(templateId)
    : await DiyApi.getUsedDiyTemplate();
  // 模板不存在
  if (!diyTemplate) {
    $router.error('TemplateError');
    return;
  }
  const tabBar = diyTemplate?.property?.tabBar;
  if (tabBar) {
    appTemplate.basic.tabbar = tabBar;
    if (tabBar?.theme) {
      appTemplate.basic.theme = tabBar?.theme;
	  const sysStore = sys();
	  sysStore.setTheme(tabBar?.theme);
	  //sysStore.setMode("light");
    }
  }
  appTemplate.home = diyTemplate?.home;
  appTemplate.user = diyTemplate?.user;
};

export default app;
