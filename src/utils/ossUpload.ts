/* eslint-disable no-undef */
// 阿里云 oss 文件上传
import request from '@/utils/request';
import { message } from 'antd';

interface IUpload {
  files: any;
}

const ossUploadFile = async ({ files }: IUpload): Promise<any> => {
  if (!files) return message.warning('请选择上传文件');
  const formData = new FormData();
  formData.append('uploadFiles', files);
  // @ts-ignore
  const { data } = await request(`${JOBSAPI}/oss/uploadFiles`, {
    method: 'POST',
    data: formData,
  });
  return Array.isArray(files) ? data : data[0];
};

// eslint-disable-next-line import/prefer-default-export
export { ossUploadFile };
