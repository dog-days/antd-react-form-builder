import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import LocaleProvider from "antd/lib/locale-provider"
import { 
  testCommonProps, 
  getAntdFormComponentMount,
  getAntdFormItemMount,
} from '../../../../tests/common'
import InputNumber from '../index'

describe('InputNumber',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <InputNumber 
        required
        className="test"
        label="name"
        name="test"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(InputNumber); 
  it("type='undefined' and value='ddd'，result value should be NaN",function(){
    const wrapper = mount(
      <InputNumber 
        name="test"
        value="ddd"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdInputMount.props().value).toEqual(NaN);
  })
  it("type='number' and value='ddd'，result value should be NaN",function(){
    const wrapper = mount(
      <InputNumber 
        name="test"
        value="ddd"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdInputMount.props().value).toEqual(NaN);
  })
  it("type='integer' should show error state",function(){
    const wrapper = mount(
      <InputNumber 
        name="test"
        type="integer"
        value="1.1"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("type='integer' should show success state",function(){
    const wrapper = mount(
      <InputNumber 
        name="test"
        type="integer"
        value="1"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("type='float' should show error state",function(){
    const wrapper = mount(
      <InputNumber 
        name="test"
        type="float"
        value="1"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("type='float' should show success state",function(){
    const wrapper = mount(
      <InputNumber 
        name="test"
        type="float"
        value="1.1"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
})

