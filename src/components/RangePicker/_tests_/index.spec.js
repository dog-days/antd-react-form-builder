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
import RangePicker from '../index'

describe('RangePicker',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <RangePicker 
        required
        className="test"
        label="name"
        name="test"
        value={
          ["2016-04-05 00:00:00","2016-04-05 00:00:00"]
        }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  testCommonProps(RangePicker); 
  it("stirng value should be rendered correctly",function(){
    const wrapper = mount(
      <RangePicker 
        required
        className="test"
        label="name"
        name="test"
        value={
          ["2016-04-05","2016-04-05"]
        }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    //console.log(antdInputMount.pr)
    expect(antdInputMount.props().value).toEqual(
      [new moment("2016-04-05","YYYY-MM-DD"),new moment("2016-04-05","YYYY-MM-DD")]
    );
  })
  it("moment value should be rendered correctly",function(){
    var value = [new moment("2016-04-05","YYYY-MM-DD"),new moment("2016-04-05","YYYY-MM-DD")]
    const wrapper = mount(
      <RangePicker 
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
    expect(antdInputMount.props().value).toEqual(value);
  })
  it("should have hidden <Input /> ",function(){
    var value = [new moment("2016-04-05","YYYY-MM-DD"),new moment("2016-04-05","YYYY-MM-DD")]
    const wrapper = mount(
      <RangePicker 
        required
        className="test"
        label="name"
        name="test"
        value={ value }
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper,1);
    const antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(wrapper.childAt(1).childAt(0).props().value).toEqual(Math.floor(+value[0] / 1000));
    expect(wrapper.childAt(2).childAt(0).props().value).toEqual(Math.floor(+value[1] / 1000));
    //expect(wrapper.childAt(1).props().name).toEqual('test');
  })
})

