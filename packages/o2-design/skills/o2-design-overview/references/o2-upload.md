# O2Upload 文件上传

O2Upload 是通用上传组件，支持单文件状态绑定、删除、手动上传和预览。

O2ImageUpload 是图片上传衍生组件，见 `o2-image-upload.md`。

## 示例代码

```tsx
import { O2Upload, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({
    rel: '',
    abs: '',
    fileName: '',
  });

  return (
    <O2Upload
      urlPrefix="/o2md-m"
      directory="order-attach"
      serviceCode="hfle"
      accept=".pdf,.doc,.docx"
      max={20 * 1024 * 1024}
      v-model-rel={state.rel}
      v-model-abs={state.abs}
      v-model-file-name={state.fileName}
    />
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| urlPrefix | string | - | 默认上传接口前缀 |
| serviceCode | string | hfle | 服务编码 |
| directory | string | - | 上传目录 |
| accept | string | 图片类型 | 可上传文件类型 |
| max | number | - | 单文件最大字节数 |
| action | string | - | 自定义上传接口 |
| fileUrlPrefix | string | - | 文件 URL 前缀（不走默认前缀查询） |
| manualUpload | boolean \| Promise | - | 手动控制上传时机 |
| stringifyObject | boolean | true | 手动上传时 data 对象处理策略 |
| showUploadList | boolean \| object | null | 上传列表展示配置 |
| tenantId | number | - | 查询文件前缀时使用的租户 |
| data | object \| function | - | 上传附加参数 |
| deleteData | object \| function | - | 删除附加参数 |
| beforeUpload | function | - | 上传前校验/拦截 |
| handleRemove | function | - | 自定义删除逻辑 |
| handleUploadResponse | function | - | 自定义上传响应解析 |

模型字段:

- `uid / fileName / rel / abs / thumb / status / type`

事件:

- `onSuccess`, `onUploadError`, `onRemoveSuccess`, `onManualUploadFinish`, `onPreview`

## 常见问题

### 上传按钮点了没反应？

- 检查 `accept/max` 是否拦截。
- 检查是否只读/禁用状态。

### 删除失败怎么办？

- 默认会调删除接口。
- 可用 `handleRemove` 自定义删除逻辑。

### 手动上传如何触发？

- `manualUpload=true` 时可通过组件暴露方法触发。
- 或传 Promise，在 resolve 时自动触发上传。

## 特殊使用场景

- 审批附件上传（单文件）。
- 前端分步流程中的手动上传。

## 版本支持

- `accept` 支持标准 `input[accept]` 写法在 `1.8.8` 增强。
- 超过大小等默认提示在 `1.6.68` 修复。
