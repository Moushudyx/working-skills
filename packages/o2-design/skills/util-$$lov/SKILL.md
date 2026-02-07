---
name: util-$$lov
description: $$lov 值集服务对象与常见用法
---

# 作用

`$$lov` 用于按值集编码获取值集数据或将值转换为显示值。

# 基本用法

```jsx
import { designPage, reactive, O2Lov, O2Form, O2FormItem, O2Button } from 'o2-design';

export default designPage(() => {
  const $$lov = O2Lov.$$lov;
  const state = reactive({ formData: { val1: 'KV' } });

  const getLovs = async () => {
    const lovs = await $$lov.getLovByCode('O2MD.PARAM_TYPE');
    console.log(lovs.map(i => i.meaning));
  };

  return () => (
    <O2Form column={1} labelWidth={200}>
      <O2FormItem label="显示值">
        {$$lov.getLovNameByCodeAndValComputed('O2MD.PARAM_TYPE', state.formData.val1)}
      </O2FormItem>
      <O2FormItem label="获取值集">
        <O2Button onClick={getLovs}>获取</O2Button>
      </O2FormItem>
    </O2Form>
  );
});
```

# 要点

- `getLovNameByCodeAndValComputed` 返回的是响应式计算值，会在值集加载后更新。
- 需要批量获取时可传数组给 `getLovByCode`。
