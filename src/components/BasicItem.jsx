import React from 'react'
import AntdForm from 'antd/lib/form'
import PureRender from '../decorator/PureRender'

let FormItem = AntdForm.Item;

@PureRender
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
    if(e && e.target){
      value = e.target.value;
    }else {
      value = e;
    }
    if(this.props.storage){
      this.props.storage.value = value;
    }
//console.debug(value,this.props)
    this.props.onChange && this.props.onChange(e);
  }

  render() {
    let props = this.props;
    //console.debug(this.props.storage)
    let {
      storage,//存储一些信息，如同步antd的value值
      children,
      rules = [],
      value,
      targetComponent,
      formItemProps={},
      ...other,
    } = props;
    other = this.addOtherPropsFromFormBuilder(other);
    formItemProps = this.addFormItemPropsFromFormBuilder(formItemProps);
    var FormItemComponent = targetComponent;
    var component; 
    if(!FormItemComponent){
      return false;
    }else if(children){
      //可以传子组件进来，像Select的option等
      component = ( 
        <FormItemComponent 
          {...other} 
          defaultValue={ value }
          onChange={
            this.onChange.bind(this)
          }
        >
          { children }
        </FormItemComponent>
      )
    }else {
      component = (
        <FormItemComponent 
          {...other} 
          defaultValue={ value }
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

