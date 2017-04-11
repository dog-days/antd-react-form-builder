import React from 'react'
import _ from 'lodash'
import localeText from '../locale-provider/zh_CN'
import { sprintf } from "sprintf-js"

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
    min,
    max,
    onlyLetter,
    rules=[],
  } = props;
  if(!formItemProps.label){
    formItemProps.label = label;
  }
  function validateLength(){
    if(min && max){
      rules.unshift({
        min,
        max,
        message: sprintf(locale.charactersBetwteen,min,max),
      });
    }else if(min){
      rules.unshift({
        min,
        message: sprintf(locale.charactersMin,min),
      });
    }else if(max){
      rules.unshift({
        max,
        message: sprintf(locale.charactersMax,max),
      });
    }
  }
  //只有text类型有长度限制
  switch(props.type){
    case "text":
      if(onlyLetter){
        rules.unshift({
          validator(rule, value, callback, source, options) {
            var errors = [];
            var pass = new RegExp("^[A-Za-z]*$").test(value);
            if(!pass){
              errors.push({
                message: locale.charactersOnlyLetter,
              })
            }
            callback(errors);
          }
        });
      }
      validateLength(); 
    break;
    case "password":
      validateLength(); 
    break;
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
