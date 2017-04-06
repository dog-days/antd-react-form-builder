import React from 'react'
import _ from 'lodash'
import localeText from 'src/locale-provider/zh_CN'


let contextTypes = {
  selectSourceData: React.PropTypes.object,
  antLocale: React.PropTypes.object,
}
//所有表单项props适配器
function propsAdapter(props){
  let locale;
  if(this.context.antLocale){
    locale = this.context.antLocale.FormBuilderCommon;
  }else {
    locale = localeText.FormBuilderCommon;
  }
  let {
    label,
    formItemProps={},
    value,
    required,
    boolean,
    rules=[],
  } = props;
  if(!formItemProps.label){
    formItemProps.label = label;
  }
  if(required){
    rules.unshift({
      required: true,
      message: (label || props.name) + locale.required,
    });
  }
  props.rules = rules;
  props.formItemProps = formItemProps;
  //中间value传递处理
  if(!props.storage){
    if(this.storage){
      props.storage = this.storage;
    }else {
      props.storage = {
        value: value,
      }
      this.storage = props.storage; 
    }
  }
  return props;
}

function formItemComponentDecorator(component){
  component.prototype.propsAdapter = propsAdapter;
  component.contextTypes = contextTypes;
  return component;
}
export default formItemComponentDecorator;
