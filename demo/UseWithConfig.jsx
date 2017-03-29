import React from 'react'
import {
  FormBuilder,
  Input,
  InputNest,
  InputNumber,
  Select,
  TimePicker,
} from '../lib/index'
import serialize from "form-serialize" 
import FormBuilderConfiger from "../src/components/FormBuilderConfiger" 
import { 
  Card, 
  Button, 
  Icon, 
} from 'antd'
import feilds from "./config"
import util from "../src/util"
import "../style/css/demo.scss"

let selectSourceDataMap = [
  {
    text: "选择一",
    value: "one",
  },
  {
    text: "选择二",
    value: "two",
  },
];
let selectSourceData = {
  one: [
    {
      value: 1,
      text: "1",
    },
    {
      value: 2,
      text: "2",
    },
    {
      value: 3,
      text: "3",
    },
  ],
  two: [
    {
      value: 4,
      text: "4",
    },
    {
      value: 5,
      text: "5",
    },
    {
      value: 6,
      text: "6",
    },
  ],
}

@FormBuilderConfiger.create()
@FormBuilder.create()
class Container extends React.Component {
  constructor(props){
    super(props);
    function getData(){
      var data = {
        key: util.getUniqueKey(),
        name: "physics",
        label: "服务器物理属性表",
        data_type: "object",
        required: "1",
        children: [
          {
            key: util.getUniqueKey(),
            name: "power_num",
            data_type: "number",
            required: "1",
            label: "电源个数",
            value: "10",
            read_only: "1",
            can_not_delete: "1",
          },
          {
            key: util.getUniqueKey(),
            name: "rack_digit",
            data_type: "number",
            required: "1",
            label: "机架位数",
          },
          {
            key: util.getUniqueKey(),
            name: "dist_list",
            data_type: "array",
            required: "1",
            label: "硬盘列表",
            children: [
              {
                key: util.getUniqueKey(),
                name: "brand",
                data_type: "string",
                required: "1",
                label: "硬盘品牌",
              },
              {
                key: util.getUniqueKey(),
                name: "model",
                data_type: "string",
                required: "1",
                label: "硬盘型号",
              },
            ],
          },
        ]
      }
      return data;
    }
    this.state = {
      config: [
        feilds.text,
      ],
      table: [
        getData(), 
        //{
          //key: util.getUniqueKey(),
          //name: "model",
          //data_type: "object",
          //required: "1",
          //label: "硬盘型号",
          //children: []
        //},
      ]
    }

    this.state.formBuilderConfig = FormBuilderConfiger.formBuilderConfigAdapter(_.cloneDeep(this.state.table));
  }

  handleOnsubmit(e){
    e.preventDefault();
    this.props.formBuilder.validateFields((err,values)=>{
      if(err){
        console.debug("handleOnsubmit",err)
      }else {
        console.debug("handleOnsubmit",values)
      }
    }) 
  }

  onConfigerChange = (data)=>{
    var config = FormBuilderConfiger.formBuilderConfigAdapter(_.cloneDeep(data));
    this.setState({
      formBuilderConfig: config,
    })
    //console.debug(config)
  }

  render() {
    //console.debug(this.props)
    return (
      <div className="demo-view">
        <Card 
          title="表格字段配置"
          className="config-content"
          extra={
            <Button
              onClick={
                this.props.formBuilderConfiger.openAddFieldDialogEvent
              }
            >
              <Icon type="plus"/>
            </Button>
          }
        >
          <FormBuilderConfiger 
            hasNoneTableTitle={ true }
            onChange={ this.onConfigerChange }
            config={
              this.state.table
            }
            title="表格字段配置"
            selectSourceDataMap={
              selectSourceDataMap
            }
          />
        </Card>
        <Card
          title="FromBuilder"
          className="form-builder-content"
        >
          <FormBuilder 
            selectSourceData={ selectSourceData }
            onSubmit={ this.handleOnsubmit.bind(this) }
            size="default"
            hasFeedback={ true }
            horizontal
            config={ this.state.formBuilderConfig }
          >    
            {
              this.state.formBuilderConfig &&
              <Button
                type="primary"
                htmlType="submit"
              >
                提交
              </Button>
            }
          </FormBuilder>
        </Card>
      </div>
    );
  }
}

export default Container; 
