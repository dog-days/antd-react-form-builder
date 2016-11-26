import React from 'react'
import AntdInput from 'antd/lib/input-number'
import AntdForm from 'antd/lib/form'

let FormItem = AntdForm.Item;

export default class InputNumber extends React.Component {

  static contextTypes = {
    form: React.PropTypes.any
  }

  constructor(props){
    super(props);
  }
  
  getRules(type){
    return [];
  }

  render() {
    let props = this.props;
    let {
      value,
      name,
      rules = [],
      formItemProps,
      ...other,
    } = props;
    let form = this.context.form;
    if(!form){
      console.error("请使用Antd.Form.create()(targetForm)处理目标form函数对象（类）")
      return false;
    }
    Array.prototype.push.apply(rules,this.getRules())

    var obj = {
      rules: rules || [],
    }
    if(value || value == 0){
      obj.initialValue = value 
    }
    var element = form.getFieldDecorator(name, obj)(<AntdInput {...other}/>)
    return (
      <FormItem {...formItemProps}>
        { element }
      </FormItem>
    ) 
    
  }
}




