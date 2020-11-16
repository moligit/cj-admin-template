import React, { FC } from 'react';
import { IndexModelState, ConnectProps, Loading, connect } from 'umi';
import { useTestModel } from '@/models';
import { Button, Divider } from 'antd';
import Panel from '@/components/Panel';
import Demo from './_components/demo';

interface PageProps extends ConnectProps {
  index: IndexModelState;
  loading: boolean;
}

const App: FC<PageProps> = ({ dispatch, index }) => {
  const { count } = index;
  // console.log('index', index);
  const { name, setNameFn } = useTestModel('testmodel');

  const setCount = () => {
    dispatch({
      type: 'index/save',
      payload: { count: count + 1 },
    });
  };

  return (
    <Panel>
      <>
        <p>
          数量：
          {count}
        </p>
        <p>
          名称：
          {name}
        </p>
        <Button onClick={() => setCount()} style={{ marginRight: '20px' }}>
          加+1
        </Button>
        <Demo />
      </>
    </Panel>
  );
};

export default connect(({ index }: { index: IndexModelState }) => ({
  index,
}))(App);
