# 详情页模板（O2Form + 子表）

适用场景: 新增/编辑/查看详情页, 或列表-详情结构的详情端

## 最小模板

```tsx
import {
  O2Button,
  O2Form,
  O2FormInput,
  O2Table,
  designO2Page,
  reactive,
  useFormOption,
  useTableOption,
} from 'o2-design';

export default designO2Page(() => {
  const state = reactive({ formData: { id: null, code: '', name: '' } });

  const formOption = useFormOption({
    formData: state.formData,
  });

  const lineOption = useTableOption({
    url: '/api/demo/v1/item-lines',
    queryFields: [],
    columns: [],
  });

  const handleSave = async () => {
    await formOption.submit();
  };

  return () => (
    <>
      <O2Form option={formOption}>
        <O2FormInput field="code" label="编码" required />
        <O2FormInput field="name" label="名称" required />
      </O2Form>
      <O2Table option={lineOption} />
      <O2Button asyncHandler={handleSave}>保存</O2Button>
    </>
  );
});
```

## 多表单场景

- 一个详情页多个表单时, 建议按业务块拆分 formData
- 如果多个表单对应同一个记录内的数据, 可以共用一个 useFormOption, 统一校验、提交
- 需要联动时, 通过共享 reactive state 或 provide/inject 传递上下文

## 详情页 Tabs 场景

- Tabs 下每个 Tab 维护独立表单/列表 option, 避免相互污染
- 首屏只加载当前 Tab 所需数据, 其余采用懒加载降低首屏压力
- 离开页面前统一处理未保存提示

