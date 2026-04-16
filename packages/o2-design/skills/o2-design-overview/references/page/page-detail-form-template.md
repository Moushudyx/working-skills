```jsx
// 示例: 课程管理 - 基本信息
import React from 'react';
// import moment from 'moment'; // O2DatePicker 可能需要用到
import {
  O2Form,
  O2FormInput,
  O2FormImageUpload,
  O2FormLov,
  O2FormLovView,
  O2FormSwitch,
  O2FormDatePicker,
} from 'o2-design';
import intl from 'utils/intl';

/** 课程管理 - 基本信息 */
export function useBaseInfo({ useCollapse, formOption /* , methods, state */ }) {
  // const http = useHttp();

  const key = 'baseInfo';
  const title = intl.get('o2.md.course.panelTitle.baseInfo').d('基本信息');

  useCollapse({
    key,
    title,
    render: () => (
      <O2Form option={formOption}>
        <O2FormInput
          label={intl.get('o2.md.course.courseCode').d('课程编号')}
          field="courseCode"
          v-model={formOption.formData.courseCode}
          disabled
        />
        <O2FormInput
          label={intl.get('o2.md.course.courseName').d('课程名称')}
          field="courseName"
          v-model={formOption.formData.courseName}
          required
        />
        <O2FormImageUpload
          label={intl.get('o2.md.course.courseCover').d('课程封面')}
          field="courseCover"
          v-model={formOption.formData.courseCover}
          listType="picture-card"
          // urlPrefix={ }
          // directory="package"
          required
        />
        <O2FormLov
          label={intl.get('o2.md.course.courseTypeCode').d('课程类型')}
          field="courseTypeCode"
          v-model={formOption.formData.courseTypeCode}
          lovCode="COURSE_TYPE"
          required
        />
        <O2FormLovView
          label={intl.get('o2.md.course.trainer').d('培训导师')}
          field="trainer"
          row={formOption.formData}
          lovCode="FIXME培训导师缺少值集编码"
          showKey="trainer"
          map={{/* 填写值集视图的字段Map */}}
          required
        />
        <O2FormSwitch
          label={intl.get('o2.md.course.requiredFlag').d('是否必修')}
          field="requiredFlag"
          v-model={formOption.formData.requiredFlag}
          required
        />
        <O2FormLov
          label={intl.get('o2.md.course.status').d('课程状态')}
          field="status"
          v-model={formOption.formData.status}
          lovCode="COURSE_STATUS"
          required
          disabled
        />
        <O2FormDatePicker
          label={intl.get('o2.md.course.startTime').d('课程开始时间')}
          field="startTime"
          v-model={formOption.formData.startTime}
          // range // 范围模式，此时 field 要写成 field={[字段1, 字段2]}
          // v-model-start={} v-model-end={} // 范围模式下数据要绑定到这两个参数上
          required
        />
        <O2FormDatePicker
          label={intl.get('o2.md.course.endTime').d('课程结束时间')}
          field="endTime"
          v-model={formOption.formData.endTime}
          // range // 范围模式，此时 field 要写成 field={[字段1, 字段2]}
          // v-model-start={} v-model-end={} // 范围模式下数据要绑定到这两个参数上
          required
        />
      </O2Form>
    ),
    // isShow: () => {}, // 这里可以配置展示逻辑, 如 () => formOption.status !== 'insert' 配置新建时不展示
  });

  // return {}; // 如果想传什么东西回去就在这里写
}
```