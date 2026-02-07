---
name: o2-page-list
description: 列表页页面结构与示例模板
---

# 页面结构

- 页眉：标题 + 操作按钮
- 主体：查询表单 + 列表（含操作列）

# 示例代码

```jsx
import React, { Component } from 'react';
import { designO2Page, usePageTitle, useTableOption, O2Table, O2ColumnInput, O2ColumnLov } from 'o2-design';
import formatterCollections from 'utils/intl/formatterCollections';
import intl from 'utils/intl';
import { getCurrentOrganizationId } from 'utils/utils';
import { O2PCM_M } from 'o2Utils/config';

const prefix = `${O2PCM_M}`;
const organizationId = getCurrentOrganizationId();

const Page = designO2Page(() => {
  usePageTitle(() => intl.get('多语言前缀.view.title.list').d('列表页'));
  const option = useTableOption({
    url: `${prefix}/v1/${organizationId}/items`,
    keyField: 'itemId',
  });

  return () => (
    <O2Table option={option}>
      {/* 开启 formFilter 即出现在查询表单 */}
      <O2ColumnInput title="名称" field="name" formFilter />
      <O2ColumnLov title="类型" field="type" lovCode="O2MD.PARAM_TYPE" formFilter />
    </O2Table>
  );
});
// 如果没有多语言需求，其实可以直接 export default Page
@formatterCollections({ code: ['多语言前缀'] })
export default class extends Component {
  render() {
    return <Page {...this.props} />;
  }
}
```

# 要点

开发前需要阅读 `o2-column` 技能

- 列表页只需 `url` 与 `keyField` 即可具备完整 CRUD。
- 复杂表单筛选可使用列的 `formFilter` 与 `filterConfig`。
- 列的编辑方式由 `editType` 控制。
