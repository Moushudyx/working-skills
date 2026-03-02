# $msg 气泡提示服务

$msg 类似 $dialog 但是不是展示对话框, 而是在屏幕上方弹出一个气泡(toast)

关于 $dialog(页面中心弹出对话框提示) 的使用请参考 references/link-dialog.md 中的 $dialog 服务

```js
this.$msg.show('消息',{type:类型,duration:持续时间})
this.$msg.success('成功消息',{duration:持续时间})
this.$msg.error('错误消息',{duration:持续时间})
this.$msg.warn('警告消息',{duration:持续时间})
this.$msg.info('信息消息',{duration:持续时间})
```