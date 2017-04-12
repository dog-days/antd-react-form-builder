import React from "react"
import { shallow,mount,render } from "enzyme"
import sinon from "sinon"
import LocaleProvider from "antd/lib/locale-provider"
import moment from 'moment'
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
} from '../../../index'

//获取Mount的ant表单组件
function getAntdFormComponentMount(mountComponent){
  return mountComponent.childAt(0).childAt(0).childAt(0).childAt(0);
}
//获取Mount的antd FromItem
function getAntdFormItemMount(mountComponent){
  return mountComponent.childAt(0).childAt(0);
}

function renderFormBuilder(props,children,isRender){
  const handleOnsubmit = sinon.spy();
  var fn = mount;
  if(isRender){
    fn = render;
  }
  const wrapperMount = fn(
    <FormBuilder 
      onSubmit={ handleOnsubmit }
      { ...props }
    > 
      { children }
    </FormBuilder>
  );
  return wrapperMount;
}

describe("<FormBuilder />",function(){
  const component = (
    <span>
      <Input />
      <Input 
        name="test"
      />
      <Input 
        label="name"
        name="test"
      />
      <Input 
        required
        label="name"
        name="test"
      />
      <Input 
        required
        className="test"
        label="name"
        name="test"
      />
    </span>
  ) 
  const wrapperRender = renderFormBuilder({
    size: "small",
  }, component,true) 
  const wrapperMount = renderFormBuilder({
    size: "small",
  }, component) 
  it('FormBuilder renders correctly', () => {
    expect(wrapperRender).toMatchSnapshot();
  });
  it("The all rendered <Input />'s length should be equal",function(){
    expect(wrapperMount.find(Input)).toHaveLength(5);
  })
  //上面span组件Mount对象antInputMount
  var spanChildMount = wrapperMount.childAt(0);
  var inputMount = spanChildMount.childAt(0);
  var antdInputMount = getAntdFormComponentMount(inputMount);
  var antdFormItemMount = getAntdFormItemMount(inputMount);
  console.log(antdFormItemMount.props())
  it("The first rendered <Input /> should not have props",function(){
    expect(inputMount.props()).toEqual({ });
    expect(antdInputMount.props().name).toEqual(undefined);
  })
  var inputMount1 = spanChildMount.childAt(1);
  var antdInputMount1 = getAntdFormComponentMount(inputMount1);
  it("The second rendered <Input /> props.name should equal 'test'",function(){
    expect(inputMount1.props()).toEqual({ name: "test" });
    expect(antdInputMount1.props().name).toEqual("test");
  })
})



