/**
 * @description 配置上传图片
 * @author zhengwenjian
 */

import E from 'wangeditor';
import { ossUploadFile } from '@/utils/ossUpload';

export default (editor: E) => {
  editor.config.customUploadImg = async (
    resultFiles: any,
    insertImgFn: any,
  ) => {
    // resultFiles 是 input 中选中的文件列表
    // insertImgFn 是获取图片 url 后，插入到编辑器的方法
    // 上传图片，返回结果，将图片插入到编辑器中
    // insertImgFn(imgUrl)
  };
};
