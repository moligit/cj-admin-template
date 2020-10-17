import React, { useEffect, useState } from 'react';
// @ts-ignore
import { ContentUtils } from 'braft-utils';
import { fileSizeWH, getImgId } from '@/utils/utils';
import { ossUploadFile } from '@/utils/ossUpload';
import BraftEditor from 'braft-editor';
import SelectProduct from './SelectProduct';
import 'braft-editor/dist/index.css';
import styles from './index.less';

interface IProps {
  value?: any;
  onChange?: (state: any) => void;
}

export default function Index(props: IProps) {
  const { value, onChange } = props;
  const [editorState, setEditorState] = useState(
    BraftEditor.createEditorState(null),
  );

  const handleEditorChange = (state: any) => {
    setEditorState(state);
    onChange && onChange(state);
  };

  const preview = () => {
    if ((window as any).previewWindow) {
      (window as any).previewWindow.close();
    }

    (window as any).previewWindow = window.open();
    (window as any).previewWindow.document.write(buildPreviewHtml());
    (window as any).previewWindow.document.close();
  };

  const buildPreviewHtml = () => `
      <!Doctype html>
      <html>
        <head>
          <title>Preview Content</title>
          <style>
            html,body{
              height: 100%;
              margin: 0;
              padding: 0;
              overflow: auto;
              background-color: #f1f2f3;
            }
            .container{
              box-sizing: border-box;
              width: 1000px;
              max-width: 100%;
              min-height: 100%;
              margin: 0 auto;
              padding: 30px 20px;
              overflow: hidden;
              background-color: #fff;
              border-right: solid 1px #eee;
              border-left: solid 1px #eee;
            }
            .container img,
            .container audio,
            .container video{
              max-width: 100%;
              height: auto;
            }
            .container p{
              white-space: pre-wrap;
              min-height: 1em;
            }
            .container pre{
              padding: 15px;
              background-color: #f1f1f1;
              border-radius: 5px;
            }
            .container blockquote{
              margin: 0;
              padding: 15px;
              background-color: #f1f1f1;
              border-left: 3px solid #d1d1d1;
            }
          </style>
        </head>
        <body>
          <div class="container">${editorState.toHTML()}</div>
        </body>
      </html>
    `;

  const handleAddProduct = (productItem: any) => {
    const mediaNode = [
      {
        type: 'IMAGE',
        url: `${productItem.mainPhotoUrl}?id=${productItem.id}`,
        link: `/product/detail?pid=${productItem.id}&commodityName=${productItem.name}`,
        link_target: '_blank',
      },
    ];
    setEditorState(ContentUtils.insertMedias(editorState, mediaNode));
  };

  const myUploadFn = async (param: any) => {
    const links = await ossUploadFile({ files: param.file });
    param.success({
      url: links,
      meta: {
        id: Date.now(),
        // title: 'xxx',
        // alt: 'xxx',
        loop: true, // 指定音视频是否循环播放
        autoPlay: true, // 指定音视频是否自动播放
        controls: true, // 指定音视频是否显示控制栏
        poster:
          'https://cc-west-usa.oss-accelerate.aliyuncs.com/15282144/1552744644358.jpg', // 指定视频播放器的封面
      },
    });
  };

  const extendControls: any = [
    'separator',
    {
      key: 'my-component',
      type: 'component',
      component: (
        <SelectProduct
          imgIds={getImgId(editorState.toHTML())}
          handleAddProduct={handleAddProduct}
        />
      ),
    },
    // {
    //   key: 'custom-button',
    //   type: 'button',
    //   text: '预览',
    //   onClick: preview,
    // },
  ];
  const media = {
    uploadFn: myUploadFn,
  };

  useEffect(() => {
    value && setEditorState(BraftEditor.createEditorState(value));
  }, [value]);

  return (
    <div className={styles.wrapper}>
      <BraftEditor
        media={media}
        value={editorState}
        extendControls={extendControls}
        onChange={handleEditorChange}
        placeholder="请输入正文内容"
      />
    </div>
  );
}

Index.defaultProps = {
  value: null,
  onChange: () => {},
};
