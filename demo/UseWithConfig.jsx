import React from 'react'
import {
  FormBuilder,
  Input,
  InputNest,
  InputNumber,
  Select,
  Button,
  TimePicker,
} from '../lib/index'
import serialize from "form-serialize" 
import FormBuilderConfiger from "../src/components/FormBuilderConfiger" 
import { Card } from 'antd'
import feilds from "./config"
import util from "../src/util"
import "../style/css/demo.scss"

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
  }

  handleOnsubmit(e){
    e.preventDefault();
    var obj = serialize(e.target, { hash: true });
    console.debug(obj)
  }

  onConfigerChange = (data)=>{
    var config = FormBuilderConfiger.formBuilderConfigAdapter(data);
    this.setState({
      formBuilderConfig: config,
    })
    console.debug(config);
  }

  render() {
    return (
      <div className="demo-view">
        <Card className="config-content">
          <FormBuilderConfiger 
            onChange={ this.onConfigerChange }
            defaultConfig={
              this.state.table
            }
          />
        </Card>
        <Card
          className="form-builder-content"
        >
          <FormBuilder 
            onSubmit={ this.handleOnsubmit.bind(this) }
            size="default"
            hasFeedback={ true }
            horizontal
            config={ this.state.formBuilderConfig }
          >    
            {
              this.state.formBuilderConfig &&
              <Button
                buttonType="primary"
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
