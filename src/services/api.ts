/* eslint-disable no-undef */
import { stringify } from 'qs';
import request from '@/utils/request';
import { IReqGetProduct } from './@types/api';

export default {
  // 软文editor 查询选择商品
  getProductApi(data: IReqGetProduct) {
    // @ts-ignore
    return request(`${JOBSAPI}/manage/product/article/sku?${stringify(data)}`);
  },
};
