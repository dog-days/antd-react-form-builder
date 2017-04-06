import React from 'react'
import moment from 'moment'
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
  LocaleProvider,
  Card, 
  Button, 
  Icon, 
} from 'antd'
import feilds from "./config"
import util from "../src/util"
import "../style/css/demo.scss"

//begin国际化处理
import AntdEnUS from 'antd/lib/locale-provider/en_US'
import FormBuilderEnUS from '../lib/locale-provider/es_US'
moment.locale('en');
//整合Antd和FormBuilder的国际化语言
let enUS = Object.assign({},AntdEnUS,FormBuilderEnUS)
//end国际化处理

@FormBuilderConfiger.create()
@FormBuilder.create()
class Locale extends React.Component {
  constructor(props){
    super(props);
    function getData(){
      var data = {
        key: util.getUniqueKey(),
        name: "physics",
        label: "Physics Config Table",
        type: "object",
        required: true,
        children: [
          {
            key: util.getUniqueKey(),
            name: "power_num",
            type: "number",
            required: 'true',
            label: "Power Num",
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
            label: "Rack Digit",
          },
          {
            key: util.getUniqueKey(),
            name: "disk_list",
            type: "array",
            required: true,
            label: "disk List",
            children: [
              {
                key: util.getUniqueKey(),
                name: "brand",
                type: "string",
                required: true,
                label: "disk Brand",
              },
              {
                key: util.getUniqueKey(),
                name: "model",
                type: "string",
                required: true,
                label: "disk Model",
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
      ]
    }

    this.state.formBuilderConfig = FormBuilderConfiger.formBuilderConfigAdapter(
      _.cloneDeep(this.state.formBuilderConfigerConfig)
    );
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

  onConfigerChange = (formBuilderConfigerConfig,formBuilderConfig)=>{
    //console.debug(formBuilderConfigerConfig,formBuilderConfig)
    this.setState({
      formBuilderConfig,
      formBuilderConfigerConfig,
    })
  }

  render() {
    //console.debug(this.props)
    return (
      <LocaleProvider
        locale={ enUS }
      >
        <div className="demo-view">
          <Card 
            title="Table Fields Config"
            className="config-content"
            extra={
              <Button
                size="small"
                onClick={
                  this.props.formBuilderConfiger.openAddFieldDialogEvent
                }
              >
                <Icon type="plus"/>
              </Button>
            }
          >
            <FormBuilderConfiger 
              onChange={ this.onConfigerChange }
              config={
                this.state.formBuilderConfigerConfig
              }
            />
          </Card>
          <Card
            title="FromBuilder"
            className="form-builder-content"
          >
            <FormBuilder 
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
      </LocaleProvider>
    );
  }
}

export default Locale; 
