import React from 'react'
import {
  FormBuilder,
  Input,
  InputNest,
  InputNumber,
  Select,
  Button,
  TimePicker,
  DatePicker,
  MonthPicker,
  RangePicker,
  CheckboxGroup,
  RadioGroup,
} from '../lib/index'
import fields from "./config"

@FormBuilder.create()
class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    //console.debug(this.props.formBuilder)
    this.props.formBuilder.setFieldsValue({
      number: 1,
      integer: 1.1,
      textarea: "dddddd",
      city: "shenzhen",
    }); 
  }

  handleOnsubmit(e){
    e.preventDefault();
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

  onButtonChange = (value,e)=>{
    console.debug(value)
  }

  render() {
    return (
      <FormBuilder 
        onSubmit={ this.handleOnsubmit.bind(this) }
        size="default"
        hasFeedback={ true }
        horizontal 
      >
        <Input 
          type="text"
          name="text"
          value={
            ["text","text2"]
          }
          array={ true }
          label="text类型"
          rules={
            [
              {
                required: true,
                message: "请不要留空"
              },
            ]
          }
          placeholder="请输入"
        />
        <InputNumber
          type="number"
          name="number"
          step={0.1}
          label="number类型"
          rules={
            [
              {
                required: true,
                message: "请不要留空"
              }
            ]
          }
          placeholder="请输入"
        />
        <InputNumber
          type="integer"
          name="integer"
          label="integer类型"
          rules={
            [
              {
                required: true,
                message: "请不要留空"
              }
            ]
          }
          placeholder="请输入"
        />
        <InputNumber
          type="float"
          name="float"
          step={0.1}
          label="float类型"
          rules={
            [
              {
                required: true,
                message: "请不要留空"
              }
            ]
          }
          placeholder="请输入"
        />
        <Input
          type="email"
          name="email"
          label="email类型"
          rules={
            [
              {
                required: true,
                message: "请不要留空"
              }
            ]
          }
          placeholder="请输入邮箱"
        />
        <Input
          type="url"
          name="url"
          label="url类型"
          rules={
            [
              {
                required: true,
                message: "请不要留空"
              }
            ]
          }
          placeholder="请输入网址"
        />
        <Input
          type="textarea"
          name="textarea"
          label="textarea类型"
          rules={
            [
              {
                required: true,
                message: "请不要留空"
              }
            ]
          }
          placeholder="请输入"
        />
        <Select 
          name="city"
          options={
            [
              {
                text: "深圳",
                value: "shenzhen",
              },
              {
                text: "上海",
                value: "shanghai",
              },
            ]
          }
          label="单选select类型"
          rules={
            [
              {
                required: true,
                message: "请选择城市"
              }
            ]
          }
          placeholder="请选择城市"
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
                    text: "深圳"
                  }
                ] 
              }
            ]
          }
          label="分组select类型"
          rules={
            [
              {
                required: true,
                message: "请选择城市"
              }
            ]
          }
          placeholder="请选择城市"
        />
        <Select 
          name="city3"
          multiple={ true }
          options={
            [
              {
                text: "深圳",
                value: "shenzhen",
              },
              {
                text: "上海",
                value: "shanghai",
              },
            ]
          }
          label="多选select类型"
          rules={
            [
              {
                required: true,
                message: "请选择城市"
              }
            ]
          }
          placeholder="请选择城市"
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
          rules={
            [
              {
                required: true,
                message: "请选择日期"
              }
            ]
          }
          placeholder="请选择日期"
        />
        <MonthPicker
          name="monthpicker"
          value="2017-05"
          label="MonthPicker类型"
          rules={
            [
              {
                required: true,
                message: "请选择月份"
              }
            ]
          }
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
          rules={
            [
              {
                required: true,
                message: "请选择"
              }
            ]
          }
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
          rules={
            [
              {
                required: true,
                message: "请选择"
              }
            ]
          }
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
