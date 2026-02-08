---
name: link-dialog
description: link 中的对话框组件，弹出一个对话框(或者模态框), 包括link-dialog组件与$dialog服务
metadata:
  author: moushu
---

link-dialog与ElementUI的el-dialog不兼容，避免混用，如果使用了$object服务，那么应该全部使用link-dialog实现

```vue
<link-button label="toggle" @click="show = !show"/>
<link-dialog v-model="show" confirmButton cancelButton>
	弹框内容
</link-dialog>
// 下面是对应的 script 部分
export default {
	data(){
		return{
			show:false,
		}
	},
}
```

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| title | String   | --- | --- | 弹框标题 |
| shape | String   | fillet，none | none | 弹框形状|
| shadowColor | String   | --- | rgba(0,0,0,0.25) | 遮罩颜色 |
| disabledHideOnClickShadow | Boolean  | --- | --- | 是否禁用点击遮罩关闭窗口功能 |
| height | Number   | --- | --- | 对话框内容高度 |
| minHeight | Number   | --- | --- | 对话框内容最小高度 |
| maxHeight | Number   | --- | --- | 对话框内容最大高度 |
| width | Number   | --- | --- | 对话框内容宽度 |
| minWidth | Number   | --- | --- | 对话框内容最小宽度 |
| maxWidth | Number   | --- | --- | 对话框内容最大宽度 |
| full | Boolean  | Number | --- | 对话框是否为最大化 |
| confirmButton | Boolean  | --- | --- | 是否需要确认按钮 |
| cancelButton | Boolean  | --- | --- | 是否需要取消按钮 |
| confirmButtonText | String   | --- | --- | 确认按钮文本 |
| cancelButtonText | String   | --- | --- | 取消按钮文本 |
| noClose | Boolean  | --- | --- | 是否不需要关闭按钮 |
| dialogClass | String   | --- | --- | 弹框绑定的class |
| vertical | String   | start,center,end | center | 弹框纵向位置 |
| horizontal | String   | start,center,end | center | 弹框横向位置 |
| initialized | Boolean  | --- | --- | 是否初始化的时候就初始化弹框内容，即使弹框没有打开 |
| destroyOnHide | Boolean  | --- | --- | 是否在弹框关闭之后销毁内容 |
| transferDom | Boolean  | --- | --- | 弹框的dom节点是否转移到body节点下（有的div元素设置了overflow:hidden，不把弹框移动到body节点话，可能会看不见） |
| max | Boolean  | --- | --- | 是否可最大化 |
| noHeader | Boolean  | --- | --- | 是否去掉弹框头部 |
| noFooter | Boolean  | --- | --- | 是否去掉弹框尾部 |
| noPadding | Boolean  | --- | --- | 是否去掉弹框默认内边距 |
| loading | Boolean  | --- | --- | 弹框是否处于加载状态 |
| footAlign | String   | start,center,end | center | 弹框尾部元素对其方式 |
| zIndex | Number   | --- | --- | 弹框基础zIndex |
| enterToConfirm | Boolean  | --- | --- | 是否回车触发确认按钮动作 |
| spaceToConfirm | Boolean  | --- | --- | 是否空格键触发确认按钮动作 |
| escToCancel | Boolean  | --- | --- | 是否esc触发取消按钮动作 |
| disabledHideOnConfirm | Boolean  | --- | --- | 禁用点击确认按钮之后自动关闭弹框 |
| disabledHideOnCancel | Boolean  | --- | --- | 禁用点击取消按钮之后自动关闭弹框 |
| beforeConfirmHandler | Function | --- | --- | 确认对话框前的钩子函数 |
| beforeCancelHandler | Function | --- | --- | 取消对话框前的钩子函数 |
| drawer | Boolean  | --- | --- | 是否以抽屉形式打开 |
| draggable | Boolean  | --- | --- | 是否可拖拽 |

| 事件名 | 参数 | 说明 |
| --- | --- | --- |
| confirm | --- | 点击确认按钮事件 |
| cancel | --- | 点击取消按钮事件 |
| clickShadow | --- | 点击阴影区域事件 |
| clickContent | --- | 点击弹框内容区域事件 |
| beforeCloseHandler | --- | 弹框或者抽屉关闭前的钩子函数 |

| 插槽名称 | 说明 |
| --- | --- |
| default | 默认插槽，对话框内容|
| foot | 对话框尾部插槽，该插槽会覆盖默认的底部插槽，默认确认按钮以及取消按钮将不可见 |
| footLeft | 底部左侧插槽 |
| footRight | 底部右侧插槽 |
| title | 标题左侧插槽 |
| headCenter | 标题中间插槽 |
| headRight | 标题右侧插槽，关闭按钮左侧 |

## $dialog 服务

弹框展示消息, 如果只是想展示一个 toast 那样的不占据页面中心的气泡提示, 需要使用 `link-msg` 技能中的 `$msg`

```js
this.$dialog.show('消息')
this.$dialog.success('成功消息')
this.$dialog.error('错误消息')
this.$dialog.warn('警告消息')
this.$dialog.info('信息消息')

// 这个比较特殊，如果用户点击了取消，则会返回一个 rejected 的 Promise 在异步函数中可能出现抛错所以需要处理
this.$dialog.promiseTip({
  title: '弹框标题',
  customTip: '弹框内容', // 如果填写了这个那么会覆盖 tip
  tip: '操作类型', // 如果填写了这个会展示“您正在进行【操作类型】操作，是否继续【操作类型】操作？”
})
```
