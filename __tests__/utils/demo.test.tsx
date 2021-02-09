// import React from 'react';
// import renderer from 'react-test-renderer';
import { unique } from '../../src/utils/utils';
// import Demohooks from '../../src/components/Panel';

const sum = (a: number, b: number) => a + b;

const mockData1 = [
  { id: 2, message: 'qqwwe' },
  { id: 2, message: 'qqwwe' },
  { id: 3, message: 'qqwwe3' },
];
const mockData1Ep = [
  { id: 2, message: 'qqwwe' },
  // { id: 2, message: 'qqwwe' },
  { id: 3, message: 'qqwwe3' },
];

describe('工具函数测试', () => {
  test('函数->求和', () => {
    expect(sum(1, 2)).toBe(3);
  });
  test('函数->对象数组去重', () => {
    expect(unique([12, 12, 4, 6])).toEqual([12, 4, 6]);
    expect(unique(mockData1, 'id')).toEqual(mockData1Ep);
  });
});

describe('异步操作测试', () => {
  function foo(callback: any) {
    console.log('foo...');
    setTimeout(() => {
      callback && callback();
    }, 1000);
  }
  test('异步测试', done => {
    function bar() {
      console.log('bar..');
      done();
    }
    foo(bar);
  });
});

// const Dedecp = () => <p>dede</p>;

// describe('UI快照', () => {
//   test('renders correctly', () => {
//     const tree = renderer
//       .create(
//         <Demohooks>
//           <Dedecp />
//         </Demohooks>,
//       )
//       .toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

// describe('组件测试', () => {});

describe('mock函数测试', () => {
  test('测试jest.fn()返回固定值', () => {
    const mockFn = jest.fn().mockReturnValue('default');
    // 断言mockFn执行后返回值为default
    expect(mockFn()).toBe('default');
  });

  test('测试jest.fn()内部实现', () => {
    const mockFn = jest.fn((num1, num2) => num1 * num2);
    // 断言mockFn执行后返回100
    expect(mockFn(10, 10)).toBe(100);
  });

  test('测试jest.fn()返回Promise', async () => {
    const mockFn = jest.fn().mockResolvedValue('default');
    const result = await mockFn();
    // 断言mockFn通过await关键字执行后返回值为default
    expect(result).toBe('default');
    // 断言mockFn调用后返回的是Promise对象
    expect(Object.prototype.toString.call(mockFn())).toBe('[object Promise]');
  });
});
