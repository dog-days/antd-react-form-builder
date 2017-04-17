import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import LocaleProvider from "antd/lib/locale-provider"
import { 
  testCommonProps, 
  getAntdFormComponentMount,
  getAntdFormItemMount,
} from '../../../../tests/common'
import RadioGroup from '../index'

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

describe('RadioGroup',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <RadioGroup 
        required
        className="test"
        label="name"
        name="test"
        options={ options }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(RadioGroup); 
  it("should have three <Radio />",function(){
    const wrapper = mount(
      <RadioGroup 
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
})

