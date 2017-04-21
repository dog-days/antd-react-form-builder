import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import util from '../../../util'
import FormBuilder from '../index'
import Input from '../../Input'
import Button from 'antd/lib/button'

function renderFormBuilder(props,children,isRender){
  const handleOnsubmit = sinon.spy();
  var fn = mount;
  if(isRender){
    fn = render;
  }
  const wrapperMount = fn(
    <FormBuilder 
      { ...props }
    > 
      { children }
    </FormBuilder>
  );
  return wrapperMount;
}
function getAntdFormItemMount(mountComponent,type){
  return mountComponent.childAt(0).childAt(0);
}
function getAntdFormComponentMount(mountComponent){
  return mountComponent.childAt(0).childAt(0).childAt(1).childAt(0).childAt(0);
}

describe('FormBuilder',function(){
  sinon.stub(console,"warn");
  it("render correctly",function(){
    const wrapper = renderFormBuilder(
      { 
        size: "small",
        hasFeedback: true,
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 20,
        }
      },
      <Input 
        required
        name="test"
        type="text"
        label="label"
      />,
      true
    );
    expect(wrapper).toMatchSnapshot();
  })
  it("props.config render correctly",function(){
    const config = [
      {
        name: "test",
        type: "text",
      },
      {
        name: "test1",
        type: "url",
      },
      {
        name: "test2",
        type: "email",
      },
      {
        name: "test3",
        type: "phone",
      },
      {
        name: "test4",
        type: "textarea",
      },
      {
        name: "test5",
        type: "hidden",
      },
      {
        name: "test6",
        type: "number",
      },
      {
        name: "test7",
        type: "float",
      },
      {
        name: "test8",
        type: "integer",
      },
      {
        name: "test9",
        type: "select",
      },
      {
        name: "test10",
        type: "time",
      },
      {
        name: "test11",
        type: "time-picker",
      },
      {
        name: "test12",
        type: "date",
      },
      {
        name: "test13",
        type: "date-picker",
      },
      {
        name: "test14",
        type: "month",
      },
      {
        name: "test15",
        type: "month-picker",
      },
      {
        name: "test16",
        type: "range",
      },
      {
        name: "test17",
        type: "range-picker",
      },
      {
        name: "test18",
        type: "checkbox-group",
      },
      {
        name: "test19",
        type: "radio-group",
      },
      {
        name: "test20",
        type: "password",
      },
      {
        name: "test21",
        type: "cascader",
      },
    ]
    const wrapper = renderFormBuilder(
      { 
        config: config,
      },
      false,
      true
    );
    expect(wrapper).toMatchSnapshot();
  })
  it("size='small' should work",function(){
    const wrapper = renderFormBuilder(
      { 
        size: "small",
      },
      <Input 
        name="test"
        type="text"
        label="label"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    expect(antdInputMount.props().size).toEqual("small");
  })
  it("size='default' should work",function(){
    const wrapper = renderFormBuilder(
      { 
        size: "default",
      },
      <Input 
        name="test"
        type="text"
        label="label"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    expect(antdInputMount.props().size).toEqual("default");
  })
  it("size='large' should work",function(){
    const wrapper = renderFormBuilder(
      { 
        size: "large",
      },
      <Input 
        name="test"
        type="text"
        label="label"
      />
    );
    const antdInputMount = getAntdFormComponentMount(wrapper);
    expect(antdInputMount.props().size).toEqual("large");
  })
  it("hasFeedback=true should work",function(){
    const wrapper = renderFormBuilder(
      { 
        hasFeedback: true,
      },
      <Input 
        required
        name="test"
        type="text"
        label="label"
        value="test"
      />
    );
    var feedbackMount = wrapper.childAt(0).childAt(0).childAt(1).childAt(0);
    expect(feedbackMount.props().className).toEqual("ant-form-item-control has-feedback has-success");
  })
  it("labelCol && wrapperCol should work",function(){
    const wrapper = renderFormBuilder(
      { 
        hasFeedback: true,
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 20,
        }
      },
      <Input 
        required
        name="test"
        type="text"
        label="label"
        value="test"
      />
    );
    var antdFormItemMount = getAntdFormItemMount(wrapper);
    expect(antdFormItemMount.props().labelCol).toEqual({
      span: 4,
    });
    expect(antdFormItemMount.props().wrapperCol).toEqual({
      span: 20,
    });
  })
  it("this.props.formBuilder.setFieldsValue should work",function(){
    @FormBuilder.create()
    class DefaultComponent extends React.Component {
      componentDidMount(){
        this.props.formBuilder &&
        this.props.formBuilder.setFieldsValue({
          test: "test",
        }); 
      }
      submit = (e)=>{
        this.props.formBuilder &&
        this.props.formBuilder.validateFields((err, values) => {
          expect(!!err).toBe(true); 
        });
      }
      render(){
        return (
          <FormBuilder 
            hasFeedback={ true }
          >
            <Input 
              required
              name="test"
              type="text"
              label="label"
            />
            <Input 
              required
              name="name"
              type="text"
              label="label"
            />
            <Button
              onClick={ this.submit }
              htmlType="submit"
            >
              提交
            </Button>
          </FormBuilder>
        );
      }
    }
    const wrapper = mount(
      <DefaultComponent />   
    ); 
    const antdInputMount = getAntdFormComponentMount(wrapper);
    const buttonMount = wrapper.childAt(2);
    expect(antdInputMount.props().value).toEqual("test");
    buttonMount.simulate('click');
  })
  it("FormBuilder.valuesToConfig should work correctly",function(){
    var config = [{
      name: "physics",
      label: "服务器物理属性表",
      type: "object",
      required: true,
      children: [
        {
          name: "power_num",
          type: "number",
          required: 'true',
          label: "电源个数",
        },
        {
          name: "rack_digit",
          type: "boolean",
          required: true,
          label: "机架位数",
        },
        {
          name: "disk_list",
          type: "table",
          required: true,
          label: "硬盘列表",
          children: [
            [
              {
                name: "brand",
                type: "string",
                required: true,
                label: "硬盘品牌",
              },
              {
                name: "model",
                type: "string",
                required: true,
                label: "硬盘型号",
              },
            ]
          ],
        },
      ]
    }];
    @FormBuilder.create()
    class DefaultComponent extends React.Component {
      constructor(props){
        super(props);
        this.data = {
          physics: {
            disk_list: [
              {
                brand: "lenovo",
                model: "t210"
              },
              {
                brand: "lenovo2",
                model: "t212"
              },
            ],
            rack_digit: "10",
            power_num: "10",
          }
        };
        this.state = {
          formBuilderConfig: FormBuilder.valuesToConfig(config,this.data),
        };
      }
      submit = (e)=>{
        this.props.formBuilder &&
        this.props.formBuilder.validateFields((err, values) => {
          expect(values).toEqual(this.data); 
        });
      }

      render(){
        return (
          <FormBuilder 
            hasFeedback={ true }
            config={ this.state.formBuilderConfig }
          >
            <Button
              onClick={ this.submit }
              htmlType="submit"
            >
              提交
            </Button>
          </FormBuilder>
        );
      }
    }
    const wrapper = mount(
      <DefaultComponent />   
    ); 
    //console.log(wrapper.props)
    const buttonMount = wrapper.childAt(1);
    buttonMount.simulate('click');
  })
})

