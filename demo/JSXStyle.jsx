import React from 'react';
import util from '../lib/util';
import moment from 'moment';
import {
  FormBuilder,
  Input,
  InputNumber,
  Select,
  Button,
  TimePicker,
  DatePicker,
  MonthPicker,
  RangePicker,
  CheckboxGroup,
  RadioGroup,
  Password,
  Cascader,
} from '../lib/index';
import { Icon } from 'antd';

@FormBuilder.create()
class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    //console.debug(this.props.formBuilder)
    var obj = {};
    this.props.formBuilder && this.props.formBuilder.setFieldsValue(obj);
  }

  handleOnsubmit(e) {
    e.preventDefault();
    this.props.formBuilder &&
      this.props.formBuilder.validateFields((err, values) => {
        if (err) {
          console.log('表单错误', err);
          return;
        } else {
          console.log('表单值: ', values);
        }
      });
    //var value = this.props.formBuilder.getFieldsValue('password');
    //console.log(value)
  }

  render() {
    return (
      <div>
        <FormBuilder
          onSubmit={this.handleOnsubmit.bind(this)}
          size="default"
          hasFeedback={true}
        >
          <Input
            max={10}
            min={5}
            type="text"
            name="text"
            label="text类型"
            placeholder="请输入"
          />
          <Input
            array={true}
            type="text"
            name="text-arrray"
            value={'text'}
            label="text array 类型"
            placeholder="请输入"
          />
          <Input
            type="phone"
            name="phone"
            label="phone类型"
            placeholder="请输入"
          />
          <Input
            type="email"
            name="email"
            label="email类型"
            placeholder="请输入邮箱"
          />
          <Input
            type="url"
            name="url"
            label="url类型"
            placeholder="请输入网址"
          />
          <Input
            type="textarea"
            name="textarea"
            label="textarea类型"
            max="9"
            min="2"
            placeholder="请输入"
          />
          <InputNumber
            type="number"
            name="number"
            step={0.1}
            label="number类型"
            placeholder="请输入"
          />
          <InputNumber
            type="integer"
            name="integer"
            label="integer类型"
            placeholder="请输入"
          />
          <InputNumber type="float" name="float" step={0.1} label="float类型" />
          <Select
            name="boolean"
            boolean={true}
            label="boolean select类型"
            value={true}
          />
          <Select
            name="city"
            mode="tags"
            options={[
              {
                value: 'shenzhen',
                label: '深圳',
              },
              {
                value: 'beijing',
                label: '北京',
              },
            ]}
            label="单选select类型"
          />
          <Select
            name="city2"
            group={[
              {
                label: '广东省',
                options: [
                  {
                    value: 'shenzen',
                    label: '深圳',
                  },
                ],
              },
            ]}
            label="分组select类型"
          />
          <Select
            name="city3"
            multiple={true}
            options={[
              {
                label: '深圳',
                value: 'shenzhen',
              },
              {
                label: '上海',
                value: 'shanghai',
              },
            ]}
            label="多选select类型"
          />
          <TimePicker
            name="timepicker"
            label="TimePicker类型"
            value={moment('2016-04-14 10:10:00')}
            placeholder="请选择时间"
          />
          <DatePicker
            name="datepicker"
            label="DatePicker类型"
            placeholder="请选择日期"
            format="YYYY-MM-DD HH:mm:ss"
            value="2015-11-01"
            showTime
          />
          <MonthPicker
            name="monthpicker"
            value="2017-05"
            label="MonthPicker类型"
            placeholder="请选择月份"
          />
          <RangePicker
            name="rangepicker"
            label="RangePicker类型"
            value={['2016-04-05', '2016-04-05']}
          />
          <CheckboxGroup
            name="checkboxgroup"
            options={[
              { label: 'Apple', value: 'Apple' },
              { label: 'Pear', value: 'Pear' },
              { label: 'Orange', value: 'Orange' },
            ]}
            label="CheckboxGroup类型"
          />
          <RadioGroup
            name="radiogroup"
            options={[
              { label: 'Apple', value: 'Apple' },
              { label: 'Pear', value: 'Pear' },
              { label: 'Orange', value: 'Orange' },
            ]}
            label="RadioGroup类型"
          />
          <Password
            name="password"
            onlyLetterAndNumber={false}
            rePassword={false}
            label="密码"
          />
          <Cascader
            name="cascader"
            label="省市级联动"
            options={[
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [
                  {
                    value: 'hangzhou',
                    label: 'Hangzhou',
                    children: [
                      {
                        value: 'xihu',
                        label: 'West Lake',
                      },
                    ],
                  },
                ],
              },
              {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [
                  {
                    value: 'nanjing',
                    label: 'Nanjing',
                    children: [
                      {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                      },
                    ],
                  },
                ],
              },
            ]}
          />
          <Button htmlType="submit" buttonType="primary">
            提交
          </Button>
        </FormBuilder>
      </div>
    );
  }
}

export default Container;
