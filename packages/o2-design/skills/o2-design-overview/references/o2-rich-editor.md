# O2RichEditor 富文本编辑器

O2RichEditor 基于 wangeditor，支持 HTML + JSON 双向数据、图片上传、只读控制。

O2IntlRichEditor 是其多语言衍生组件，见 `o2-intl-rich-editor.md`。

## 示例代码

```tsx
import { O2RichEditor, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ content: '', contentJson: [] });

  return (
    <O2RichEditor
      modelValue={state.content}
      onUpdateModelValue={(v) => (state.content = v || '')}
      json={state.contentJson}
      onUpdateJson={(v) => (state.contentJson = v || [])}
      urlPrefix="/o2md-m"
      serviceCode="hfle"
      directory="o2-richtext"
      height={320}
    />
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | string | - | HTML 文本 |
| json | SlateDescendant[] | - | JSON 结构 |
| dropdownFix | boolean | true | 下拉面板位置修正 |
| modalFix | boolean | true | 模态弹层位置修正 |
| emptyFix | boolean | true | 空内容判定修正 |
| height | number \| string | 300 | 编辑器高度 |
| options | object | - | 编辑器配置 |
| toolbar | object | - | 工具栏配置 |
| urlPrefix | string | - | 图片上传服务前缀 |
| serviceCode | string | hfle | 图片上传服务编码 |
| directory | string | o2-richtext | 上传目录 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| prepend | 编辑器顶部内容 |
| default | 工具栏前插入内容 |
| append | 编辑器底部内容 |

## 常见问题

### 一个页面放多个富文本会失焦？

- 源码已注明该已知问题。
- 建议拆分页面或避免同屏多个实例。

### 为什么清空后还有 HTML 标签？

- 可开启 `emptyFix`，空内容会回写为空字符串。

### 图片上传失败怎么排查？

- 检查 `urlPrefix/serviceCode/directory`。
- 检查 `getImageDataAsync` 初始化配置和权限。

## 特殊使用场景

- 富文本模板维护。
- 如果有多语言需求，建议使用 O2IntlRichEditor 以简化多语言处理。
