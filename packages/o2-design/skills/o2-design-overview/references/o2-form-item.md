# O2FormItem

O2FormItem 是字段级容器，负责：

- 标签与布局（label、列宽、对齐）
- 字段校验与错误展示
- 与 O2Form 的级联触发、deepField 校验联动

## 最小示例

```tsx
import { O2Form, O2FormItem, O2Input, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { code: '', qty: null } });

  return () => (
    <O2Form formData={state.formData}>
      <O2FormItem label="编码" field="code" required rules={[{ max: 30 }]}>
        <O2Input v-model={state.formData.code} />
      </O2FormItem>
      <O2FormItem label="数量" field="qty" type="number" min={0} allowEquals={false}>
        <O2Input v-model={state.formData.qty} />
      </O2FormItem>
    </O2Form>
  );
});
```

## 关键参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| field | string/string[] | - | 校验字段 |
| label | string | - | 标签文本 |
| required | boolean/function | - | 必填，可按 row 动态计算 |
| rules | object/array | - | 自定义规则 |
| type | string | - | 校验类型 |
| min/max | string/number/date/array | - | 边界校验 |
| allowEquals | boolean | true | min/max 是否允许等于 |
| datetime | boolean | - | 日期校验消息格式辅助 |
| validateOnChange | boolean | 继承 O2Form | 值变化时是否校验 |
| columns | number | 1 | 占用列数 |
| block | boolean | false | 是否占满整行 |
| labelWidth | string/number | 继承 O2Form | 标签宽度 |
| labelMinWidth | number | 继承 O2Form | 标签最小宽度 |
| labelAlign | left/center/right | 继承 O2Form | 标签对齐 |
| colon | boolean | 继承 O2Form | 是否显示冒号 |
| hideLabel | boolean | false | 隐藏标签 |
| tip | string | - | 标签旁提示 |
| tooltip | string/ReactNode | - | 内容区 tooltip |
| cascadeFields | string/string[] | - | 级联字段 |
| disableWhenParentClear | boolean | true | 父级为空时禁用当前项 |

## 行为关系

- 触发 onChange 后，若开启 validateOnChange，会调用 O2Form 的 validateField。
- 配置 cascadeFields 时，字段变化会触发 O2Form 级联清理逻辑。
- required 函数接收 row（即当前 formData）用于动态必填判断。
- deepField 开启时，field 会按路径参与错误匹配与展示。

统一校验规则见 `validation.md`。

自动组件参数透传规则见 `form/o2-form-components.md`。

## 常见问题

### 规则写了但不触发

- 检查 field 与绑定值是否一致。
- 检查 validateOnChange 是否被关闭。

### 错误提示显示到别的字段

- deepField 场景检查字段路径是否一致。
- field 与 rules.field 混用时，优先统一为同一路径格式。
