import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import LocaleProvider from "antd/lib/locale-provider"
import { 
  testCommonProps, 
  getAntdFormComponentMount,
  getAntdFormItemMount,
} from '../../../../tests/common'
import CheckboxGroup from '../index'

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

describe('CheckboxGroup',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <CheckboxGroup 
        required
        className="test"
        label="name"
        name="test"
        options={ options }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(CheckboxGroup); 
  it("props.options should equal options variable above",function(){
    const wrapper = mount(
      <CheckboxGroup 
        required
        name="test"
        label="label"
        options={ options }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdInputMount.props().options).toEqual(options);
  })
})

