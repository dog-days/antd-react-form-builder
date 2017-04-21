import React from 'react'
import ReactDom from 'react-dom'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import FormBuilderConfiger from '../index'
import util from '../../../util'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import Modal from 'antd/lib/modal'
import AddAndUpdateForm from '../components/AddAndUpdateForm'

const selectSourceDataMap = [
  {
    text: "选择一",
    value: "one",
  },
  {
    text: "选择二",
    value: "two",
  },
];

describe('FormBuilderConfiger',function(){
  sinon.stub(console,"warn");
  sinon.stub(console,"error");
  it('renders correctly', () => {
    const config = [{
      key: 10,
      name: "physics",
      label: "服务器物理属性表",
      type: "object",
      required: true,
      children: [
        {
          key: 1,
          name: "power_num",
          type: "number",
          required: 'true',
          label: "电源个数",
        },
        {
          key: 2,
          name: "rack_digit",
          type: "boolean",
          required: true,
          label: "机架位数",
        },
        {
          key: 3,
          name: "disk_list",
          type: "table",
          required: true,
          label: "硬盘列表",
          children: [
            {
              key: 4,
              name: "brand",
              type: "string",
              required: true,
              label: "硬盘品牌",
            },
            {
              key: 5,
              name: "model",
              type: "string",
              required: true,
              label: "硬盘型号",
            },
          ],
        },
      ]
    } ];
    const wrapper = render(
      <FormBuilderConfiger 
        config={ config }
        selectSourceDataMap={
          selectSourceDataMap
        }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('FormBuilderConfiger.formBuilderConfigAdapter work correctly', () => {
    var config_data = [
      {
        key: 10,
        name: "physics",
        label: "服务器物理属性表",
        type: "table",
        required: true,
        children: [
          {
            key: 4,
            name: "brand",
            type: "string",
            required: true,
            label: "硬盘品牌",
          },
        ],
      }
    ];
    var data = FormBuilderConfiger.formBuilderConfigAdapter(config_data);
    expect(data).toEqual([
      {
        key: 10,
        name: "physics",
        label: "服务器物理属性表",
        type: "table",
        required: true,
        children: [
          [
            {
              key: 4,
              name: "brand",
              type: "string",
              required: true,
              label: "硬盘品牌",
            }
          ],
        ],
      }
    ])
  });
  it("FormBuilderConfiger.create() should work correctly",function(){
    @FormBuilderConfiger.create()
    class DefaultComponent extends React.Component {
      constructor(props){
        super(props);
        this.state = { }
      }

      onConfigerChange = (formBuilderConfigerConfig,formBuilderConfig)=>{
      }

      render(){

        return (
          <span>
            <FormBuilderConfiger 
              onChange={ this.onConfigerChange }
              config={ this.state.config || []}
            />
            <Button
              icon="plus"
              onClick={ this.props.formBuilderConfiger.openAddFieldDialogEvent }
              type="primary"
            />
          </span>
        );
      }
    }
    const wrapper = mount(
      <DefaultComponent />,
    ); 
    const buttonMount = wrapper.childAt(1);
    buttonMount.simulate('click');
    //console.log(wrapper.children())
  })
  it("FormBuilderConfiger of this.outerUpdate should work correctly",function(){
    var config = [
      {
        name: "test",
        label: "dts",
        type: "string",
        array: "false",
        required: "true",
        key: "31897224109"
      }
    ]
    @FormBuilderConfiger.create()
    class DefaultComponent extends React.Component {
      constructor(props){
        super(props);
        this.state = { }
      }

      render(){
        return (
          <FormBuilderConfiger 
            onChange={ this.onConfigerChange }
            config={ this.state.config || []}
          />
        );
      }
    }
    sinon.spy(FormBuilderConfiger.prototype, 'componentWillReceiveProps');
    const wrapper = mount(
      <DefaultComponent />,
    ); 
    wrapper.setState({
      config: config,
    })
    expect(FormBuilderConfiger.prototype.componentWillReceiveProps.calledOnce).toEqual(true);
  })
  
  it("FormBuilderConfiger up should work correctly",function(){
    var config = [
      {
        key: "physics",
        name: "physics",
        label: "服务器物理属性",
        type: "string",
        required: true,
        array: true,
        min: 2,
        max: 3,
      },
      {
        key: "physics2",
        name: "physics2",
        label: "服务器物理属性2",
        type: "boolean",
        required: true,
      },
      {
        key: "physics3",
        name: "physics3",
        label: "服务器物理属性3",
        type: "string",
        required: true,
      },
    ];
    function onConfigerChange(formBuilderConfigerConfig){
      //onChnage测试
      expect(formBuilderConfigerConfig).toEqual([config[1],config[0],config[2]]);
    }
    const wrapper = mount(
      <FormBuilderConfiger 
        onChange={ onConfigerChange }
        config={ config }
      />
    ); 
    var tableRows = wrapper.find("TableRow");
    var secondTableRow = tableRows.at(1);
    expect(secondTableRow.props().record.name).toEqual(config[1].name);
    var up = secondTableRow.find(Icon).at(2);
    up.parent().simulate("click");
  })
  it("FormBuilderConfiger down action should work correctly",function(){
    var config = [
      {
        key: "physics",
        name: "physics",
        label: "服务器物理属性",
        type: "string",
        required: true,
        array: true,
        min: 2,
        max: 3,
      },
      {
        key: "physics2",
        name: "physics2",
        label: "服务器物理属性2",
        type: "boolean",
        required: true,
      },
      {
        key: "physics3",
        name: "physics3",
        label: "服务器物理属性3",
        type: "string",
        required: true,
      },
    ];
    function onConfigerChange(formBuilderConfigerConfig){
      //onChnage测试
      expect(formBuilderConfigerConfig).toEqual([config[0],config[2],config[1]]);
    }
    const wrapper = mount(
      <FormBuilderConfiger 
        onChange={ onConfigerChange }
        config={ config }
      />
    ); 
    var tableRows = wrapper.find("TableRow");
    var secondTableRow = tableRows.at(1);
    expect(secondTableRow.props().record.name).toEqual(config[1].name);
    var down = secondTableRow.find(Icon).at(3);
    down.parent().simulate("click");
  })
  it("FormBuilderConfiger delete action should work correctly",function(){
    var config = [
      {
        key: "physics",
        name: "physics",
        label: "服务器物理属性",
        type: "string",
        required: true,
        array: true,
        min: 2,
        max: 3,
      },
      {
        key: "physics2",
        name: "physics2",
        label: "服务器物理属性2",
        type: "boolean",
        required: true,
      },
      {
        key: "physics3",
        name: "physics3",
        label: "服务器物理属性3",
        type: "string",
        required: true,
      },
    ];
    function onConfigerChange(formBuilderConfigerConfig){
      //onChnage测试
      expect(formBuilderConfigerConfig).toEqual([config[0],config[2]]);
    }
    const wrapper = mount(
      <FormBuilderConfiger 
        onChange={ onConfigerChange }
        config={ config }
      />
    ); 
    var tableRows = wrapper.find("TableRow");
    var secondTableRow = tableRows.at(1);
    expect(secondTableRow.props().record.name).toEqual(config[1].name);
    var delete_btn = secondTableRow.find(Icon).at(1);
    delete_btn.parent().simulate("click");
  })
  it("FormBuilderConfiger edit should work correctly",function(){
    var config = [
      {
        key: "physics",
        name: "physics",
        label: "服务器物理属性",
        type: "string",
        required: true,
        array: true,
        min: 2,
        max: 3,
      },
      {
        key: "physics2",
        name: "physics2",
        label: "服务器物理属性2",
        type: "boolean",
        required: true,
      },
      {
        key: "physics3",
        name: "physics3",
        label: "服务器物理属性3",
        type: "string",
        required: true,
      },
    ];
    const wrapper = mount(
      <FormBuilderConfiger 
        config={ config }
      />
    ); 
    var tableRows = wrapper.find("TableRow");
    var secondTableRow = tableRows.at(1);
    var edit = secondTableRow.find(Icon).at(0);
    //点击edit按钮测试
    edit.parent().simulate("click");
  })
})

