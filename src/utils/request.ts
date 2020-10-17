import { extend } from 'umi-request';
import { history } from 'umi';
import cache from '@/utils/cache';
import { message } from 'antd';

interface error {
  name: string;
  data: any;
  type: string;
  response: {
    status: number;
    statusText: string;
    url: string;
  };
}

/**
 * 异常处理程序
 */
const errorHandler = (error: error) => {
  const { response } = error;
  if (response) {
    const errortext = response.statusText || '';
    const { status } = response;
    message.error(`requestError ${status}: ${errortext}`);
  } else {
    // 请求初始化时出错或者没有响应返回的异常
    message.error(`requestInitError: ${error}`);
  }
  return undefined;
};

const request = extend({
  // prefix: '/jobsApi',
  timeout: 15000,
  errorHandler,
  headers: {
    'Content-Type': 'application/json;',
  },
});

interface IToken {
  [key: string]: string;
}

const erptoken = localStorage.getItem('erptoken');

const authorization = () => {
  const TOKEN: IToken = {
    local: '01451f2a0e3-24de-47f6-a387-122aa3267bb0',
    test: '01451f2a0e3-24de-47f6-a387-122aa3267bb0',
    release: '01451f2a0e3-24de-47f6-a387-122aa3267bb0',
    prod: erptoken ? '01451f2a0e3-24de-47f6-a387-122aa3267bb0' : '',
  };

  return TOKEN[ENV];
};

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url: string, options: any) => {
  // 增加统一header头
  const headers = {
    language: 'zh',
    Authorization: authorization(),
    cjtoken: erptoken,
  };
  return {
    // url: `${url}&interceptors=yes`,
    options: { ...options, headers },
  };
});

// response拦截器, 处理response
request.interceptors.response.use(async (response, options) => {
  const { responseType } = options;
  if (responseType === 'blob') {
    return response.blob();
  }
  const data = await response.clone().json();
  if (data && data.code === 300000) {
    // token 失效，跳转到登录页
    // message.error('登录状态已失效请重新登录', 0, () => {
    //   cache(); // 清楚本地缓存的相关登陆信息
    //   history.push('/login.html');
    // });
    setTimeout(() => {
      cache(); // 清楚本地缓存的相关登陆信息
      history.push('/login.html');
    }, 1000);
  }
  return data;
});

export default request;
