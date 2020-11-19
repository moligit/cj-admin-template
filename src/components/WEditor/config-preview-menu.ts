/**
 * @description 配置预览
 * @author zhengwenjian
 */

import E from 'wangeditor';

const { $, BtnMenu } = E;

// 第一，菜单 class ，Button 菜单继承 BtnMenu class
class PreviewMenu extends BtnMenu {
  constructor(editor: E) {
    const $elem = $(
      `<div class="w-e-menu">
          预览
        </div>`,
    );
    super($elem, editor);
  }
  // 菜单点击事件
  clickHandler() {
    // 做任何你想做的事情
    // 可参考【常用 API】文档，来操作编辑器

    let html = this.editor.txt.html();
    if (!html) html = '';

    if ((window as any).previewWindow) {
      (window as any).previewWindow.close();
    }

    (window as any).previewWindow = window.open();
    (window as any).previewWindow.document.write(buildPreviewHtml(html));
    (window as any).previewWindow.document.close();
  }
  // 菜单是否被激活（如果不需要，这个函数可以空着）
  // 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
  // 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive 函数，重新计算菜单的激活状态
  tryChangeActive() {
    // 激活菜单
    // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
    // 2. this.this.isActive === true
    // this.active()
    // // 取消激活菜单
    // // 1. 菜单 DOM 节点会删掉 .w-e-active
    // // 2. this.this.isActive === false
    // this.unActive()
  }
}

const buildPreviewHtml = (html: string) => `
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
          <div class="container">${html}</div>
        </body>
      </html>
    `;

export default (editor: E) => {
  // 注册菜单
  const menuKey = 'previewKey'; // 菜单 key ，各个菜单不能重复
  editor.menus.extend('previewKey', PreviewMenu);

  // 将菜单加入到 editor.config.menus 中
  // 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
  editor.config.menus = editor.config.menus.concat(menuKey);
};
