/**
 * @description wangEditor的封装及demo示例  官网文档：http://www.wangeditor.com/doc/pages/01-%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8/01-%E5%9F%BA%E6%9C%AC%E4%BD%BF%E7%94%A8.html
 * @author zhengwenjian
 */

import React, { FC, useEffect } from 'react';
import E from 'wangeditor';

// 配置
import configPreviewMenu from './config-preview-menu';
import configUploadImg from './config-upload-img';

// types
import { IWEditor } from './type';

const WEditor: FC<IWEditor> = ({
  id,
  value,
  onChange,
  onBlur,
  onFocus,
  beforeCreate,
}) => {
  let editor: E;

  /**创建编辑器 */
  useEffect(() => {
    /**新建编辑器对象 */
    editor = new E(`#${id}`);

    /**内置onchange */
    editor.config.onchange = (html: string) => {
      onChange && onChange(html);
    };
    /**内置onblur */
    editor.config.onblur = (html: string) => {
      onBlur && onBlur(html);
    };
    /**内置onfocus */
    editor.config.onfocus = (html: string) => {
      onFocus && onFocus(html);
    };

    /**内置默认上传图片到CJ OSS -- 暂时没有实现接口 */
    // configUploadImg(editor)

    /**新增预览菜单 */
    configPreviewMenu(editor);

    /**上传前运行 - 用户配置 */
    beforeCreate && beforeCreate(editor);

    /**配置后才能进行创建 */
    editor.create();
  }, []);

  /**监听值变化 */
  useEffect(() => {
    editor && editor.txt.html(value);
  }, [value]);

  return <div id={id}></div>;
};

WEditor.defaultProps = {
  id: 'wangEditor',
  value: '',
  onChange: html => {},
  onBlur: html => {},
  onFocus: html => {},
  beforeCreate: editor => {},
};

export default WEditor;
