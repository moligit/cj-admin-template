test('测试jest.fn()返回固定值', () => {
  const mockFn = jest.fn().mockReturnValue('default');
  // 断言mockFn执行后返回值为default
  expect(mockFn()).toBe('default');
});
