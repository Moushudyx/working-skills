# link-form

## 概述

- link-form 为表单容器组件，通常与 FormOption 
结合使用，当然，如果你在用link-form的时候，不使用 FormOption 也是可以的；
- link-form 作为组件，负责渲染内容，控制form-item的只读、禁用。对绑定的表单对象进行监听，当监听到值变化的时候，触发表单校验功能；
- FormOption通常用来执行一些逻辑，比如初始化逻辑，是应该查询 queryById接口重新查询记录，还是应该查询 preDefaultValue 接口得到新的
对象作为新建值。当保存新建、或者保存编辑之后，通知AutoList更新list数据中的数据，同时FormOption中还有复杂的状态管理；

> link-form 与 FormOption 的关系与 link-auto-list 和 AutoList 的关系不一样，link-auto-list 和 AutoList绑定的，谁也离不开谁；
> link-form 与 FormOption 的关系则要稍微缓和一点，当有需要的时候，才放在一起使用；
> 如果详情页面比较简单，那么推荐使用FormOption 来管理，因为FormOption会作为一个桥梁的作用链接AutoList，将详情上所做的保存更改通知AutoList进行更新；如果你不使用FormOption，并且对列表的数据实时状态有严格的要求，那么你得在你自己的详情页面里面执行完保存新建以及保存更新逻辑之后，调用页面的listHook中的函数，通知AutoList更新；

## 属性

