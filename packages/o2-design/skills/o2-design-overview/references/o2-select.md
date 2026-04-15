# O2Select 下拉选择

O2Select 是通用下拉选择组件，支持同步/异步 options、搜索和多选标签控制。

如果选项来自值集配置，优先使用 `o2-lov.md`。

## 示例代码

```tsx
import { O2Select, O2SelectOption, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const state = reactive({ status: 'NEW', users: ['A'] });

  return () => (
    <>
      <O2Select v-model={state.status} searchable style={{ width: 240 }}>
        <O2SelectOption value="NEW">新建</O2SelectOption>
        <O2SelectOption value="SUBMITTED">已提交</O2SelectOption>
      </O2Select>

      <O2Select v-model={state.users} multiple maxTagCount={2} style={{ width: 320 }}>
        <O2SelectOption value="A">张三</O2SelectOption>
        <O2SelectOption value="B">李四</O2SelectOption>
        <O2SelectOption value="C">王五</O2SelectOption>
      </O2Select>
    </>
  );
});
```

## 参数

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| modelValue | any | - | 绑定值 |
| searchable | boolean | false | 是否开启搜索 |
| searchMatcher | string \| function | - | 搜索匹配逻辑 |
| options | ReactNode \| Promise \| Function | - | 可选项来源 |
| clearButton | boolean | true | 是否显示清空按钮 |
| maxTagCount | number | - | 多选标签最大展示数量 |
| maxTagTextLength | number | - | 多选标签文本最大长度 |
| maxTagPlaceholder | function | - | 多选折叠占位文案 |

## 插槽

| 插槽名 | 说明 |
| --- | --- |
| default | 选项内容，通常为 O2SelectOption |

## 常见问题

### 多选标签显示不全怎么办？

- 使用 `maxTagCount` / `maxTagTextLength` 控制展示。
- 标签过多时建议改为弹窗选择（见 `o2-lov-view.md`）。

### 搜索不生效怎么办？

- 检查是否开启 `searchable`。
- 自定义数据结构时补充 `searchMatcher`。

## 特殊使用场景

- 通用枚举下拉: 直接写静态 option。
- 动态远程选项: 通过 `options` 传 Promise 或函数。
