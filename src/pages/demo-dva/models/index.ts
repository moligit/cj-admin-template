import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';

export interface IndexModelState {
  count: number;
}

export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  // subscriptions: { setup: Subscription };
}

const IndexModel: IndexModelType = {
  namespace: 'index',
  state: {
    count: 0,
  },
  effects: {
    * query({ payload }, { put }) {
      // const data = yield call(getAccountAmount, payload);
      // const { success, result } = data
      // if (success) {
      yield put({
        type: 'save',
        payload: {
          state: payload,
        },
      });
      // }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname }) => {
  //       if (pathname === '/') {
  //         dispatch({
  //           type: 'query',
  //         })
  //       }
  //     });
  //   }
  // }
};
export default IndexModel;
