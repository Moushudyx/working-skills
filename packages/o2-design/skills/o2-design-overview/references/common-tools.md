# 常见工具

## $$lov

来源: O2Lov 暴露的值集服务对象, 常见入口是 O2Lov.$$lov

常用能力:

- getLovByCode(code): 异步获取值集数据
- getLovByCodeComputed(code): 响应式获取值集
- getLovNameByCodeAndValComputed(code, value): 将值集值映射为显示值

示例:

```tsx
import { O2Lov, O2Form, O2FormItem, designPage, reactive } from 'o2-design';

export default designPage(() => {
  const $$lov = O2Lov.$$lov;
  const state = reactive({ type: 'Y' });

  return () => (
    <O2Form column={1}>
      <O2FormItem label="状态文本">
        {$$lov.getLovNameByCodeAndValComputed('HPFM.YES_NO', state.type)}
      </O2FormItem>
    </O2Form>
  );
});
```

## 全局配置 useGlobalConfig

通过 useGlobalConfig 在 setup 作用域内设置全局行为, 影响当前及后代组件

常用配置项:

- tableRowCommonProps
- tableCommonColumnProps
- tableColumnPropsMergeConfig
- formCommonItemProps
- formCommonNativeProps
- filterInheritGlobalFormCommonProps
- adjustIntlFieldMaxLengthMap

示例:

```tsx
import { O2Form, O2FormInput, designPage, reactive, useGlobalConfig } from 'o2-design';

export default designPage(() => {
  const state = reactive({ formData: { code: '' } });

  useGlobalConfig({
    formCommonItemProps: {
      tooltip: ({ value, props }) => `${props.label}: ${value ?? ''}`,
    },
  });

  return () => (
    <O2Form formData={state.formData}>
      <O2FormInput field="code" label="编码" />
    </O2Form>
  );
});
```

## 注意事项

- 文档与源码冲突时, 以 source/src 的实现为准
- $$lov 依赖值集接口与初始化配置, 如果页面未正确 initialize, 可能无法取值

