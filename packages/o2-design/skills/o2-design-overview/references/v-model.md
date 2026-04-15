# v-model 语法糖

v-model 在 o2-design 里是 Babel 层面的语法糖，不是组件框架自动注入。

核心规则：

- `v-model` 对应 `modelValue + onUpdateModelValue`
- `v-model-xxx` 对应 `xxx + onUpdateXxx`

## 基本写法

```tsx
import { designComponent } from 'o2-design';

export const MyInput = designComponent({
  props: {
    modelValue: String,
  },
  emits: {
    onUpdateModelValue: (value: string) => true,
  },
  setup({ props, event: { emit } }) {
    return () => (
      <input
        value={props.modelValue}
        onChange={(e) => emit.onUpdateModelValue(e.target.value)}
      />
    );
  },
});
```

使用侧：

```tsx
<MyInput v-model={state.name} />
```

等价语义：

```tsx
<MyInput modelValue={state.name} onUpdateModelValue={(v) => (state.name = v)} />
```

## 多字段 v-model

组件定义：

```tsx
import { designComponent } from 'o2-design';

export const MyUpload = designComponent({
  props: {
    rel: String,
    abs: String,
  },
  emits: {
    onUpdateRel: (val?: string) => true,
    onUpdateAbs: (val?: string) => true,
  },
  setup({ props, event: { emit } }) {
    return () => (
      <div>
        <button onClick={() => emit.onUpdateRel('/r/a.png')}>改 rel</button>
        <button onClick={() => emit.onUpdateAbs('https://a/b.png')}>改 abs</button>
        <span>{props.rel}</span>
        <span>{props.abs}</span>
      </div>
    );
  },
});
```

使用侧：

```tsx
<MyUpload v-model-rel={state.relPath} v-model-abs={state.absPath} />
```

## useModel 简化写法

```tsx
import { designComponent, useModel } from 'o2-design';

export const MyInput2 = designComponent({
  props: {
    modelValue: String,
  },
  emits: {
    onUpdateModelValue: (value: string) => true,
  },
  setup({ props, event: { emit } }) {
    const model = useModel(() => props.modelValue, emit.onUpdateModelValue);
    // model.value 读写会自动对应 modelValue / onUpdateModelValue
    return () => <input value={model.value} onChange={(e) => (model.value = e.target.value)} />;
  },
});
```

## 常见问题

### v-model 不生效

- 检查组件是否真的声明了对应 props/emits。
- 检查事件名是否符合 `onUpdateXxx` 规则。
- 检查项目 Babel 配置是否包含对应插件。

### 类型对不上导致回写异常

- 保持 `props` 类型与 `emits` 参数类型一致。
- 回写时避免混入 `undefined/null/''` 的不一致语义。
