import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from '../../src/hooks/useCounter';

test('hook测试-useCounter', () => {
  const { result } = renderHook(() => useCounter());

  act(() => {
    result.current.increment();
  });

  expect(result.current.count).toBe(1);
});
