import React from 'react'
import FormBuilder,{
  Input,
  InputNumber,
  Select,
  Button as FButton,
} from '../src/index'
import { Button,Form,Tabs } from 'antd'
import "antd/dist/antd.css"

let TabPane = Tabs.TabPane; 

export default class Container extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      config: {
        "feilds": [
          {
            "type": "text",
            "name": "text",
            "rules": [
              {
                "required": true,
                "message": "请不要留空"
              }
            ],
            "formItemProps": {
              "label": "随意"
            },
            "value": "dddd",
            "placeholder": "请输入！"
          },
          {
            "type": "hidden",
            "name": "hidden",
            "value": "dddd"
          },
          {
            "type": "email",
            "name": "email",
            "value": "xianshannan@qq.com",
            "placeholder": "请输入邮箱！",
            "formItemProps": {
              "label": "邮箱"
            }
          },
          {
            "type": "url",
            "name": "url",
            "formItemProps": {
              "label": "网址"
            },
            "placeholder": "请输入网址"
          },
          {
            "type": "password",
            "rePassword": false,
            "name": "password",
            "value": "123456",
            "formItemProps": {
              "label": "密码"
            },
            "placeholder": "请输入密码！"
          },
          {
            "type": "select",
            "name": "city",
            "value": "0",
            "allowClear": true,
            "rules": [
              {
                "required": true, 
                "message": "请选择城市"
              }
            ],
            "options": [
              {
                "value": "shenzen",
                "text": "深圳"
              },
              {
                "value": "1",
                "text": "上海"
              },
              {
                "value": "2",
                "text": "北京"
              }
            ],
            "formItemProps": {
              "label": "城市"
            },
            "placeholder": "请选择城市！"
          },
          {
            "type": "select",
            "name": "city2",
            "rules": [
              {
                "type": "array", 
                "required": true,
                "message": "请选择城市"
              }
            ],
            "multiple": true,
            "value": ["0","1","2"],
            "options": [
              {
                "value": "shenzen",
                "text": "深圳"
              },
              {
                "value": "上海",
                "text": "上海"
              },
              {
                "value": "北京",
                "text": "北京"
              }
            ],
            "formItemProps": {
              "label": "城市"
            },
            "placeholder": "请选择城市！"
          },
          {
            "type": "textarea",
            "name": "textarea",
            "value": "123456",
            "formItemProps": {
              "label": "评论"
            },
            "placeholder": ""
          },
          {
            "type": "number",
            "name": "number",
            "value": "123456",
            "formItemProps": {
              "label": "序号"
            },
            "placeholder": ""
          },
          {
            "type": "button",
            "buttonType": "primary",
            "htmlType": "submit",
            "style": {
              "float": "right"
            },
            "value": "提交"
          }
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
              <FormBuilder 
                onSubmit={ this.handleOnsubmit }
                size="default"
                hasFeedback={ false }
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


