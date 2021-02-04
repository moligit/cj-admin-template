const sum = require('./sum');

describe('工具函数测试', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });
  test('adds 12 - 5 to equal 7', () => {
    expect((() => 12 - 5)()).toBe(7);
  });
});

describe('异步操作测试', () => {
  function foo(callback) {
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
