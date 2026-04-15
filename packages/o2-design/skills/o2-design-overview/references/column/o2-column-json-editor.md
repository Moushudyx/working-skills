# O2ColumnJsonEditor

O2ColumnJsonEditor 是 JSON 编辑列，基于 O2JsonEditor，适用于结构化配置字段。

关联基础组件：`../o2-json-editor.md`

## 示例代码

```tsx
import { O2ColumnJsonEditor, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnJsonEditor title="扩展配置" field="extConfig" />
    </O2Table>
  );
});
```

## 行为说明

- normal 态点击“详细信息”打开只读 JSON 弹窗。
- edit 态使用 O2JsonEditor 进行编辑。
- deepField 场景可配合 `processDeepFieldVModel` 回写。

## 注意事项

- normal 态依赖字段值可被解析为 JSON 结构。
- 若需要自定义编辑器行为，可通过 `editProps` 透传到 O2JsonEditor。

## 版本支持

- 版本判断以基础组件文档 `../o2-json-editor.md` 与表格列公共能力为准。
