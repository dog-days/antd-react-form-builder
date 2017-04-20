import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import { 
  testCommonProps, 
  getAntdFormComponentMount,
  getAntdFormItemMount,
} from '../../../../tests/common'
import Cascader from '../index'

var options = [
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
];

describe('Cascader',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <Cascader 
        required
        className="test"
        label="name"
        name="test"
        options={ options }
        value={
          ["jiangsu","nanjing","zhonghuamen"]
        }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(Cascader); 
  it("should have hidden <Input /> ",function(){
    const wrapper = mount(
      <Cascader 
        required
        className="test"
        label="name"
        name="test"
        value={
          ["jiangsu","nanjing","zhonghuamen"]
        }
      />
    );
    expect(wrapper.childAt(1).childAt(0).props().name).toEqual("test");
    expect(wrapper.childAt(2).childAt(0).props().name).toEqual("test");
    expect(wrapper.childAt(3).childAt(0).props().name).toEqual("test");
  })
})

