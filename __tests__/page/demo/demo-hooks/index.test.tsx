// eslint-disable-next-line no-unused-vars
import React, { FC, useState, useEffect } from 'react';
// import renderer from 'react-test-renderer';
import { Button } from 'antd';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Demohooks from '../../../../src/pages/demo/demo1';
import api from '../../../../src/pages/demo/demo1/_service';

interface IDedecpProps {
  datetime: number;
}

// eslint-disable-next-line no-unused-vars
const Dedecp: FC<IDedecpProps> = ({ datetime }) => {
  const [state, setstate] = useState(0);
  useEffect(() => {
    setstate(2);
    return () => {
      setstate(0);
    };
  }, []);
  return (
    <p>
      <span>{datetime}</span>
      dede
      <span>{state}</span>
      <Button>submit</Button>
    </p>
  );
};

// eslint-disable-next-line no-unused-vars
const handleSearch = (v: any) => {
  // const { name } = v;
  // setPageInfo({ ...pageInfo, pageNumber: 1, pageSize: 10, name });
};

api.getList = jest.fn(() => Promise.resolve([{ accountNo: 123456 }]));

describe('UI快照-demo页面', () => {
  test('renders correctly', () => {
    // const tree = renderer
    //   .create(
    //     <Dedecp datetime={2} />,
    //     // <Demohooks handleSearch={handleSearch} />,
    //   )
    //   .toJSON();
    const wrapper = render(<Demohooks />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
