/**
 * @description wangEditor使用demo
 * @author zhengwenjian
 */

import { WEditor } from '@/components';
import React, { useState } from 'react';

export default () => {
  const [content, setContent] = useState('<p>test</p>');

  return (
    <WEditor
      value={content}
      onChange={html => {
        console.log('change', html);
        setContent(html);
      }}
      // onBlur={(html) => {
      //   console.log('onBlur', html)
      // }}
      // onFocus={(html) => {
      //   console.log('onFocus', html)
      // }}
      beforeCreate={editor => {
        /**菜单自定义 */
        editor.config.menus = [
          'head',
          'bold',
          'fontSize',
          'fontName',
          'italic',
          'underline',
          'strikeThrough',
          'indent',
          'lineHeight',
          'foreColor',
          'backColor',
          'link',
          'list',
          'justify',
          'quote',
          'emoticon',
          'image',
          'video',
          'table',
          'code',
          'splitLine',
          'undo',
          'redo',
          // 'previewKey'
        ];

        /**全屏配置 - 全屏和其他菜单不同  注意：工具栏和编辑器区域分离的时候不支持全屏功能*/
        editor.config.showFullScreen = false;
      }}
    />
  );
};
