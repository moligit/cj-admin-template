// eslint-disable-next-line no-unused-vars
import React, { FC, useState, useEffect } from 'react';
// import renderer from 'react-test-renderer';
import { Button } from 'antd';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import Demohooks from '../../../../src/pages/demo/demo1';
import api from '../../../../src/pages/demo/demo1/_service';

jest.mock('../../../../src/pages/demo/demo1/_service');

console.log('api', api);
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

// const listData = {
//   code: 0,
//   data: {
//     content: [
//       {
//         accountNo: '121330',
//         name: '姓名1',
//         fullName: '姓名1全名',
//         createAtTimestamp: 0,
//         email: '1367075199979282432',
//       },
//     ],
//     pageNumber: 1,
//     pageSize: 10,
//     totalPages: 1,
//     totalRecords: 2,
//   },
//   message: '',
//   success: true,
// };
// const getList = jest.fn(() => Promise.resolve({ data: '123' }));
// api.getList.mockResolvedValue();
// console.log('api.getList', api.getList({}));
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
    // expect(api.getList({})).toBe('123');
  });
});
