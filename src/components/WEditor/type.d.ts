import Editor from 'wangeditor';

/**
 * 编辑器声明
 */
export interface IWEditor {
  /**编辑器id */
  id?: string;
  /**绑定的值 */
  value?: string;
  /**值改变时触发 */
  onChange?: (html: string) => void;
  /**失去焦点时触发 */
  onBlur?: (html: string) => void;
  /**获取焦点时触发 */
  onFocus?: (html: string) => void;
  /**编辑器创建前运行 */
  beforeCreate?: (editor: Editor) => void;
}
