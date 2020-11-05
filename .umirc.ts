import { defineConfig } from 'umi';
import routes from './config/routes';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  layout: {
    name: 'Jobs Admin', 
    locale: false,
  },
  routes,
  base: '/erpmicro/jobs',
  outputPath: 'dist',
  hash: true,
  publicPath: isDev ? '/' : './',
  // proxy: {
  //   '/jobsApi': {
  //     target: 'http://master.jobs2020.cj.com/api/',
  //     // target: 'http://192.168.4.157:7087/api/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/jobsApi': '' },
  //   },
  //   '/message': {
  //     target: 'http://master.cjmessagecenter.cj.com/chat-center/',
  //     changeOrigin: true,
  //     pathRewrite: { '^/message': '' },
  //   },
  // },
  dva: {
    immer: true,
    hmr: false,
  },

  // 子应用配置开启
  qiankun: {
    slave: {},
  },

  // 项目中所需常量配置--可用来放不同环境的api地址--生成环境
  define: {
    ENV: 'prod',
    JOBSAPI: 'http://master.jobs2020.cj.com/api',
  },

  // 主题less变量配置
  theme: {
    '@primary-color': '#4400FA',
  },
});
