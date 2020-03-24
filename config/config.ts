import { IConfig } from 'umi-types';
import pageRoutes from './router.config';
const path = require('path');

const root = path.resolve(__dirname, '../');
const src = path.resolve(root, 'src');
const ss = path.resolve(src, 'lib/single-spa/single-spa');

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  routes: pageRoutes,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      title: 'umi-dva-antd-mobile',
      dll: true,
      hd: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  history: 'hash', // 默认是 browser
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  outputPath: './dist',
  alias: {
    'single-spa': ss
  },
  hash: true,
  manifest: {
    basePath: '/',
  },
  extraBabelPlugins:[
    ['import', { libraryName: 'antd-mobile', style: true }]  //按需加载antd-mobile样式文件
  ],
};

export default config;
