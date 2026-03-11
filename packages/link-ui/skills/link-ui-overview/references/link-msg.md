# $msg 气泡提示服务

$msg 类似 $dialog 但是不是展示对话框, 而是在屏幕上方弹出一个气泡(toast)

关于 $dialog(页面中心弹出对话框提示) 的使用请参考 references/link-dialog.md 中的 $dialog 服务

```js
this.$msg.show('消息',{type:类型,duration:持续时间})
this.$msg.success('成功消息',{duration:持续时间})
this.$msg.error('错误消息',{duration:持续时间})
this.$msg.warning('警告消息',{duration:持续时间})
this.$msg.info('信息消息',{duration:持续时间})
```

## 参数

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| -------- | ---- | ------ | ------ | ---- |
| message | String | --- | --- | 显示消息的文本内容 |
| type | String | info/success/warning/error | info | 调用类型 |
| duration | Number | --- | 3000 | 提示打开后关闭时间 |
| vertical | String | start/center/end | start | 显示消息的纵向位置 |
| horizontal | String | start/center/end | center | 显示消息的横向位置 |
| done | Function | --- | null | 显示的消息自动关闭触发的动作 |
| click | Function | --- | null | 显示的消息点击触发动作 |
