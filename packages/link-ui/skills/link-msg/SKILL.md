---
name: link-msg
description: link 中的 $msg 服务, 展示一个气泡提示(toast)
metadata:
  author: moushu
---

$msg 类似 $dialog 但是不是展示对话框, 而是在屏幕上方弹出一个气泡(toast)

```js
this.$msg.show('消息',{type:类型,duration:持续时间})
this.$msg.success('成功消息',{duration:持续时间})
this.$msg.error('错误消息',{duration:持续时间})
this.$msg.warn('警告消息',{duration:持续时间})
this.$msg.info('信息消息',{duration:持续时间})
```