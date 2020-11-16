import React, { useReducer, useContext } from 'react';
import { useStore } from '@/components/StoreProvider';
import { Button } from 'antd';

function Demo() {
  const { state, dispatch } = useStore();

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            type: 'increase',
          });
        }}
      >
        加+1
      </Button>
      <span>
        子组件共享状态：
        {state}
      </span>
    </>
  );
}

export default Demo;
