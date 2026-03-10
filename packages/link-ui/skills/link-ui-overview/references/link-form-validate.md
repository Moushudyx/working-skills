# link-form-validate 表单校验

本文是校验规则速查

详细的表单整体用法见：`references/link-form.md`

## 最小示例

```vue
<template>
	<link-form-panel :option="formOption">
		<template slot="header-right-editing">
			<link-button @click="onValidate">校验</link-button>
			<link-button @click="formOption.save">保存</link-button>
		</template>

		<link-form-grid>
			<lnk-panelfolder title="基础信息" style="width: 100%;">
				<link-form-item label="客户名称" prop="acctName" required>
					<link-input v-model="formOption.data.acctName" />
				</link-form-item>

				<link-form-item
					label="客户类型"
					prop="acctType"
					:rules="{ options: ['DEALER1', 'Terminal'], message: '只能选择经销商或门店' }"
					required
				>
					<link-lov-select lov-type="ACCT_TYPE" v-model="formOption.data.acctType" />
				</link-form-item>

				<link-form-item
					label="备注"
					prop="memo"
					:rules="{ min: 5, max: 100, message: '长度需在 5-100 之间' }"
				>
					<link-textarea v-model="formOption.data.memo" />
				</link-form-item>
			</lnk-panelfolder>
		</link-form-grid>
	</link-form-panel>
</template>

<script>
export default {
	data() {
		return {
			formOption: new LinkFormPanelOption({
				context: this,
				module: '/link/accnt',
				data: {},
			}),
		}
	},
	methods: {
		async onValidate() {
			const ok = await this.formOption.checkValid()
			if (!ok) return
			this.$message.success('校验通过')
		},
	},
}
</script>
```

## 规则写法

### required

- 必填请写在 `link-form-item` 上, 不要写在输入组件上
- 当 `prop` 为数组时, 会为每个字段生成必填规则

### prop

- 类型：`String` 或 `Array<String>`
- `prop` 为数组时：任一字段不通过, 当前 `form-item` 即不通过

### rules

- 类型：`Object` 或 `Array<Object>`
- 当 `prop` 为字符串：规则里可省略 `prop`（会自动补齐）
- 当 `prop` 为数组：每条规则都必须显式写 `prop`

## 校验规则对象字段

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| prop | String | 规则对应字段名（只能是字符串） |
| min | Number | 数值最小值；或字符串/数组最小长度 |
| max | Number | 数值最大值；或字符串/数组最大长度 |
| message | String | 校验失败提示（必填） |
| validator | Function | 自定义校验函数（支持异步） |
| options | Any \| Array<Any> | 值域校验, 如 `true` 或候选集合 |
| regexp | RegExp | 正则校验 |

## 常见规则示例

```vue
<!-- 数值范围 -->
<link-form-item prop="age" :rules="{ min: 1, max: 120, message: '年龄范围 1-120' }" required>
	<link-input-number v-model="formOption.data.age" />
</link-form-item>

<!-- 文本长度 -->
<link-form-item prop="name" :rules="{ min: 2, max: 20, message: '姓名长度 2-20' }" required>
	<link-input v-model="formOption.data.name" />
</link-form-item>

<!-- 数组选项个数 -->
<link-form-item prop="tags" :rules="{ min: 1, max: 3, message: '至少 1 个, 最多 3 个' }" required>
	<link-lov-check lov="ACCT_TYPE" v-model="formOption.data.tags" />
</link-form-item>

<!-- 值域限制 -->
<link-form-item prop="acctType" :rules="{ options: ['DEALER1', 'Terminal'], message: '类型不合法' }" required>
	<link-lov-select lov-type="ACCT_TYPE" v-model="formOption.data.acctType" />
</link-form-item>

<!-- 多字段 + 指定规则作用字段 -->
<link-form-item
	:prop="['province', 'city', 'district']"
	required
	:rules="{ prop: 'province', options: ['北京', '上海', '广州'], message: '省份仅支持北上广' }"
>
	<!-- ... -->
</link-form-item>
```

## 自定义校验

```js
export default {
	data() {
		return {
			formOption: new LinkFormPanelOption({ context: this, module: '/link/accnt', data: {} }),
			validateChildValue: async () => {
				const { parentType, childType } = this.formOption.data
				if (parentType !== 'Terminal' && !['DEALER1', 'Terminal'].includes(childType)) {
					return '父值不为门店时, 子值只能是经销商或门店'
				}
			},
		}
	},
}
```

```vue
<link-form-item label="子值" prop="childType" :rules="{ prop: 'childType', validator: validateChildValue }" required>
	<link-lov-select lov-type="ACCT_TYPE" v-model="formOption.data.childType" />
</link-form-item>
```

## 注意事项

- 必填校验请用 `required`, 不要用 rules 写必填
- 不建议频繁触发校验
  - 如必须请求后端, 需要节流, 例如：`this.$lv.$utils.throttle(fn, 300)`
- 列表校验可以设置 link-table-column-* 组件上的 `rules`, 使用方式与 link-form-item 上的 rules 基本一致, 详见 `references/link-table-column.md` 中的 `rules` 字段说明

## 兼容说明

两种 link-form 的写法都还在部分页面使用, 且校验规则写法不完全统一, 建议新页面优先使用 `link-form-panel` + `formOption` 的方式, 并复用本文规则写法；如果是非常小的组页面/组件(比如一个弹框里只有两三个输入框), 也可以继续使用 `link-form` + `validateAsync` 的写法

### 迁移要点 从旧写法到新写法

- 旧写法：`this.$refs.form.validateAsync()` + `showError(error)`
- 新写法：`formOption.checkValid()`（校验并提示）

校验触发入口从 `link-form ref` 转到 `formOption`, 但字段规则仍写在 `link-form-item` 上。
