import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import LocaleProvider from "antd/lib/locale-provider"
import { 
  testCommonProps, 
  getAntdFormComponentMount,
  getAntdFormItemMount,
} from '../../../../tests/common'
import Password from '../index'

describe('Password',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <Password 
        required
        className="test"
        label="name"
        name="test"
        rePassword={ true }
        min={ 5 }
        max={ 12 }
        value="55"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(Password,"password"); 
  it("min='5' should show success state",function(){
    const wrapper = mount(
      <Password 
        name="test"
        value="111ddd11"
        onlyLetterAndNumber={ false }
        min={ 5 }
      />
    );
    const antdFormItemMount = getAntdFormItemMount(wrapper,"password");
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("min='5' should show error state",function(){
    const wrapper = mount(
      <Password 
        name="test"
        value="11dd"
        onlyLetterAndNumber={ false }
        min={ 6 }
      />
    );
    const antdFormItemMount = getAntdFormItemMount(wrapper,"password");
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("max='5' should show success state",function(){
    const wrapper = mount(
      <Password 
        name="test"
        value="11d1"
        onlyLetterAndNumber={ false }
        max={ 5 }
      />
    );
    const antdFormItemMount = getAntdFormItemMount(wrapper,"password");
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("max='5' should show error state",function(){
    const wrapper = mount(
      <Password 
        name="test"
        onlyLetterAndNumber={ false }
        value="11d11111"
        max={ 5 }
      />
    );
    const antdFormItemMount = getAntdFormItemMount(wrapper,"password");
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("min='2' && max='5' should show success state",function(){
    const wrapper = mount(
      <Password 
        name="test"
        value="1d1"
        onlyLetterAndNumber={ false }
        min={ 2 }
        max={ 5 }
      />
    );
    const antdFormItemMount = getAntdFormItemMount(wrapper,"password");
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("min='2' && max='5' && value='1111111111' should show error state",function(){
    const wrapper = mount(
      <Password 
        name="test"
        value="11111111d11"
        onlyLetterAndNumber={ false }
        min="2"
        max="5"
      />
    );
    const antdFormItemMount = getAntdFormItemMount(wrapper,"password");
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("min='2' && max='5' && value='1' should show error state",function(){
    const wrapper = mount(
      <Password 
        name="test"
        onlyLetterAndNumber={ false }
        value="1"
        min="2"
        max="5"
      />
    );
    const antdFormItemMount = getAntdFormItemMount(wrapper,"password");
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("onlyLetterAndNumber=true should show success state",function(){
    const wrapper = mount(
      <Password 
        name="test"
        value="sddd1111"
        onlyLetterAndNumber={ true }
      />
    );
    const antdFormItemMount = getAntdFormItemMount(wrapper,"password");
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-success");
  })
  it("onlyLetterAndNumber=true should show error state",function(){
    const wrapper = mount(
      <Password 
        name="test"
        value="ddddd"
        onlyLetterAndNumber={ true }
      />
    );
    const antdFormItemMount = getAntdFormItemMount(wrapper,"password");
    expect(antdFormItemMount.childAt(0).childAt(0).props().className).toEqual("ant-form-item-control has-error");
  })
  it("rePassword=true should work",function(){
    const wrapper = mount(
      <Password 
        name="test"
        value="ddddd"
        onlyLetterAndNumber={ true }
        rePassword={ true }
      />
    );
    const antdRePasswordFormItemMount = wrapper.childAt(1).childAt(0).childAt(0).childAt(0);
    //console.log(antdRePasswordFormItemMount.props())
    expect(antdRePasswordFormItemMount.props().title).toEqual("重复密码");
  })
})

