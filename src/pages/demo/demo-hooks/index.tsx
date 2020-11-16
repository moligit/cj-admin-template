import React, { useReducer, useContext, useState } from 'react';
import { Button, Divider } from 'antd';
import { StoreProvider, useStore } from '@/components/StoreProvider';
import Panel from '@/components/Panel';
import Demo from './_components/demo';

const App = () => {
  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case 'increase': {
        return state + 1;
      }

      case 'decrease': {
        return state - 1;
      }

      default: {
        return state;
      }
    }
  };

  const initialState = 1;

  return (
    <Panel>
      <StoreProvider reducer={reducer} initialState={initialState}>
        <Toolbar />
        <Divider />
        <DEMO2 />
      </StoreProvider>
    </Panel>
  );
};

const Toolbar = () => (
  <div>
    <Demo />
  </div>
);

const DEMO2 = () => {
  const { state, dispatch } = useStore();

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            type: 'decrease',
          });
        }}
      >
        减-1
      </Button>
      <span>
        子组件2共享状态：
        {state}
      </span>
    </>
  );
};

export default App;
