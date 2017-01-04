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
import UseWithConfig from "./UseWithConfig"
import { 
  LocaleProvider,
  Tabs 
} from 'antd'
import moment from 'moment'
import feilds from "./config"
import "antd/dist/antd.css"
import "../style/css/style.scss"

//begin国际化处理
import AntdEnUS from 'antd/lib/locale-provider/en_US'
import FormBuilderEnUS from '../lib/locale-provider/es_US'
import 'moment/locale/zh-cn'

moment.locale('en');
  //整合Antd和FormBuilder的国际化语言
let enUS = Object.assign({},AntdEnUS,FormBuilderEnUS)
//end国际化处理
let TabPane = Tabs.TabPane; 

@FormBuilder.create()
class Container extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      locale: enUS,
    }
  } 

  render() {
    return (
      <div>
        <div style={ { padding: "20px" } }>
          <Tabs defaultActiveKey="1">
            <TabPane tab="配置生成表单" key="1">
              <LocaleProvider
                locale={ this.state.locale }
              >
                <UseWithConfig />   
              </LocaleProvider>
            </TabPane>
            <TabPane tab="直接使用JSX" key="2">
            </TabPane>
            <TabPane tab="分组表单" key="3">
            </TabPane>
            <TabPane tab="Nested表单" key="4">
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Container; 
