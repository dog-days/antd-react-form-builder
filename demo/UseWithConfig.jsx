import React from 'react'
import {
  FormBuilder,
  Input,
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
import CodeMirror from "react-codemirror"
import "codemirror/mode/javascript/javascript"
import util from "../src/util"
import "codemirror/lib/codemirror.css";

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
        type: "object",
        required: true,
        children: [
          {
            key: util.getUniqueKey(),
            name: "power_num",
            type: "number",
            required: 'true',
            label: "电源个数",
            value: "10",
            read_only: true,
            can_not_delete: true,
          },
          {
            key: util.getUniqueKey(),
            name: "rack_digit",
            type: "boolean",
            value: false,
            required: true,
            label: "机架位数",
          },
          {
            key: util.getUniqueKey(),
            name: "disk_list",
            type: "array",
            required: true,
            label: "硬盘列表",
            children: [
              {
                key: util.getUniqueKey(),
                name: "brand",
                type: "string",
                required: true,
                label: "硬盘品牌",
              },
              {
                key: util.getUniqueKey(),
                name: "model",
                type: "string",
                required: true,
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
      formBuilderConfigerConfig: [
        getData(), 
        //{
          //key: util.getUniqueKey(),
          //name: "model",
          //type: "object",
          //required: true,
          //label: "硬盘型号",
          //children: []
        //},
      ]
    }

    this.state.formBuilderConfig = FormBuilderConfiger.formBuilderConfigAdapter(_.cloneDeep(this.state.formBuilderConfigerConfig));
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

  changeToConfigMode = ()=>{
    var configeMode = !this.state.configeMode; 
    this.setState({
      configeMode,
    })
  }

  onConfigerChange = (formBuilderConfigerConfig,formBuilderConfig)=>{
    //console.debug(formBuilderConfigerConfig,formBuilderConfig)
    this.setState({
      formBuilderConfig,
      formBuilderConfigerConfig,
    })
  }

  onJsonChange = (data)=>{
    try{
      data = JSON.parse(data);
      var formBuilderConfigerConfig = _.cloneDeep(data);
      var formBuilderConfig = FormBuilderConfiger.formBuilderConfigAdapter(
        _.cloneDeep(data)
      )
      this.setState({
        formBuilderConfig,
        formBuilderConfigerConfig,
      });
    }catch(e){
      console.error("json格式有误",e);
    }
  }

  render() {
    //console.debug(this.props)
    let {
      configeMode,
      random,
      formBuilderConfigerConfig,
    } = this.state;
    var text;
    if(!configeMode){
      text = "Json配置模式";
    }else {
      text = "表格配置模式";
    }
    return (
      <div className="demo-view">
        <Card 
          title="表格字段配置"
          className="config-content"
          extra={
            <Button
              size="small"
              onClick={
                this.changeToConfigMode
              }
            >
              { text }
            </Button> 
          }
        >
          {
            configeMode &&
            <CodeMirror 
              options={ {
                mode: "javascript",
                lineNumbers: true,
              }}
              autoSave={ true }
              value={ JSON.stringify(formBuilderConfigerConfig,null,2) }
              onChange={
                this.onJsonChange
              }
            />
          }
          {
            !configeMode &&
            <div>
              <Button
                style={
                  {
                    width: "100%",
                    marginBottom: "20px",
                  }
                }
                onClick={
                  this.props.formBuilderConfiger.openAddFieldDialogEvent
                }
                type="primary"
              >
                <Icon type="plus"/>
              </Button>
              <FormBuilderConfiger 
                onChange={ this.onConfigerChange }
                config={
                  this.state.formBuilderConfigerConfig
                }
                selectSourceDataMap={
                  selectSourceDataMap
                }
              />
            </div>
          }
        </Card>
        <Card
          title="FormBuilder"
          className="form-builder-content"
        >
          <FormBuilder 
            selectSourceData={ selectSourceData }
            onSubmit={ this.handleOnsubmit.bind(this) }
            size="default"
            hasFeedback={ true }
            layout="horizontal" 
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
