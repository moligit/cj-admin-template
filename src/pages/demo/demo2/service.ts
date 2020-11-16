/* eslint-disable no-undef */
import { stringify } from 'qs';
import request from '@/utils/request';

export default {
  // 软文列表 - 列表
  getListApi(data: any) {
    // @ts-ignore
    return request(`${JOBSAPI}/manage/article/page?${stringify(data)}`);
  },

  // 软文列表 - 详情
  getDetailApi(data: any) {
    // @ts-ignore
    return request(`${JOBSAPI}/manage/article/detail?${stringify(data)}`);
  },

  // 软文列表 - 上下架
  changeStatusApi(data: any) {
    // @ts-ignore
    return request(`${JOBSAPI}/manage/article/update/status`, {
      method: 'post',
      data,
    });
  },

  // 软文列表 - 列表 - 删除
  removeApi(data: any) {
    // @ts-ignore
    return request(`${JOBSAPI}/manage/article/delete`, {
      method: 'post',
      data,
    });
  },

  // 软文列表 - 详情 - 保存/保存草稿箱
  submitApi(data: any) {
    // @ts-ignore
    return request(`${JOBSAPI}/manage/article/add`, {
      method: 'post',
      data,
    });
  },
};
