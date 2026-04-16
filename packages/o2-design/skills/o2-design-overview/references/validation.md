# 校验规则总览

统一说明 O2Form 与 O2Table 的校验字段、触发时机与常见问题。

## 通用校验字段

| 字段 | 类型 | 作用 | 常见位置 |
| --- | --- | --- | --- |
| required | boolean/function | 是否必填，可按数据动态计算 | O2FormItem / O2Column |
| rules | object/array | 自定义规则集合 | O2FormItem / O2Column |
| type | string | 类型校验（如 number/date） | O2FormItem / O2Column |
| min/max | number/date/function | 最小值/最大值校验 | O2FormItem / O2Column |
| allowEquals | boolean | 边界是否允许等于 | O2FormItem / O2Column |
| validator | function | 自定义校验函数 | rules 内 |

## O2Form 校验

生效入口：`O2FormItem` 及 `O2FormXXX` 自动组件。

- `O2FormItem` 是字段级校验主入口。
- `O2FormXXX` 会把部分参数透传到 `O2FormItem`（如 `required`、数值/日期边界）。
- 使用 `useFormOption` 时，通常通过 `methods.validateAll()` 触发统一校验。

示例：

```tsx
<O2FormItem
  label="数量"
  field="qty"
  required={({ row }) => row.type !== 'FREE'}
  type="number"
  min={0}
  max={999}
  allowEquals
  rules={[{ validator: (_, v) => (v % 1 === 0 ? Promise.resolve() : Promise.reject('必须为整数')) }]}
>
  <O2InputNumber v-model={formData.qty} />
</O2FormItem>
```

## O2Table 校验

生效入口：`O2Column` 与各 `O2ColumnXxx` 变体。

- 列级 `required/rules/type/min/max/allowEquals` 在编辑态校验中生效。
- 变体列可能内置默认类型（如数字列默认 `type='number'`）。
- 表单编辑态（form editor）与行编辑态（inline edit）使用同一列规则体系。

示例：

```tsx
<O2ColumnInputNumber
  title="数量"
  field="qty"
  required={({ row }) => row.status !== 'CLOSED'}
  type="number"
  min={0}
  max={999}
  allowEquals={false}
/>
```

## deepField 场景

当表单或表格开启 `deepField` 时：

- `field` 必须与真实数据路径一致（例如 `a[0].b.c`）。
- 编辑组件需使用 deepField 兼容写法（如 `processDeepFieldVModel` 或自动组件内置能力）。
- 校验字段路径与回写路径必须一致，否则会出现“显示值变了但校验不生效”。

## 常见问题

### 规则写了但没有触发

- 检查 `field` 是否与绑定值一致。
- 检查规则是否挂在 `O2FormItem/O2Column` 而不是无校验能力的纯展示组件上。

### required 是函数但结果不符合预期

- 确认函数读取的是当前行/当前表单数据。
- 避免在函数内读取非响应式中间变量。

### min/max 在动态场景表现异常

- 数值和日期建议配合 `type` 明确校验类型。
- 涉及动态边界时，确保边界值与字段值类型一致。
