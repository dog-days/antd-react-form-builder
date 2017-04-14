import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import LocaleProvider from "antd/lib/locale-provider"

export function renderFormBuilder(props,children,isRender){
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
//获取Mount的ant表单组件
//index有label为1，无label为0
export function getAntdFormComponentMount(mountComponent,index=0,type){
  if(type === "password"){
    return mountComponent.childAt(0).childAt(0).childAt(index).childAt(0).childAt(0);
  }
  return mountComponent.childAt(0).childAt(index).childAt(0).childAt(0);
}
//获取Mount的antd FromItem
export function getAntdFormItemMount(mountComponent,type){
  if(type === "password"){
    return mountComponent.childAt(0).childAt(0);
  }
  return mountComponent.childAt(0);
}

export function testCommonProps(Component,type){
  it("should not have props",function(){
    const wrapper = mount(
      <Component />
    );
    //console.log(wrapper.props())
    const antdInputMount = getAntdFormComponentMount(wrapper,0,type);
    const antdFormItemMount = getAntdFormItemMount(wrapper,type);
    expect(wrapper.props()).toEqual({ });
    expect(antdInputMount.props().name).toEqual(undefined);
    //无label时，className="ant-form-item-control-wrapper"
    expect(antdFormItemMount.childAt(0).props().className).toEqual("ant-form-item-control-wrapper");
    expect(antdInputMount.props().required).toEqual(undefined);
  })
  it("props.name should work",function(){
    const wrapper = mount(
      <Component 
        name="test"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,0,type);
    const antdFormItemMount = getAntdFormItemMount(wrapper,type);
    expect(wrapper.props()).toEqual({ name: "test" });
    if(type !== "timepicker"){
      expect(antdInputMount.props().name).toEqual("test");
    }else {
      expect(antdInputMount.props().name).toEqual(undefined);
    }
  })
  it("props.label should work",function(){
    const wrapper = mount(
      <Component 
        name="test"
        label="label"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1,type);
    const antdFormItemMount = getAntdFormItemMount(wrapper,type);
    expect(wrapper.props()).toEqual(
      { 
        name: "test", 
        label: "label", 
      }
    );
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).props().className).toEqual("ant-form-item-label");
  })
  it("props.required should work",function(){
    const wrapper = mount(
      <Component 
        required
        name="test"
        label="label"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1,type);
    const antdFormItemMount = getAntdFormItemMount(wrapper,type);
    expect(wrapper.props()).toEqual(
      { 
        name: "test", 
        label: "label", 
        required: true,
      }
    );
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-required");
  })
  it("props.rules should work",function(){
    const wrapper = mount(
      <Component 
        rules={
          [
            { required: true, message:"input is required" }
          ]
        }
        name="test"
        label="label"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1,type);
    const antdFormItemMount = getAntdFormItemMount(wrapper,type);
    if(type !== "password"){
      expect(wrapper.props()).toEqual(
        { 
          name: "test", 
          label: "label", 
          rules: [
            { required: true,message:"input is required" }
          ]
        }
      );
    }else {
      expect(wrapper.props().rules[0]).toEqual(
        { required: true,message:"input is required" }
      );
    }
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-required");
  })
  it("props.className should work",function(){
    const wrapper = mount(
      <Component 
        required
        name="test"
        label="label"
        className="test"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1,type);
    const antdFormItemMount = getAntdFormItemMount(wrapper,type);
    expect(wrapper.props()).toEqual(
      { 
        name: "test", 
        label: "label", 
        required: true,
        className: "test",
      }
    );
    //有label时，className="ant-form-item-label"
    expect(antdInputMount.props().className).toEqual("test");
  })
}
