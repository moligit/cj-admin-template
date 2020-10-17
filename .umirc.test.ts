import { defineConfig } from 'umi';

export default defineConfig({
  // base: '/',

  // ---- 测试环境
  define: {
    ENV:'test',
    JOBSAPI: 'http://master.jobs2020.cj.com/api',
    MESSAGEAPI: 'http://master.cjmessagecenter.cj.com/chat-center',
  },
});
