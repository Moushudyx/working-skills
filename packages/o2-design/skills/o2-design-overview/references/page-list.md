# 列表页模板（O2Table）

适用场景: 单列表页、列表-详情页中的列表入口

## 最小模板

```tsx
// 课程管理列表页
import React from 'react';
import moment from 'moment'; // O2DatePicker 可能需要用到
import {
  designKeepAlivePage,
  O2Table,
  O2ColumnInput,
  O2ColumnLov,
  O2ColumnLovView,
  O2ColumnSwitch,
  O2ColumnDatePicker,
  useHttp,
  // usePageOperator, // 渲染在页面顶部的按钮
  usePageTitle,
  // useReactHooks, // 用于将 React 的 Hooks 改造为 O2 的
  useTableOption,
  // watch,
} from 'o2-design';
// import { useLocation } from 'react-router'; // 用于实现监听页面跳转
// O2ButtonCollapse 用于实现超过 5 个按钮时折叠多于按钮的逻辑
// import O2ButtonCollapse from 'o2Components/O2ButtonCollapse';
import formatterCollections from 'utils/intl/formatterCollections';
import intl from 'utils/intl';
import { getCurrentOrganizationId } from 'utils/utils';
import { O2MD_M } from 'o2Utils/config';

// 服务编码 这里的 O2MD_M 是元数据模块的服务编码
const prefix = `${O2MD_M}`;
const organizationId = getCurrentOrganizationId();

// 这里使用的 designKeepAlivePage 是 o2-design 1.8.0 以后的才能使用的方法, 如果页面不需要缓存, 直接使用 designO2Page 即可
// 注意与 designPage 区分:
// designPage 是不带任何功能的最基础的定义组件的方法(只能使用 useTableOption 和生命周期函数)
// designO2Page 上可以使用 usePageTitle、usePageOperator 这些模板页面才有的功能
// designKeepAlivePage 则在 designO2Page 的基础上增加了页面缓存功能, 从别的路由跳回时不会触发重新渲染
const Page = designKeepAlivePage(({ history }) => {
  // 页面标题
  usePageTitle(() => intl.get('o2.md.course.view.title.list').d('课程管理列表'));

  // 额外的页面操作按钮, 会被渲染在页面顶部
  // 多数情况下不需要, useTableOption 的 buttons 中, position 为 'out' 的按钮也会渲染在页面顶部, 可以满足绝大多数场景
  // usePageOperator((prev) => (
  //   <>
  //     {/* 这里的 prev 是其他地方渲染的按钮 */}
  //     {prev}
  //     {/* O2ButtonCollapse 用于实现超过 5 个按钮时折叠多于按钮的逻辑, 上面的 prev 也可以塞进这里 */}
  //     <O2ButtonCollapse reverse>{getButtonRender()}</O2ButtonCollapse>
  //   </>
  // ));

  const http = useHttp();
  // const state = reactive({});
  const option = useTableOption({
    permission: '完整菜单编码.ps.button',
    url: { base: () => `${prefix}/v1/${organizationId}/course` },
    // keyField: 'courseId',
    enable: false,
    // hideButton: {
    //   insert: true, // 默认新建按钮
    //   update: true, // 默认编辑按钮
    //   delete: true, // 默认删除按钮
    // },
    buttons: [
      // 页面顶部的新建按钮
      {
        type: 'other',
        code: 'create',
        position: 'out',
        icon: 'add',
        color: 'primary', // default: 默认颜色; primary: 主要按钮颜色
        label: '新建',
        handler: () => {
          methods.handleCreate();
        },
      },
      // 页面顶部的其他按钮
      {
        position: 'out',
        type: 'other',
        code: 'publish',
        // icon: '',
        label: intl.get('o2.md.course.button.publish').d('发布'),
        handler: () => methods.handlePublish(),
        // disabled: () => xxxx,
      },
      {
        position: 'out',
        type: 'other',
        code: 'revoke',
        // icon: '',
        label: intl.get('o2.md.course.button.revoke').d('撤销'),
        handler: () => methods.handleRevoke(),
        // disabled: () => xxxx,
      },
      {
        position: 'out',
        type: 'other',
        code: 'end',
        // icon: '',
        label: intl.get('o2.md.course.button.end').d('结束'),
        handler: () => methods.handleEnd(),
        // disabled: () => xxxx,
      },
      {
        position: 'out',
        type: 'other',
        code: 'export',
        // icon: '',
        label: intl.get('o2.md.course.button.export').d('导出'),
        handler: () => methods.handleExport(),
        // disabled: () => xxxx,
      },
      // 行上的详情按钮
      {
        type: 'other',
        code: 'detail',
        position: 'in',
        label: '详情',
        handler: ({ data }) => {
          methods.handleDetail(data);
        },
        // disabled: () => {},
      },
    ],
  });

  const methods = {
    /** 跳转到新建页面 */
    handleCreate: () => {
      history.push(`/o2rm/course/detail/create`);
    },
    /** 跳转到详情页面 */
    handleDetail: (record) => {
      history.push(`/o2rm/course/detail/${record.courseId}`);
    },
    /** 发布 */
    handlePublish() {},
    /** 撤销 */
    handleRevoke() {},
    /** 结束 */
    handleEnd() {},
    /** 导出 */
    handleExport() {},
  };

  // // 监听页面跳转, 刷新列表页
  // const loc = useReactHooks(() => useLocation());
  // watch(
  //   () => loc.current,
  //   (newLoc) => {
  //     if (newLoc?.pathname === '/o2rm/course/list') option.methods.load();
  //   }
  // );

  return () => (
    <>
      <O2Table option={option} commonColumnProps={{ tooltip: 'overflow', fit: true }}>
        <O2ColumnInput
          title={intl.get('o2.md.course.model.courseCode').d('课程编号')}
          field="courseCode"
        />
        <O2ColumnInput
          title={intl.get('o2.md.course.model.courseName').d('课程名称')}
          field="courseName"
          formFilter
        />
        <O2ColumnLov
          title={intl.get('o2.md.course.model.courseTypeCode').d('课程类型')}
          field="courseTypeCode"
          lovCode="COURSE_TYPE"
          formFilter
        />
        <O2ColumnLovView
          title={intl.get('o2.md.course.model.trainer').d('培训导师')}
          field="trainer"
          lovCode="培训导师值集视图编码"
          showKey="trainer"
          map={{/* 填写值集视图的字段Map */}}
        />
        <O2ColumnInput
          title={intl.get('o2.md.course.model.positionName').d('职位名称')}
          field="positionName"
        />
        <O2ColumnInput
          title={intl.get('o2.md.course.model.organizationUnit').d('组织单位')}
          field="organizationUnit"
        />
        <O2ColumnSwitch
          title={intl.get('o2.md.course.model.requiredFlag').d('是否必修')}
          field="requiredFlag"
          yesNoMode // 展示为“是”“否”
          formFilter
        />
        <O2ColumnLov
          title={intl.get('o2.md.course.model.status').d('课程状态')}
          field="status"
          lovCode="COURSE_STATUS"
          formFilter
        />
        <O2ColumnDatePicker
          title={intl.get('o2.md.course.model.startTime').d('课程开始时间')}
          field="startTime"
          // filterConfig={{
          //   start: 'startTime',
          //   end: 'endTime',
          //   nativeAttrs: {
          //     defaultTime: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
          //   },
          // }}
          // formFilter
        />
        <O2ColumnDatePicker
          title={intl.get('o2.md.course.model.endTime').d('课程结束时间')}
          field="endTime"
        />
        <O2ColumnInput
          title={intl.get('o2.md.course.model.creator').d('创建人')}
          field="creator"
        />
        <O2ColumnDatePicker
          title={intl.get('o2.md.course.model.creationDate').d('创建时间')}
          field="creationDate"
          datetime // 展示日期+时间
          filterConfig={{
            start: 'creationDateFrom',
            end: 'creationDateTo',
            nativeAttrs: {
              defaultTime: [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')],
            },
          }}
          formFilter
        />
      </O2Table>
    </>
  );
});
// 这里 formatterCollections 输入多语言前缀用于自动加载页面上需要的多语言内容
export default formatterCollections({ code: ['o2.md.course'] })(Page);

```

## 开发要点

- useTableOption 和生命周期函数必须在 setup 中调用
- 列表按钮优先放在 table button 区, 统一权限与交互
- 列配置优先使用 O2Column 系列组件, 保持与编辑态一致
- 注意多语言的写法

## 常见扩展

- 列表勾选与批处理
- 操作列按钮鉴权
- 查询条件默认值与复位行为
- 列宽与固定列策略

