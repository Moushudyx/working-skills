# O2ColumnTextarea

O2ColumnTextarea 是长文本列，normal 态支持点击弹窗查看全文。

关联基础组件：

- `../o2-textarea.md`（弹框编辑）
- `../o2-textarea-input.md`（行内编辑）

## 示例代码

```tsx
import { O2ColumnTextarea, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id', editType: 'form' });

  return (
    <O2Table option={option}>
      <O2ColumnTextarea title="备注" field="remark" />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| highlight | boolean | true | 是否高亮文本 |

## 行为说明

- normal：点击文本打开只读弹窗（`getTextareaModalValue`）。
- edit：使用 O2TextareaInput（输入框 + 弹窗编辑）。
- form：使用 O2Textarea 直接编辑。
