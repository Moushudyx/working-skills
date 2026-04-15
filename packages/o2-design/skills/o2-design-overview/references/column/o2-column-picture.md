# O2ColumnPicture

O2ColumnPicture 是图片预览列，基于 O2Picture，适用于轻量图片展示与编辑。

关联基础组件：O2Picture（当前无独立文档）

## 示例代码

```tsx
import { O2ColumnPicture, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnPicture
        title="封面"
        field="coverUrl"
        pictureProps={({ row }) => ({
          width: row.big ? 40 : 25,
          height: row.big ? 40 : 25,
        })}
      />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| pictureProps | object/function | - | 透传 O2Picture 的参数，支持按行动态生成 |

## 行为说明

- normal 态为空值时不渲染图片。
- normal/edit 态都会透传 `pictureProps`。
- deepField 场景可配合 `processDeepFieldVModel`。

## 版本支持

- `1.6.34` 起：`pictureProps` 支持函数；O2Picture 支持 `tenantId`。
- `1.6.36`：空值场景调整为不显示图片。
- `1.6.19`：优化 `pictureProps` 在 normal/edit 插槽的透传行为。
