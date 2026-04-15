# O2ColumnImage

O2ColumnImage 是图片列，normal 态展示缩略图，edit 态使用 O2ImageUpload 进行上传。

关联基础组件：`../o2-image-upload.md`、`../o2-upload.md`、`../o2-picture.md`

## 示例代码

```tsx
import { O2ColumnImage, O2Table, designPage, useTableOption } from 'o2-design';

export default designPage(() => {
  const option = useTableOption({ url: '/api/demo/v1/items', keyField: 'id' });

  return () => (
    <O2Table option={option}>
      <O2ColumnImage
        title="图片"
        field="imageUrl"
        urlPrefix="/o2md-m"
        directory="item-image"
        accept="image/*"
        max={2 * 1024 * 1024}
      />
    </O2Table>
  );
});
```

## 变体参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| objectFit | string | contain | normal 态图片缩放模式 |
| listType | string | picture-card | edit 态上传列表样式 |
| absField/relField | string | - | 绝对/相对路径绑定字段 |
| bindAbs | boolean | false | 是否按绝对路径绑定 |
| urlPrefix | string | - | 上传接口前缀 |
| directory | string | - | 上传目录 |
| accept | string | 图片类型 | 可上传文件类型 |
| max | number | - | 单文件最大字节数 |
| action | string | - | 自定义上传接口 |
| imageWidth/imageHeight | string/number | 50px | normal 态图片尺寸 |
| fileUrlPrefix | string | - | 文件 URL 前缀 |
| tenantId | number | - | 查询文件前缀时使用的租户 |
| handleUploadResponse | function | - | 自定义上传响应解析 |

## 默认配置

- `width=110`
- `align='center'`
- `objectFit='contain'`
- `listType='picture-card'`

## 注意事项

- `field`、`absField`、`relField` 至少应提供一个，否则 edit 态无可绑定字段。
- normal 态会自动处理相对路径前缀；如已知前缀，优先传 `fileUrlPrefix`。
- deepField 场景会按深层路径回写 `abs/rel`。

## 版本支持

- `1.9.1` 起：O2ColumnImage 重写，normal 态改为 Picture 展示并支持编辑态，建议从该版本开始使用。
- `1.8.8` 起：上传 `accept` 支持标准 `input[accept]` 写法（继承 O2Upload/O2ImageUpload 能力）。
- `1.6.68`：修复超过大小等默认提示不显示问题（继承上传组件行为）。
- `1.9.3`：O2ImageUpload 增加 `showDefaultPreview`，可通过 `editProps` 透传使用。
