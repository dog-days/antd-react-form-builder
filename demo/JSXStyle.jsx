import React from 'react'
import util from '../src/util'
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
} from '../lib/index'

@FormBuilder.create()
class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    //console.debug(this.props.formBuilder)
    var obj = {
      number: 1,
      integer: 1.1,
      textarea: "dddddd",
      city: "shenzhen",
    };
    this.props.formBuilder &&
    this.props.formBuilder.setFieldsValue(obj); 
  }

  handleOnsubmit(e){
    e.preventDefault();
    this.props.formBuilder &&
    this.props.formBuilder.validateFields((err, values) => {
      console.debug('values: ', values);
      if(err){
        console.debug("表单错误",err)
        return; 
      }else {
        console.debug('表单值: ', values);
      }
    });
  }

  render() {
    console.debug(1)
    return (
      <FormBuilder 
        onSubmit={ this.handleOnsubmit.bind(this) }
        size="default"
        hasFeedback={ true }
      >
        <Input 
          required
          type="text"
          name="text"
          value={ "text" }
          label="text类型"
          placeholder="请输入"
          onlyLetter={ true }
          maxLength={ 10 }
          minLength={ 10 }
        />
        <Input 
          required
          array={ true }
          type="text"
          name="text-arrray"
          value={ "text" }
          label="text array 类型"
          placeholder="请输入"
        /> 
        <Input 
          type="phone"
          name="text"
          label="phone类型"
          required
          placeholder="请输入"
        />
        <Input
          type="email"
          name="email"
          label="email类型"
          required
          placeholder="请输入邮箱"
        />
        <Input
          type="url"
          name="url"
          label="url类型"
          required
          placeholder="请输入网址"
        />
        <Input
          type="textarea"
          name="textarea"
          label="textarea类型"
          required
          placeholder="请输入"
        />
        <InputNumber
          required
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
          required
          placeholder="请输入"
        />
        <InputNumber
          type="float"
          name="float"
          step={0.1}
          label="float类型"
          required
        />
        <Select 
          name="boolean"
          boolean={ true }
          label="boolean select类型"
          required
          value={ true }
        />
        <Select 
          name="city"
          options={
            [
              {
                value: "shenzhen",
                label: "深圳"
              },
              {
                value: "beijing",
                label: "北京"
              },
            ]
          }
          label="单选select类型"
          required
        />
        <Select 
          name="city2"
          group={
            [
              {
                label: "广东省",
                options: [
                  {
                    value: "shenzen",
                    label: "深圳"
                  }
                ] 
              }
            ]
          }
          label="分组select类型"
          required
        />
        <Select 
          name="city3"
          multiple={ true }
          options={
            [
              {
                label: "深圳",
                value: "shenzhen",
              },
              {
                label: "上海",
                value: "shanghai",
              },
            ]
          }
          label="多选select类型"
          required
        />
        <TimePicker
          name="timepicker"
          label="TimePicker类型"
          rules={
            [
              {
                required: true,
                message: "请选择时间"
              }
            ]
          }
          placeholder="请选择时间"
        />
        <DatePicker
          name="datepicker"
          label="DatePicker类型"
          required
          placeholder="请选择日期"
        />
        <MonthPicker
          name="monthpicker"
          value="2017-05"
          label="MonthPicker类型"
          required
          placeholder="请选择月份"
        />
        <RangePicker
          name="rangepicker"
          label="RangePicker类型"
          rules={
            [
              {
                required: true,
                message: "请选择日期"
              }
            ]
          }
        />
        <CheckboxGroup
          name="checkboxgroup"
          options={
            [
              { label: 'Apple', value: 'Apple' },
              { label: 'Pear', value: 'Pear' },
              { label: 'Orange', value: 'Orange' },
            ]
          }
          label="CheckboxGroup类型"
          required
        />
        <RadioGroup
          name="radiogroup"
          options={
            [
              { label: 'Apple', value: 'Apple' },
              { label: 'Pear', value: 'Pear' },
              { label: 'Orange', value: 'Orange' },
            ]
          }
          label="RadioGroup类型"
          required
        />
        <Password
          name="password"
          rePassword={ true }
          label="密码"
          required
        />
        <Cascader
          name="cascader"
          label="省市级联动"
          options={
            [
              {
                value: 'zhejiang',
                label: 'Zhejiang',
                children: [{
                  value: 'hangzhou',
                  label: 'Hangzhou',
                  children: [{
                    value: 'xihu',
                    label: 'West Lake',
                  }],
                }],
              }, 
              {
                value: 'jiangsu',
                label: 'Jiangsu',
                children: [{
                  value: 'nanjing',
                  label: 'Nanjing',
                  children: [{
                    value: 'zhonghuamen',
                    label: 'Zhong Hua Men',
                  }],
                }],
              }
            ]
          }
          required
        />
        <Button 
          htmlType="submit"
          buttonType="primary" 
        >
          提交
        </Button>
      </FormBuilder>
    );
  }
}

export default Container; 
