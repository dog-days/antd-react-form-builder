import React from 'react'
import AntdButton from 'antd/lib/button'
import AntdForm from 'antd/lib/form'

let FormItem = AntdForm.Item;

export default class Button extends React.Component {

  static contextTypes = {
    size: React.PropTypes.string,
    hasFeedback: React.PropTypes.bool,
    labelCol: React.PropTypes.object,
    wrapperCol: React.PropTypes.object,
  }

  getDealProp(props,index,defaultValue){
    if(!props[index]){
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

  render() {
    let props = this.props;
    let {
      storage,
      children,
      value,
      buttonType,
      formItemProps={},
      ...other,
    } = props;

    other = this.addOtherPropsFromFormBuilder(other);
    formItemProps = this.addFormItemPropsFromFormBuilder(formItemProps);
    other.type = buttonType;
    if(!children){
      children = value;
    }
    return (
      <FormItem {...formItemProps}>
        <AntdButton
          { ...other }
        >
          { children }
        </AntdButton>
      </FormItem>
    ) 
  }
}



