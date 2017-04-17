import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import LocaleProvider from "antd/lib/locale-provider"
import { 
  testCommonProps, 
  getAntdFormComponentMount,
  getAntdFormItemMount,
} from '../../../../tests/common'
import Input from '../index'

describe('Input',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <Input 
        required
        className="test"
        label="name"
        name="test"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(Input); 
  it("type='url' should show error state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="url"
        value="test"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("type='url' should show success state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="url"
        value="http://www.github.com/"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("type='email' should show error state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="email"
        value="test"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("type='email' should show success state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="email"
        value="xianshannan@qq.com"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("type='phone' should show error state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="phone"
        value="111"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("type='phone' should show success state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="phone"
        value="15989350865"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("type='textarea' should work",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="textarea"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdInputMount.props().type).toEqual("textarea");
  })
  it("type='hidden' should work",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="hidden"
      />
    );
    expect(wrapper.props().type).toEqual("hidden");
  })
  it("min='5' should show success state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="text"
        value="111111"
        min={ 5 }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //有label时，className="ant-form-item-label"
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("min='5' should show error state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="text"
        value="111"
        min={ 6 }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("max='5' should show success state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="text"
        value="111"
        max={ 5 }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("max='5' should show error state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="text"
        value="1111111"
        max={ 5 }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("min='2' && max='5' should show success state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="text"
        value="111"
        min={ 2 }
        max={ 5 }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("min='2' && max='5' && value='1111111111' should show error state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="text"
        value="1111111111"
        min="2"
        max="5"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("min='2' && max='5' && value='1' should show error state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="text"
        value="1"
        min="2"
        max="5"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("onlyLetter=true should show success state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="text"
        value="sdd"
        onlyLetter={ true }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("onlyLetter=true should show error state",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="text"
        value="取值"
        onlyLetter={ true }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("array=true should work",function(){
    const wrapper = mount(
      <Input 
        name="test"
        type="text"
        array={ true }
        value={
          [2,3]
        }
      />
    );
    expect(wrapper.childAt(0).childAt(0).props().children.length).toEqual(2);
  })
})

