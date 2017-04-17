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
import MonthPicker from '../index'

describe('MonthPicker',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <MonthPicker 
        required
        className="test"
        label="name"
        name="test"
        value="2016-04"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(MonthPicker); 
  it("stirng value should be rendered correctly",function(){
    const wrapper = mount(
      <MonthPicker 
        required
        className="test"
        label="name"
        name="test"
        value="2016-04"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //console.log(antdInputMount.pr)
    expect(antdInputMount.props().value).toEqual(new moment("2016-04","YYYY-MM"));
  })
  it("moment value should be rendered correctly",function(){
    const wrapper = mount(
      <MonthPicker 
        required
        className="test"
        label="name"
        name="test"
        value={ moment("2016-04") }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //console.log(antdInputMount.pr)
    expect(antdInputMount.props().value).toEqual(moment("2016-04"));
  })
  it("should have hidden <Input /> ",function(){
    var value = new moment("2016-04");
    const wrapper = mount(
      <MonthPicker 
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

