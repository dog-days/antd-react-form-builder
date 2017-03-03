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
import JSXStyle from "./JSXStyle"
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
          <Tabs defaultActiveKey="2">
            <TabPane tab="JSX风格（简单的）" key="1">
              <JSXStyle />   
            </TabPane>
            <TabPane tab="配置生成表单" key="2">
              <UseWithConfig />   
            </TabPane>
            <TabPane tab="国际化" key="3">
              <LocaleProvider
                locale={ this.state.locale }
              >
                <JSXStyle />   
              </LocaleProvider>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Container; 
