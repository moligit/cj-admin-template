import { unique } from '../src/utils/utils';

const sum = (a: number, b: number) => a + b;

const mockData1 = [
  { id: 2, message: 'qqwwe' },
  { id: 2, message: 'qqwwe' },
  { id: 3, message: 'qqwwe3' },
];
const mockData1Ep = [
  { id: 2, message: 'qqwwe' },
  { id: 2, message: 'qqwwe' },
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
  it('异步测试', done => {
    function bar() {
      console.log('bar..');
      done();
    }
    foo(bar);
  });
});

describe('组件测试', () => {});
