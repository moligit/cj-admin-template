/**
 * 清空登陆缓存的数据
 */
export default function clearLoginCache() {
  // -- todo
  localStorage.removeItem('token');
}
