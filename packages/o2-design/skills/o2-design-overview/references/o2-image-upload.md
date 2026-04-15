# O2ImageUpload 图片上传

O2ImageUpload 是 O2Upload 的图片场景衍生组件，默认支持图片预览弹窗。

## 示例代码

```tsx
import { O2ImageUpload, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ rel: '', abs: '' });

  return (
    <O2ImageUpload
      v-model-rel={state.rel}
      v-model-abs={state.abs}
      urlPrefix="/o2md-m"
      directory="avatar"
      showDefaultPreview
    />
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| rel | string | - | 图片相对路径 |
| abs | string | - | 图片绝对路径 |
| urlPrefix | string | - | 服务前缀 |
| directory | string | - | 上传目录 |
| showUploadList | boolean \| object | null | 上传列表展示配置 |
| showDefaultPreview | boolean | true | 是否启用默认预览弹窗 |

说明:

- 继承 O2Upload 的主要上传能力。
- 默认 `onPreview` 会打开图片预览弹窗。

## 常见问题

### 不想用默认预览弹窗怎么办？

- 设置 `showDefaultPreview=false`。
- 自行实现 `onPreview` 逻辑。

### 为什么 rel/abs 偶尔不同步？

- 组件内部有同步逻辑，但建议始终同时维护二者。

## 特殊使用场景

- 头像上传。
- 商品主图上传与预览。

## 版本支持

- `showDefaultPreview` 在 `1.9.3` 增强（支持关闭默认预览弹窗）。
