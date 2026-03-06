globalPublicMixin 位置 `src\modules\common\js\mixin.js`, 一般建议任何页面都添加这个 mixin

## publicHandler

`async publicHandler(url, params, tip = '', successAble = true, formatFormParam = false)`

封装了 `this.$http.post` 调用, 其核心是 `this.$http.post(url, params, formatFormParam)` 这个调用, 其他参数主要是为了方便调用时的提示和一些特殊参数的处理

- tip: 操作名称, 成功时提示 `【{tip}】操作成功！`, 失败时提示 `【{tip}】操作出错: {错误信息或后端回传的错误信息}`，如果不传则没有提示
- successAble: 是否提示成功信息, 默认为 true, 如果不需要提示成功信息可以传 false

## returnBack

`async returnBack(type = 'back')`

调用 `this.$nav.back()` 同时触发 `this.$nav.$emit('returnBack', 'return')` 事件, 这个事件一般用于列表-详情结构的页面, 从详情页返回列表页时, 刷新列表数据

至于这个 type, 因为一些历史遗留问题留着, 别传

## operateTip

`async operateTip({title = '确定提示', tip, customTip = ''})`

用于在一些操作前给用户一个提示, 例如删除操作前提示用户是否确认删除, 这个函数会返回一个 Promise 对象, 用户点击确认时 resolve, 点击取消时 reject

- title: 提示框标题, 默认为 '确定提示'
- tip: 提示信息, 提示信息是 `您正在进行【{tip}】操作，是否继续【{tip}】操作？`
- customTip: 自定义提示信息, 如果传了这个参数, 提示信息会显示为 customTip

## initFormOption

`initFormOption()`

列表-详情结构的页面, 详情页的表单初始化操作, 需要将详情页的表单对应的 option 命名为 formOption

正确使用这个方法需要设置正确的列表跳转详情页参数, 见 references/page-list.md 文档

一般使用方式是塞进详情页的 mounted 钩子里, 见 references/page-detail.md 文档
