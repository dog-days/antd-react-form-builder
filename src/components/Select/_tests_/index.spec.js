import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import LocaleProvider from "antd/lib/locale-provider"
import { 
  testCommonProps, 
  getAntdFormComponentMount,
  getAntdFormItemMount,
} from '../../../../tests/common'
import Select from '../index'

var options = [
  {
    value: "shenzhen",
    label: "深圳"
  },
  {
    value: "beijing",
    label: "北京"
  },
  {
    value: "hangzhou",
    label: "hangzhou"
  },
];
var group = [
  {
    label: "广东省",
    options: [
      {
        value: "shenzen",
        label: "深圳"
      }
    ] 
  }
];

describe('Select',function(){
  sinon.stub(console,"warn");
  it('1 renders correctly', () => {
    const wrapper = render(
      <Select 
        required
        className="test"
        label="name"
        name="test"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('2 renders correctly', () => {
    const wrapper = render(
      <Select 
        required
        className="test"
        label="name"
        name="test"
        boolean={ true }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('3 renders correctly', () => {
    const wrapper = render(
      <Select 
        required
        className="test"
        label="name"
        name="test"
        options={ options }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('4 renders correctly', () => {
    const wrapper = render(
      <Select 
        required
        className="test"
        label="name"
        name="test"
        options={ options }
        mutiple={true}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('5 renders correctly', () => {
    const wrapper = render(
      <Select 
        required
        className="test"
        label="name"
        name="test"
        group={ group }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(Select); 
  it("props.boolean=true should have two <Option />",function(){
    const wrapper = mount(
      <Select 
        required
        name="test"
        label="label"
        boolean={ true }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdInputMount.props().children.length).toEqual(2);
  })
  it("should have three <Option />",function(){
    const wrapper = mount(
      <Select 
        required
        name="test"
        label="label"
        options={ options }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdInputMount.props().children.length).toEqual(3);
  })
  it("should have one <Group />",function(){
    const wrapper = mount(
      <Select 
        required
        name="test"
        label="label"
        group={ group }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdInputMount.props().children.length).toEqual(1);
  })
})

