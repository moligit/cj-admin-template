/* eslint-disable no-undef */
import request from '@/utils/request';
import { stringify } from 'qs';
import { IReqRetpass } from './@types';

export default {
  getList(params: object) {
    // @ts-ignore
    return request(`${JOBSAPI}/manage/merchant/user/page?${stringify(params)}`);
  },
  setAmount(params: object) {
    // @ts-ignore
    return request(`${JOBSAPI}/manage/merchant/user/status`, {
      method: 'POST',
      data: params,
    });
  },

  // 重制密码
  resetPass(params: IReqRetpass) {
    const { id } = params;
    // @ts-ignore
    return request(`${JOBSAPI}/manage/merchant/user/password`, {
      method: 'POST',
      data: { userId: id },
    });
  },
};
