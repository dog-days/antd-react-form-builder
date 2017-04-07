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
import Locale from "./Locale"
import { 
  LocaleProvider,
  Tabs 
} from 'antd'
import moment from 'moment'
import 'moment/locale/zh-cn'
import feilds from "./config"
import "antd/dist/antd.css"
import "../style/css/style.scss"

moment.locale('zh_CN');


let TabPane = Tabs.TabPane; 

class Container extends React.Component {

  constructor(props){
    super(props);
  } 

  render() {
    return (
      <div>
        <div style={ { padding: "20px" } }>
          <Tabs defaultActiveKey="2">
            <TabPane tab="JSX风格" key="1">
              <JSXStyle />   
            </TabPane>
            <TabPane tab="配置生成表单" key="2">
              <UseWithConfig />   
            </TabPane>
            <TabPane tab="国际化" key="3">
              <Locale />   
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Container; 
