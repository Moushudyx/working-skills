# FormOption 

## 概述

FormOption通常与 [link-form](?id=components/form/link-form&app=doc) 结合使用；

也可以不使用 `link-form`，此时在创建一个FormOption的时候，需手动调用FormOption的 init 方法，以执行FormOption的初始化逻辑；

建议先阅读 link-form的文档再来了解 FormOption的概念，link-form文档中讲述了link-form与FormOption之间的关系以及各自的作用。

## 参数

FormOption 构造函数有两个参数，第一个参数是页面上下文对象，用来执行页面的hook函数；第二个参数是一个对象，格式如下所示；

### FormParam

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| operator | string | NEW(新建)、UPDATE(编辑)、READ（只读） | --- | 必填，当前表单的操作模式，不同的操作模式，初始化的逻辑不同，第一次点击保存按钮的处理逻辑也不同 |
| module | string | --- | --- | 模块地址前缀 |
| url.queryByExamplePage | string | --- | --- | 请求接口地址，没有默认会使用 module + /queryByExamplePage 作为请求地址  |
| url.queryById | string | --- | --- | 根据id查询详情地址，如果是由AutoList打开详情页面，并且将页面参数传给了FormOption，则FormOption会根据这个请求地址重新查询记录详情， |
| url.insert | string | --- | --- | 保存新建的地址 |
| url.update | string | --- | --- | 保存编辑的地址 |
| url.deleteById | string | --- | --- | 删除记录地址 |
| data | object | --- | --- | 原始数据，如果是新建操作，这个对象为默认值对象；如果是编辑操作，这个对象为绑定的表单对象，初始化的时候会根据其中的id做一次重新查询； |
| defaultId | boolean | --- | --- | 新建记录的时候是否需要一个默认的id |
| editing | boolean | --- | --- | 默认是否开启编辑状态 |
| autoValidateOnSave | boolean | --- | --- | 是否在点击保存的时候，自动调用表单Form组件的校验方法校验 |
| custom.insert| (config: { url: string, param: any }) => HttpResponse | --- | --- | 自定义保存新建接口请求逻辑 |
| custom.update| (config: { url: string, param: any }) => HttpResponse | --- | --- | 自定义保存编辑接口请求逻辑 |
| hooks | object | --- | --- | 是一个对象，对象格式如下所示 [hooks](#hooks) |

### hooks

**<span>hooks</span>** 是一个对象，对象中每个属性都是函数，类型如下所示：

```typescript
export interface FormRequestConfig {
    url: string
    param: any
}

export interface FormHooks<T> {

    // 查询新建记录默认值
    onBeforeQueryDefaultValue?: (config: FormRequestConfig) => (void | Promise<void>)
    onAfterQueryDefaultValue?: (resp: HttpResponse) => (void | Promise<void>)

    // 查询记录
    onBeforeQueryById?: (config: FormRequestConfig) => (void | Promise<void>)
    onAfterQueryById?: (resp: HttpResponse) => (void | Promise<void>)

    // 保存新建记录
    onBeforeInsert?: (config: FormRequestConfig) => (void | Promise<void>)
    onAfterInsert?: (resp: HttpResponse) => (void | Promise<void>)
    onBeforeSaveNew?: (formData: T) => (void | Promise<void>)
    onAfterSaveNew?: (formData: T) => (void | Promise<void>)

    // 保存更新记录
    onBeforeUpdate?: (config: FormRequestConfig) => (void | Promise<void>)
    onAfterUpdate?: (resp: HttpResponse) => (void | Promise<void>)
    onBeforeSaveUpdate?: (formData: T) => (void | Promise<void>)
    onAfterSaveUpdate?: (formData: T) => (void | Promise<void>)

    // 保存新建或者更新记录
    onBeforeUpsert?: (config: FormRequestConfig) => (void | Promise<void>)
    onAfterUpsert?: (resp: HttpResponse) => (void | Promise<void>)

    // 删除记录
    onBeforeDelete?: (config: FormRequestConfig) => (void | Promise<void>)
    onAfterDelete?: (resp: HttpResponse) => (void | Promise<void>)

    onAfterInitNew?: (newRow: T) => void,       // 新建逻辑初始化完毕之后
    onAfterInitUpdate?: (row: T) => void,       // 详情逻辑初始化完毕之后

    // 发送请求
    onBeforeRequest?: (config: FormRequestConfig) => (void | Promise<void>)
    onAfterRequest?: (resp: HttpResponse) => (void | Promise<void>)

    // 保存编辑（新建、更新）之前(后)
    onBeforeSaveEdit?: (formData: T) => (void | Promise<void>)
    onAfterSaveEdit?: (formData: T) => (void | Promise<void>)

    // 开启编辑状态之前
    onBeforeEnableEdit?: (formData: T) => (void | Promise<void>)
}
```

## FormOption 中的一些可用的状态

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| context | Vue | --- | --- | 页面上下文对象 |  
| option | FormParam | --- | --- | 上面文档说明的，构造参数对象 |  
| formData | object | --- | --- | 表单数据绑定对象 |  
| editing | boolean | --- | false | 当前是否处于编辑状态 |  
| operator | NEW, UPDATE, READ | --- | --- | 表单操作状态，注意的是，FormOption.option.operator 中也有一个操作状态字符串，那个是初始化的时候用的，而这个是一直更新的，比如新建状态下，第一次保存之后这个值就变成了 UPDATE； |  
| url | LinkRequestUrl | --- | --- | 请求地址对象 |  
| hooks | FormHooks | --- | --- | 事件钩子函数 |  
| custom | FormCustomHandler | --- | --- | 自定义处理函数对象 |  
| autoValidateOnSave | boolean | --- | --- | 当前，保存的时候是否自动调用link-form的校验函数 | 

## FormOption 中的一些可用的方法

| 方法名称 | 参数 | 说明 |
| --- | --- | --- |
| init | --- | 执行初始化逻辑，会根据operator判断执行新建或者编辑的初始化逻辑 |
| saveNew | --- | 执行保存新建处理逻辑 |
| saveUpdate | --- | 执行保存编辑处理逻辑 |
| changeEditing | flag:boolean | 修改当前的编辑状态，参数为true表示开启编辑状态，默认不可编辑。不建议直接使用这个函数，请使用下面的enableEdit以及cancelEdit |
| enableEdit | --- | 开启编辑状态，在这个之前，会先将FormOption.formData拷贝一份至FormOption._formData，再调用changeEditing开启编辑状态； |
| cancelEdit | --- | 取消编辑状态，将FormOption.formData 重置为 FormOption._formData |
| saveEdit | --- | 保存当前的formData对象，会根据operator判断当前是执行saveNew还是saveUpdate，并且调用对应的前后钩子函数 |