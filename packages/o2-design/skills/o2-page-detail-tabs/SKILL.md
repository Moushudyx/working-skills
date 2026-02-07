---
name: o2-page-detail-tabs
description: 详情页 Tab 结构与 useTabs 推荐写法
---

# 适用场景

- 详情页包含多个功能区块，且区块之间不希望同时渲染。

# 推荐写法（useTabs）

```jsx
import React, { Component } from 'react';
import { designO2Page, usePageTitle } from 'o2-design';
import formatterCollections from 'utils/intl/formatterCollections';
import intl from 'utils/intl';
import { useFormOptionSetup, useTabs } from 'o2Utils';
import { useBaseTab } from './tabs/BaseTab';
import { useRelationTab } from './tabs/RelationTab';

const Page = designO2Page(() => {
  // formatterCollections 用前缀，intl.get 用完整编码
  usePageTitle(() => intl.get('o2.demo.detail.title').d('示例详情'));
  const { formOption, methods, state } = useFormOptionSetup({
    url: '/api/v1/items',
    keyField: 'itemId',
  });

  const { renderTabs, useTabPane } = useTabs();
  // Tabs 内部可继续拆成多个表单模块
  useBaseTab({ useTabPane, formOption, methods, state });
  useRelationTab({ useTabPane, formOption, methods, state });

  return () => <>{renderTabs()}</>;
});

@formatterCollections({ code: ['o2.demo.detail'] })
export default class extends Component {
  render() {
    return <Page />;
  }
}
```

# 要点

- Tab 内部仍可拆分为多个 `O2Form`，共享同一 `formOption`。
- Tabs 与折叠卡片可以同时存在，不是互斥关系。
- Tab 切换时，尽量将复杂渲染封装在各自模块内。
