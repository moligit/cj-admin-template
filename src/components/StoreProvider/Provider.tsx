import React, { useReducer } from 'react';
import StoreContext from './StoreContext';

interface Iparams {
  // children?: React.ReactChildren;
  reducer: (state: any, action: any) => void;
  initialState: any;
}

const StoreProvider: React.FC<Iparams> = ({ children, reducer, initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
 
  return (
    <StoreContext.Provider value={[ state, dispatch ]}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;
