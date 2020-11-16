import React, { FC } from 'react';
import { IndexModelState, ConnectProps, Loading, connect } from 'umi';
import { Button } from 'antd';

interface PageProps extends ConnectProps {
  index: IndexModelState;
  loading: boolean;
}

const Demo: FC<PageProps> = ({ dispatch, index }) => {
  const { count } = index;
  const setCount = () => {
    dispatch({
      type: 'index/save',
      payload: { count: count - 1 },
    });
  };

  return (
    <>
      <Button type="primary" onClick={() => setCount()}>
        子组件减-1
      </Button>
    </>
  );
};

export default connect(
  ({ index, loading }: { index: IndexModelState; loading: Loading }) => ({
    index,
    loading: loading.models.index,
  }),
)(Demo);
