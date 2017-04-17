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
import DatePicker from '../index'

describe('DatePicker',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <DatePicker 
        required
        className="test"
        label="name"
        name="test"
        value={
          moment("2016-04-14","YYYY-MM-DD").utc()
        }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(DatePicker); 
  it("stirng value should be rendered correctly",function(){
    const wrapper = mount(
      <DatePicker 
        required
        className="test"
        label="name"
        name="test"
        value="2016-04-14"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //console.log(antdInputMount.pr)
    expect(antdInputMount.props().value).toEqual(new moment("2016-04-14","YYYY-MM-DD"));
  })
  it("moment value should be rendered correctly",function(){
    const wrapper = mount(
      <DatePicker 
        required
        className="test"
        label="name"
        name="test"
        value={ moment("2016-04-14") }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //console.log(antdInputMount.pr)
    expect(antdInputMount.props().value).toEqual(moment("2016-04-14"));
  })
  it("should have hidden <Input /> ",function(){
    var value = new moment("2016-04-14");
    const wrapper = mount(
      <DatePicker 
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

