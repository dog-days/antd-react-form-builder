import React from 'react'
import AntdForm from 'antd/lib/form'

let FormItem = AntdForm.Item;

export default class TimePicker extends React.Component {

  constructor(props){
    super(props);
  }

  static contextTypes = {
    form: React.PropTypes.any
  }
  
  //getFieldDecorator第二参数适配
  getFieldDecoratorSecondParam(rules) {
    let {
      value,
    } = this.props;
    var obj = {
      rules: rules || [],
    }
    if(value || value == 0){
      obj.initialValue = value; 
    }
    return obj;
  }

  render() {
    let props = this.props;
    let {
      value,
      name,
      children,
      rules = [],
      targetComponent,
      formItemProps,
      ...other,
    } = props;
    const form = this.context.form;
    if(!form){
      console.error("请使用Antd.Form.create()(targetForm)处理目标form函数对象（类）")
      return false;
    }

    var obj = this.getFieldDecoratorSecondParam(rules);
    var FormItemComponent = targetComponent;
    var component; 
//console.debug(children)
    if(!FormItemComponent){
      return false;
    }else if(children){
      //可以传子组件进来，像Select的option等
      component = form.getFieldDecorator(name, obj)(
        <FormItemComponent {...other}>
          { children }
        </FormItemComponent>
      )
    }else {
      component = form.getFieldDecorator(name, obj)(<FormItemComponent {...other}/>)
    }

    if(other.type === "hidden") {
      return component;
    }
    return (
      <FormItem {...formItemProps}>
        { component }
      </FormItem>
    ) 
  }
}




