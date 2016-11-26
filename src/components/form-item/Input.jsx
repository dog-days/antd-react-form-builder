import React from 'react'
import AntdInput from 'antd/lib/input'
import AntdForm from 'antd/lib/form'

let FormItem = AntdForm.Item;

export default class Input extends React.Component {

  static contextTypes = {
    form: React.PropTypes.any
  }

  constructor(props){
    super(props);
  }
  //定义rule,type等信息 
  getInfoObject(type){
    switch(type){
      case "email":
        return {
          rules: [
            { 
              type: "email",
              message: '邮箱格式有误' 
            }
          ],
          type: "text",
        }
      case "url":
        return {
          rules: [
            { 
              type: "url",
              message: '网址格式有误' 
            }
          ],
          type: "text",
        }
      case "textarea":
        return {
          type: "textarea",
        }
      case "hidden":
        return {
          type: "hidden",
        }
      case "number":
        return {
          type: "number",
        }
      default:

        return {};
    }
  }

  render() {
    let props = this.props;
    let {
      value,
      name,
      rules = [],
      type,
      formItemProps,
      ...other,
    } = props;
    let form = this.context.form;
    if(!form){
      console.error("请使用Antd.Form.create()(targetForm)处理目标form函数对象（类）")
      return false;
    }
    let infoObject = this.getInfoObject(type); 
    other.type = infoObject.type;

    Array.prototype.push.apply(rules,infoObject.rules)

    var obj = {
      rules: rules || [],
    }
    if(value || value == 0){
      obj.initialValue = value; 
    }
    var element = form.getFieldDecorator(name, obj)(<AntdInput {...other}/>)
    if(type === "hidden") {
      return element;
    }
    return (
      <FormItem {...formItemProps}>
        { element }
      </FormItem>
    ) 
    
  }
}



