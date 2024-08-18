import { loadEnv } from 'vite';
import uni from '@dcloudio/vite-plugin-uni';
import path from 'path';
import uniReadPagesV3Plugin from './sheep/router/utils/uni-read-pages-v3';
import mpliveMainfestPlugin from './sheep/libs/mplive-manifest-plugin';


// https://vitejs.dev/config/
export default (command, mode) => {
	const env = loadEnv(mode, __dirname, 'ZJFSHOP_');
	return {
		envPrefix: "ZJFSHOP_",
		plugins: [
			uni(),
			// viteCompression({
			// 	verbose: false
			// }),
			uniReadPagesV3Plugin({
				pagesJsonDir: path.resolve(__dirname, './pages.json'),
				includes: ['path', 'aliasPath', 'name', 'meta'],
			}),
			mpliveMainfestPlugin(env.ZJFSHOP_MPLIVE_ON)
		],
		server: {
			host: true,
			// open: true,
			port: env.ZJFSHOP_DEV_PORT,
			hmr: {
				overlay: true,
			},
		},
	};
};
