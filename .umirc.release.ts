import { defineConfig } from 'umi';

export default defineConfig({
  // base: '/',

  // ---预演环境
  define: {
    ENV:'release',
    JOBSAPI: 'http://release.jobs2020.cj.com/api',
    MESSAGEAPI: 'http://release.cjmessagecenter.cj.com/chat-center',
  },
});
