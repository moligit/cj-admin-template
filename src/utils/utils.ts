// @ts-ignore
import { all, create } from 'mathjs';

const config = {
  epsilon: 1e-12,
  matrix: 'Matrix',
  number: 'BigNumber',
  precision: 64,
  predictable: false,
  randomSeed: null,
};
const math = create(all);

/**
 * 对象数组去重
 * @param {string} str 文件流输入
 * @param {number} length 输入长度
 * @returns {string} 输出
 */
export function formatNumber(str = '', length: number): string {
  // eslint-disable-next-line no-underscore-dangle
  let _val = str
    .toString()
    .replace(/[^\d+.]/, '') // 限制输入数字和 .
    .replace(/^\./, '') // 不允许 . 开头
    .replace(/\./, '#') // 暂存第一次出现的小数点
    .replace(/\./g, '') // 干掉所有小数点
    .replace('#', '.'); // 还原第一个暂存的小数点

  const [str1 = '', str2 = ''] = _val.split('.');

  if (length && str2 && str2.length > length) {
    _val = `${str1}.${str2.substr(0, length)}`;
  }

  if (length === 0) {
    _val = str1;
  }

  return _val;
}

/**
 * 对象数组去重
 * @param {Array} arr 输入
 * @param {String} filed 根据某个字段去重
 * @returns {Array} 输出
 */
export function unique(arr: any = [], filed?: string): any[] {
  const res = new Map();
  return filed
    ? arr.filter(
        (a: { [x: string]: any }) => !res.has(a[filed]) && res.set(a[filed], 1),
      )
    : [...new Set(arr)];
}

/**
 * 导出文件
 * @param {Object} file 输入
 * */
export function exportFileFn(file: any) {
  const blob = new Blob([file]);
  const newDate = new Date().getTime();
  const fileName = `${newDate}.xls`;
  const link = document.createElement('a');
  link.download = fileName;
  link.style.display = 'none';
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  URL.revokeObjectURL(link.href);
  document.body.removeChild(link);
}

/**
 * 获取上传图片宽高
 * @param {Object} files 输入
 * */
export function fileSizeWH(files: any) {
  return new Promise(resolve => {
    if (files && files[0]) {
      if (
        files[0].type === 'image/jpeg' ||
        files[0].type === 'image/gif' ||
        files[0].type === 'image/png'
      ) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (ev: any) => {
          const img: any = new Image();
          img.src = ev.target.result;
          img.onload = () => {
            resolve({
              size: files[0].size / 1024 / 1024,
              width: img.width,
              height: img.height,
            });
          };
        };
      } else {
        console.log(`文件类型不对${files[0].type}`);
      }
    } else {
      console.log('没有上传，使用默认');
    }
  });
}

/**
 * 计算解决精度问题
 */
export const mathNum = {
  // 加
  add: (arg1: string | number, arg2: string | number): number =>
    Number(math.format(math.add(arg1, arg2), 14)),
  // 减
  subtract: (arg1: string | number, arg2: string | number): number =>
    Number(math.format(math.subtract(arg1, arg2), 14)),
  // 乘
  multiply: (arg1: string | number, arg2 = 100): number =>
    Number(math.format(math.multiply(arg1, arg2), 14)),
  // 除
  divide: (arg1: string | number, arg2 = 100): number =>
    Number(math.format(math.divide(arg1, arg2), 14)),
};

/**
 * 获取推文编辑添加商品的id
 * */
export function getImgId(str: string): any {
  if (!str) return;
  // eslint-disable-next-line no-useless-escape
  const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  const imgReg = /<img.*?(?:>|\/>)/gi;
  const idReg = new RegExp('(^|&)id=([^&]*)(&|$)');
  const arr: any = str.match(imgReg) || [];
  return arr
    .map((item: any) => {
      const r = item.match(srcReg)[1].split('?')[1];
      if (r) return unescape(r.match(idReg)[2]);
      return null;
    })
    .filter((id: any) => id);
}

/**
 * 运费改变计算jobs商品零售价
 * */
export const calcPrice = (record: any) => {
  const retailPrice = mathNum.add(record.cjRetailPrice, record.freight); // 新jobs成本价
  const commission = mathNum.subtract(record.amount, record.retailPrice); // 当前佣金
  const rate = mathNum.divide(commission, record.retailPrice).toFixed(2); // 当前佣金比例
  const newCommission = mathNum.multiply(retailPrice, Number(rate)); // 新的佣金
  const amount = mathNum.add(retailPrice, newCommission).toFixed(2); // 新的jobs建议零售价
  return { ...record, retailPrice, amount };
};
