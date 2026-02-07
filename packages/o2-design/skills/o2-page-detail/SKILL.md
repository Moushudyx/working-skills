---
name: o2-page-detail
description: 详情页结构与 useFormOptionSetup 推荐写法
---

# 页面结构

- 页眉：返回 + 标题 + 操作按钮
- 主体：一个或多个表单块（常配合折叠卡片）

# 推荐写法（useFormOptionSetup）

```jsx
import React, { Component } from 'react';
import { designO2Page, usePageTitle, useHttp } from 'o2-design';
import formatterCollections from 'utils/intl/formatterCollections';
import intl from 'utils/intl';
import { getCurrentOrganizationId } from 'utils/utils';
import { O2PCM_M } from 'o2Utils/config';
import { useFormOptionSetup, useTabs } from 'o2Utils';
import { useBaseInfo } from './BaseInfo';

const prefix = `${O2PCM_M}`;
const organizationId = getCurrentOrganizationId();

const Page = designO2Page((props) => {
  // formatterCollections 用前缀，intl.get 用完整编码
  usePageTitle(() => intl.get('o2.demo.detail.title').d('示例详情'));
  const http = useHttp();

  const { formOption, methods, state, renderCollapses } = useFormOptionSetup({
    url: `${prefix}/v1/${organizationId}/items`,
    keyField: 'itemId',
  });

  // 折叠卡片与 Tabs 可同时使用
  const { renderTabs, useTabPane } = useTabs();

  useBaseInfo({ useCollapse: renderCollapses.useCollapse, formOption, methods, state, http });

  return () => (
    <>
      {renderCollapses()}
      {renderTabs()}
    </>
  );
});

@formatterCollections({ code: ['o2.demo.detail'] })
export default class extends Component {
  render() {
    return <Page />;
  }
}
```

# 多表单处理

- 一个详情页通常拆成多个模块，每个模块内部渲染一个 `O2Form`。
- 模块共享同一个 `formOption`，统一校验与保存。

# 常用要点

- `useFormOptionSetup` 负责装配折叠卡片与表单 option。
- 折叠卡片与 Tabs 可以同时存在，不是互斥关系。
- 若需要右侧导航栏，模块注册锚点后统一渲染。
