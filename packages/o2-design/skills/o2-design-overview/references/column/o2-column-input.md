# O2ColumnInput

O2ColumnInput 是文本输入列，基于 O2Input，支持多值输入与脱敏展示。

关联基础组件：`../o2-input.md`

## 示例代码

```tsx
import { O2ColumnInput, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnInput title="编码" field="itemCode" formFilter />
      <O2ColumnInput title="手机号" field="mobile" encrypt="tel" />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| multiple | boolean | false | 多值输入 |
| encrypt | boolean/string | - | 脱敏显示策略 |
| revealBtn | boolean | false | 脱敏时显示“查看原文”按钮 |

## 行为说明

- normal 态会走 `encryptService`，根据 `encrypt/revealBtn` 控制展示。
- edit 态默认使用 O2Input，并触发 `onChange` 事件透出。
- deepField 场景应配合 `processDeepFieldVModel` 回写。
