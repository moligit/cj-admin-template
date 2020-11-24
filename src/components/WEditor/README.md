## 注意事项

使用此编辑器需参考[wangEditor官网文档](http://www.wangeditor.com/doc/)来配合使用

## 版本![wangEditorV4.4.2](https://img.shields.io/badge/wangeditor-V4.4.2-green)

## 使用编辑器

````typescript
<WEditor beforeCreate={editor => {}} />
````

## 上传图片
在beforeCreate中可以定义自定义上传规则
````typescript
editor.config.customUploadImg = async (
    resultFiles: any,
    insertImgFn: any,
  ) => {
    // resultFiles 是 input 中选中的文件列表
    // insertImgFn 是获取图片 url 后，插入到编辑器的方法


    // 上传图片，返回结果，将图片插入到编辑器中
    insertImgFn(imgUrl)
  };
````

## 扩展自定义菜单
新建文件 menuPreview.ts
````typescript
/** menuPreview.ts **/
import E from 'wangEditor'

class menuPreview extends E.BtnMenu {
  constructor(editor){
    const $elem = E.$(`
      <div class="w-e-menu">
        preview
      </div>
    `)
  }

  /** 菜单点击事件 **/
  clickHandler() {
    // 做任何你想做的事情
    alert('preview')
  }

  /** 菜单是否被激活（如果不需要，这个函数可以空着）
    * 1. 激活是什么？光标放在一段加粗、下划线的文本时，菜单栏里的 B 和 U 被激活，如下图
    * 2. 什么时候执行这个函数？每次编辑器区域的选区变化（如鼠标操作、键盘操作等），都会触发各个菜单的 tryChangeActive
    * 函数，重新计算菜单的激活状态 
    **/
    tryChangeActive() {
        // 激活菜单
        // 1. 菜单 DOM 节点会增加一个 .w-e-active 的 css class
        // 2. this.this.isActive === true
        this.active()

        // // 取消激活菜单
        // // 1. 菜单 DOM 节点会删掉 .w-e-active
        // // 2. this.this.isActive === false
        // this.unActive()
    }
}

````

然后在beforeCreate中添加下面代码
````typescript
const menuKey = 'alertMenuKey' // 菜单 key ，各个菜单不能重复
editor.menus.extend('alertMenuKey', AlertMenu)

// 将菜单加入到 editor.config.menus 中
// 也可以通过配置 menus 调整菜单的顺序，参考【配置菜单】部分的文档
editor.config.menus = editor.config.menus.concat(menuKey)
````

## 属性

属性名 | 类型 | 默认值 | 备注
--- | --- | --- | ---
beforeCreate | (editor:Editor) => void | editor => {} | 创建编辑前配置editor.config
id | string | "wangEditor" | 编辑器id
onBlur | (html:string) => void | html => {} | 编辑器失去焦点事件
onFocus | (html:string) => void | html => {} | 编辑器获取焦点事件
onChange | (html:string) => void | html => {} | 编辑器内容改变事件
