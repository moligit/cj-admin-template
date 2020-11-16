import React, { FC, useEffect, useState } from 'react';
import { Editor, Panel } from '@/components';
import { history, useParams } from 'umi';
import { Button, Form, Input, message, Spin, Upload } from 'antd';
import { useRequest } from 'ahooks';
import { ossUploadFile } from '@/utils/ossUpload';
import { fileSizeWH, getImgId } from '@/utils/utils';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// @ts-ignore
import ImgCrop from 'antd-img-crop';
import styles from '../index.less';
import Api from '../service';

const { TextArea } = Input;

const SoftTextSet: FC = () => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [bgImgUrl, setBgImgUrl] = useState<string>();
  const [bgUploading, setBgUploading] = useState<boolean>();
  const [coverImgUrl, setCoverImgUrl] = useState<string>();
  const [coverUploading, setCoverUploading] = useState<boolean>();

  // 详情获取
  const { run: getDetail, loading } = useRequest(Api.getDetailApi, {
    onSuccess: ({ data = {}, success, message: msg }) => {
      if (success) {
        const { backgroundImage, coverImage } = data;
        form.setFieldsValue({ ...data });
        setBgImgUrl(backgroundImage);
        setCoverImgUrl(coverImage);
      } else {
        message.error(msg);
      }
    },
  });

  // 保存/保存草稿箱
  const { run: submit } = useRequest(Api.submitApi, {
    onSuccess: ({ success, message: msg }) => {
      if (success) {
        message.success('保存成功');
        history.push({
          pathname: '/demo2/softTextList',
        });
      } else {
        message.error(msg);
      }
    },
  });

  // 取消
  const handleCancel = () => {
    history.push({
      pathname: '/demo2/softTextList',
    });
  };

  // 保存到草稿箱/立即发布
  const handleSubmit = async (isStock: number) => {
    try {
      const values = await form.validateFields();
      const params = {
        isStock,
        id: id !== 'add' ? id : undefined,
        title: values.title,
        content: values.content.toHTML(),
        description: values.description,
        keyWords: values.keyWords,
        backgroundImage: bgImgUrl,
        coverImage: coverImgUrl,
        productIds: getImgId(values.content.toHTML()),
      };
      submit(params);
    } catch (e) {
      console.log('Failed:', e);
    }
  };

  // 上传之前
  const beforeUpload = (file: any) => {
    console.log(file);
    // const fileObj = new File([file], file.name, { type: file.name });
    const isSize3M = file.size / 1024 / 1024 > 3;
    if (isSize3M) {
      message.warning('请上传大小不超过3M的图片');
    }
    return !isSize3M;
  };

  // 上传
  const handleChange = async (info: any, t: string) => {
    if (info.file.status === 'uploading') {
      t === 'cover' ? setCoverUploading(true) : setBgUploading(true);
      return;
    }
    if (info.file.status === 'done') {
      const fileObj = new File([info.file.originFileObj], info.file.name, { type: info.file.name });
      const links = await ossUploadFile({ files: fileObj });
      t === 'cover' ? setCoverUploading(true) : setBgUploading(false);
      t === 'cover' ? setCoverImgUrl(links) : setBgImgUrl(links);
    }
  };

  useEffect(() => {
    id !== 'add' && getDetail({ id });
  }, [id]);

  return (
    <Panel title="软文编辑">
      <Spin spinning={ loading }>
        <div className={ styles.wrapper }>
          <Form form={ form } scrollToFirstError>
            <Form.Item
              label="标题"
              labelCol={ { span: 3 } }
              name="title"
              rules={ [
                {
                  required: true,
                  message: '请输入标题',
                },
              ] }
            >
              <Input type="text" maxLength={ 100 } placeholder="请输入推文标题" />
            </Form.Item>
            <Form.Item
              label="内容"
              labelCol={ { span: 3 } }
              name="content"
              rules={ [
                {
                  required: true,
                  validateTrigger: 'onBlur',
                  validator: (_, value) => {
                    if (value && !value.isEmpty()) return Promise.resolve();
                    return Promise.reject(new Error('请编辑内容'));
                  },
                },
              ] }
            >
              <Editor />
            </Form.Item>
            <Form.Item
              label="上传封面图、背景图"
              name="uploadImg"
              labelCol={ { span: 3 } }
              rules={ [
                {
                  required: true,
                  validator: () => {
                    if (coverImgUrl && bgImgUrl) return Promise.resolve();
                    return Promise.reject(new Error('请上传封面图、背景图'));
                  },
                },
              ] }
            >
              <div className="upload-box">
                <ImgCrop rotate aspect={ 690 / 440 }>
                  <Upload
                    method="get"
                    className="upload-item"
                    accept="image/*"
                    listType="picture-card"
                    showUploadList={ false }
                    beforeUpload={ (file: any) => beforeUpload(file) }
                    onChange={ (file: any) => handleChange(file, 'cover') }
                  >
                    { coverImgUrl ? <img src={ coverImgUrl } alt="封面图" /> : (
                      <div>
                        { coverUploading ? <LoadingOutlined /> : <PlusOutlined /> }
                        <p className="ant-upload-text">点击上传封面图(推文列表和推文预览)</p>
                        <p className="ant-upload-text">建议上传像素大小690*440的图片</p>
                      </div>
                    ) }
                  </Upload>
                </ImgCrop>
                <ImgCrop rotate aspect={ 750 / 1624 }>
                  <Upload
                    method="get"
                    className="upload-item"
                    accept="image/*"
                    listType="picture-card"
                    showUploadList={ false }
                    beforeUpload={ (file: any) => beforeUpload(file) }
                    onChange={ (file: any) => handleChange(file, 'bg') }
                  >
                    { bgImgUrl ? <img src={ bgImgUrl } alt="背景图" /> : (
                      <div>
                        { bgUploading ? <LoadingOutlined /> : <PlusOutlined /> }
                        <p className="ant-upload-text">点击上传背景图(推文详情页面)</p>
                        <p className="ant-upload-text">建议上传像素大小750*1624的图片</p>
                      </div>
                    ) }
                  </Upload>
                </ImgCrop>
              </div>
            </Form.Item>
            <Form.Item
              label="关键词"
              labelCol={ { span: 3 } }
              name="keyWords"
              rules={ [{ required: true, message: '请输入关键词,英文逗号分割' }] }
            >
              <Input placeholder="请输入关键词，英文逗号分割。用于seo优化，网页文章描述" />
            </Form.Item>
            <Form.Item
              label="描述优化"
              labelCol={ { span: 3 } }
              name="description"
            >
              <TextArea rows={ 4 } placeholder="用于seo优化，网页文章描述" />
            </Form.Item>
          </Form>
          <div className="btn-box">
            <Button onClick={ handleCancel }>取消</Button>
            <Button type="primary" onClick={ () => handleSubmit(0) }>保存到草稿箱</Button>
            <Button type="primary" onClick={ () => handleSubmit(1) }>立即发布</Button>
          </div>
        </div>
      </Spin>
    </Panel>
  );
};

export default SoftTextSet;
