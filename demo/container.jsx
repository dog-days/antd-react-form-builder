import React from 'react'
import {
  FormBuilder,
  Input,
  InputNumber,
  Select,
  Button as FButton,
  TimePicker,
} from '../lib/index'
import { 
  LocaleProvider,
  Button,
  Form,
  Tabs 
} from 'antd'
import moment from 'moment'
import "antd/dist/antd.css"
import feilds from "./config"

//begin国际化处理
import AntdEnUS from 'antd/lib/locale-provider/en_US'
import FormBuilderEnUS from '../lib/locale-provider/es_US'
import 'moment/locale/zh-cn'

moment.locale('en');
  //整合Antd和FormBuilder的国际化语言
let enUS = Object.assign({},AntdEnUS,FormBuilderEnUS)
//end国际化处理
let TabPane = Tabs.TabPane; 

export default class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      locale: enUS,
      config: {
        "feilds": [
          feilds.text,
          feilds.hidden,
          feilds.email,
          feilds.url,
          feilds.textarea,
          feilds.number,
          feilds.singleSelect,
          feilds.groupSelect,
          feilds.multipleSelect,
          feilds.timePicker,
          feilds.button,
        ]
      }
    }
  }

  handleOnsubmit(e,err,values){
    e.preventDefault();
    console.debug('表单值: ', values);
    if(err){
      console.debug("表单错误",err)
      return; 
    }
  }

  render() {
    return (
      <div>
        <div style={ { padding: "20px" } }>
          <Tabs defaultActiveKey="2">
            <TabPane tab="配置生成表单" key="1">
              <LocaleProvider
                locale={ this.state.locale }
              >
                <FormBuilder 
                  onSubmit={ this.handleOnsubmit }
                  size="default"
                  hasFeedback={ true }
                  horizontal 
                  config={ this.state.config }
                >
                  <Form.Item>
                    <Button 
                      style={
                        {
                          float: "right"
                        }
                      }
                      type="primary"
                      size="default"
                      htmlType="submit"
                    >
                      提交按钮2
                    </Button>
                  </Form.Item>
                </FormBuilder>
              </LocaleProvider>
            </TabPane>
            <TabPane tab="直接使用JSX" key="2">
              <FormBuilder 
                onSubmit={ this.handleOnsubmit }
                size="default"
                hasFeedback={ false }
                horizontal 
              >
                <Input 
                  type="text" 
                  name="text"
                  rules={ 
                    [
                      {
                        "required": true,
                        "message": "请不要留空"
                      }
                    ]
                  }
                  value="ddd"
                  placeholder="请输入！"
                />
                <Input 
                  type="email" 
                  name="email"
                  placeholder="请输入邮箱"
                />
              </FormBuilder>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}


