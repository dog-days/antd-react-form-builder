import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import moment from 'moment'
import LocaleProvider from 'antd/lib/locale-provider'
import { 
  testCommonProps, 
  getAntdFormComponentMount,
  getAntdFormItemMount,
} from '../../../../tests/common'
import TimePicker from '../index'

describe('TimePicker',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <TimePicker 
        required
        className="test"
        label="name"
        name="test"
        value="10:10:00"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(TimePicker,"timepicker"); 
  it("stirng value should be rendered correctly",function(){
    const wrapper = mount(
      <TimePicker 
        required
        className="test"
        label="name"
        name="test"
        value="15:08:34"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //console.log(antdInputMount.pr)
    expect(antdInputMount.props().value).toEqual(new moment("15:08:34","HH:mm:ss"));
  })
  it("moment value should be rendered correctly",function(){
    const wrapper = mount(
      <TimePicker 
        required
        className="test"
        label="name"
        name="test"
        value={ new moment("15:08:34","HH:mm:ss") }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //console.log(antdInputMount.pr)
    expect(antdInputMount.props().value).toEqual(new moment("15:08:34","HH:mm:ss"));
  })
  it("should have hidden <Input /> ",function(){
    var value = new moment("15:08:34","HH:mm:ss");
    const wrapper = mount(
      <TimePicker 
        required
        className="test"
        label="name"
        name="test"
        value={ value }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //console.log(antdInputMount.pr)
    expect(wrapper.childAt(1).props().value).toEqual(Math.floor(+value / 1000));
    expect(wrapper.childAt(1).props().name).toEqual('test');
  })
})