| 属性名称 | 类型 | 可选值 | 默认值 | 说明 |
| --- | --- | --- | --- | --- |
| option | FormOption | --- | --- | FormOption表单配置对象  |
| hideEditButton | boolean | --- | null | 是否隐藏编辑按钮 |
| hideSaveButton | boolean | --- | --- | 是否隐藏保存按钮 |
| fabIcon | string | --- | --- | 编辑按钮的图标 |
| value(model) | object | --- | --- | 表单绑定对象 |
| disabledFields | string[] | --- | --- | 禁用的表单字段 |
| readonlyFields | string[] | --- | --- | 只读的表单字段 |
| validateOnChange | boolean | --- | true | 是否在值变化的时候触发校验规则 |
| rules | object | --- | --- | 表单校验规则配置对象，对象具体结构类型如下所示[rules](#rules) |

### rules

<span>**rules**</span>是一个对象，对象类型如下 FormRule 所示

```typescript
export interface ValidatorType {
    (val: any): null | string
}

export interface FormRule {
    [key: string]: ValidatorType | ValidatorType[]
}
```

ValidatorType类型是一个函数，函数参数的类型为任意值，返回的结果为null或者字符串；所以rules示例为：

```html
<template>
    <link-page>
        <link-form ref="form" :value="formData" :rules="formRules">
        </link-form>
    </link-page>
</template>

<script>
    export default {
        data() {
            return {
                formRules: {
                    // 自定义必填校验
                    rulesRequired1: this.Validator.required(),
                    // 自定义异步校验
                    rulesRequiredAsync: this.asyncValidator,
                    // 自定义异步校验的时候，异步函数执行异常
                    rulesRequiredAsyncError: this.asyncValidatorError,
                    // 自定义必填校验，并且修改必填信息
                    rulesRequiredA: this.Validator.required('开始必填'),
                    // 同一个form-item内多字段校验
                    rulesRequiredB: this.Validator.required('结束必填'),
                    // 组合校验，值为多个函数组合的数组
                    comboRules: [this.Validator.required('不能为空！'), this.Validator.len({max: 5, min: 2, minMsg: '不能少于2个字符'})],
                    // 电话号码校验
                    mobilePhone: this.Validator.phone(),
                    // 邮箱校验
                    email: this.Validator.email(),
                    // qq号码校验
                    qq: this.Validator.qq(),
                    // 身份证号校验
                    cardId: this.Validator.cardId(),
                    // 数字校验，最大最小值
                    numberType: this.Validator.number({max: 5, min: 2}),
                    // 正则校验
                    testReg: this.Validator.regexp({reg: /^1[3456789]\\d{9}$/, msg: '请输入正确的电话号码'}),
                }
            }
        },
    }
</script>
```

## 事件

| 事件名称 | 参数 | 说明 |
| --- | --- | --- | 
| fieldValueChange | field:string, newVal:any, oldVal:any | 字段值变化事件 |
| clickEditButton | e:TapEvent | 点击编辑按钮事件 | 

## 方法

| 方法名称 | 参数 | 说明 |
| --- | --- | --- |
| validate | {loading?:boolean} | 异步校验，当校验成功时将返回undefined，否则会抛出异常，异常对象为 {message:string, label:string, field:string} |

## 插槽

| 插槽名称| 说明 |
| --- | --- |
| default | 默认内容插槽 |

## 示例

### 基本用法

```html
<template>
    <link-page class="demo-form-validate-page">
        <link-form v-model="formData" ref="form">
            <link-form-item label="客戶姓名" field="acctName" required>
                <link-input v-model="formData.acctName"/>
            </link-form-item>
            <link-form-item label="客戶级别" field="acctLevel" required>
                <link-lov type="ACCT_STAGE" v-model="formData.acctLevel"/>
            </link-form-item>
        </link-form>
        <link-sticky>
            <link-button mode="stroke" block>取消</link-button>
            <link-button @tap="save" block>确定</link-button>
        </link-sticky>
    </link-page>
</template>

<script>
    export default {
        name: "demo-form-validate-page",
        data() {
            return {
                formData: {},
            }
        },
        methods: {
            async save() {
                await this.$refs.form.validate()
                this.$message.success('校验通过')
            },
        }
    }
</script>
``` 

### link-form-item 设置rules校验规则

```html
<template>
    <link-page class="demo-form-validate-page">
        <link-form v-model="formData" ref="form">
            <link-form-item label="客戶姓名" field="acctName" required>
                <link-input v-model="formData.acctName"/>
            </link-form-item>
            <link-form-item label="客戶年龄" field="acctAge" :rules="Validator.number()">
                <link-input v-model="formData.acctAge"/>
            </link-form-item>
            <link-form-item label="客戶级别" field="acctLevel" required>
                <link-lov type="ACCT_STAGE" v-model="formData.acctLevel"/>
            </link-form-item>
        </link-form>
        <link-sticky>
            <link-button mode="stroke" block>取消</link-button>
            <link-button @tap="save" block>确定</link-button>
        </link-sticky>
    </link-page>
</template>

<script>
    export default {
        name: "demo-form-validate-page",
        data() {
            return {
                formData: {},
            }
        },
        methods: {
            async save() {
                await this.$refs.form.validate()
                this.$message.success('校验通过')
            },
        }
    }
</script>
```

### link-form 设置rules校验规则

```html
<template>
    <link-page class="demo-form-validate-page">
        <link-form v-model="formData" ref="form" :rules="rules">
            <link-form-item label="客戶姓名" field="acctName">
                <link-input v-model="formData.acctName"/>
            </link-form-item>
            <link-form-item label="客戶年龄" field="acctAge">
                <link-input v-model="formData.acctAge"/>
            </link-form-item>
            <link-form-item label="客戶级别" field="acctLevel">
                <link-lov type="ACCT_STAGE" v-model="formData.acctLevel"/>
            </link-form-item>
        </link-form>
        <link-sticky>
            <link-button mode="stroke" block>取消</link-button>
            <link-button @tap="save" block>确定</link-button>
        </link-sticky>
    </link-page>
</template>

<script>
    export default {
        name: "demo-form-validate-page",
        data() {
            return {
                formData: {},
                rules: {
                    acctName: this.Validator.required('客户名称必填'),
                    acctLevel: this.Validator.required('客户级别必填'),
                    acctAge: this.Validator.number({max: 20, min: 5}),
                }
            }
        },
        methods: {
            async save() {
                await this.$refs.form.validate()
                this.$message.success('校验通过')
            },
        }
    }
</script>
```

### link-form-item 与 edit 组件编辑控制

以下组件为 edit 组件，共同的特性是使用了 `useEdit` 组合函数实现的控制行为（disabled、readonly）；

- link-button;
- link-input;
- link-lov;
- link-address;
- link-checkbox-group;
- link-radio-group;
- link-checkbox;
- link-date;
- link-switch;
- link-object;
- link-select;
- link-tag-input;
- link-form;
- link-form-item;

> - 所有的edit组件都有父子关系，比如在表单开发中，最顶层的父组件为 `link-form`，接着是 `link-form-item`，然后是一些编辑组件或者按钮；
> - 当对父组件设置了 disabled，或者readonly属性之后，子组件将按照父组件的属性来控制；比如对 link-form 设置了 disabled为true，则旗下的所有
>组件都将禁用；
> - 如果对某一个组件设置了disabled或者readonly，那么该组件将按照自己得到的设置来控制，比如对link-form设置了disabled为true，对其中的某一个link-form-item
>的disabled设置了false或者null，那么这个link-form-item将不禁用，旗下的子组件比如 link-input、link-button等将也不会禁用；其他没有设置 disabled 值的
>link-form-item将随着link-form的禁用而禁用；

```html
<template>
    <link-page class="demo-form-validate-page">
        <link-form disabled :value="{}">
            <link-form-item label="没有禁用" :disabled="false">
                <link-input value="123"/>
            </link-form-item>
            <link-form-item label="禁用了">
                <link-input value="456"/>
                <link-button icon="mp-plus" size="mini"/>
            </link-form-item>
            <link-form-item label="禁用了">
                <link-lov type="ACCT_STAGE" value="PotentialConsumer"/>
            </link-form-item>
        </link-form>
    </link-page>
</template>
```