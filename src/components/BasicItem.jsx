import React from 'react'
import AntdForm from 'antd/lib/form'
//import PureRender from '../decorator/PureRender'

let FormItem = AntdForm.Item;

//@PureRender
class BasicItem extends React.Component {

  constructor(props){
    super(props);
  }

  static PropTypes = {
    rules: React.PropTypes.array,
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    formItemProps: React.PropTypes.object,
  }

  static contextTypes = {
    form: React.PropTypes.object,
    size: React.PropTypes.string,
    hasFeedback: React.PropTypes.bool,
    labelCol: React.PropTypes.object,
    wrapperCol: React.PropTypes.object,
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

  getDealProp(props,index,defaultValue){
    if(props[index] === undefined){
      if(this.context[index]){
        props[index] = this.context[index];
      }else {
        props[index] = defaultValue;
      }
    }
  }

  addOtherPropsFromFormBuilder(props){
    this.getDealProp(props,"size","default");
    return props;
  }

  addFormItemPropsFromFormBuilder(props){
    this.getDealProp(props,"hasFeedback",false);
    this.getDealProp(props,"labelCol",null);
    this.getDealProp(props,"wrapperCol",null);
    return props;
  }

  onChange(e){
    var value;
    if(e.target){
      value = e.target.value;
    }else {
      value = e;
    }
    if(this.props.storage){
      this.props.storage.value = value;
    }
    this.props.onChange && this.props.onChange(e);
  }

  render() {
    let props = this.props;
    //console.debug(this.props.storage)
    let {
      uniqueKey,//不会使用，只是为了消除不存在的props报错
      uniqueKeySpecial,//不会使用，只是为了消除不存在的props报错
      uniqueKeyNestedSpecial,//不会使用，只是为了消除不存在的props报错
      storage,//存储一些信息，如同步antd的value值
      value,
      array,//不会使用，只是为了消除不存在的props报错
      nestedType,//不会使用，只是为了消除不存在的props报错
      name,
      fieldDecoratorName,
      children,
      rules = [],
      targetComponent,
      formItemProps={},
      ...other,
    } = props;
    const form = this.context.form;
    if(!form){
      console.error("请使用Antd.Form.create()(targetForm)处理目标form函数对象（类）")
      return false;
    }
    other = this.addOtherPropsFromFormBuilder(other);
    formItemProps = this.addFormItemPropsFromFormBuilder(formItemProps);
    var obj = this.getFieldDecoratorSecondParam(rules);
    var FormItemComponent = targetComponent;
    var component; 
    if(!FormItemComponent){
      return false;
    }else if(children){
      //可以传子组件进来，像Select的option等
      component = form.getFieldDecorator(fieldDecoratorName, obj)(
        <FormItemComponent 
          {...other} 
          onChange={
            this.onChange.bind(this)
          }
        >
          { children }
        </FormItemComponent>
      )
    }else {
      component = form.getFieldDecorator(name, obj)(
        <FormItemComponent 
          {...other} 
          onChange={
            this.onChange.bind(this)
          }
        />
      )
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

export default BasicItem; 

