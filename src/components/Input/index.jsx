import React from 'react'
import AntdInput from 'antd/lib/input'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'
import BasicItem from '../BasicItem'
import localeText from './zh_CN'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class Input extends React.Component {

    constructor(props){
      super(props);
    }

    static contextTypes = {
      antLocale: React.PropTypes.object,
    };
    //其他地方也可以访问这个rules，测试就要用到
    static getRules(replaceLocale) {
      var locale;
      if(replaceLocale){
        locale = replaceLocale;
      }else {
        locale = localeText;
      }
      if(!locale.FormBuilderEmailInput){
        locale.FormBuilderEmailInput = localeText.FormBuilderEmailInput;
      }
      if(!locale.FormBuilderUrlInput){
        locale.FormBuilderUrlInput = localeText.FormBuilderUrlInput;
      }
      return {
        email: [
          { 
            type: "email",
            message: locale.FormBuilderEmailInput.formatErrorMsg,
          }
        ],
        url: [
          { 
            type: "url",
            message: locale.FormBuilderUrlInput.formatErrorMsg, 
          }
        ], 
        phone: [
          {
            validator: function(rule, value, callback, source, options){
              var reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i;
              var errors = [];
              if(!reg.test(value)){
                errors.push({
                  message: locale.FormBuilderPhoneInput.formatErrorMsg,
                })
              }
              callback(errors);
            }
          }
        ],
      }
    };
    
    //定义rule,type等信息 
    getInfoObject(type){
      let { locale } = this.props;
      if(!locale){
        locale = this.context.antLocale;
      }
      var rules = Input.getRules(locale); 
      switch(type){
        case "number":
          return {
            type: "number",
          }
        case "email":
          return {
            rules: rules.email,
            type: "text",
          }
        case "url":
          return {
            rules: rules.url, 
            type: "text",
          }
        case "phone":
          return {
            rules: rules.phone, 
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
        default:
          return {
            type: "text",
            rules: [],
          };
      }
    }

    render(){
      let { type,rules=[],...other } = this.props;
      let infoObject = this.getInfoObject(type); 
      let temp_rules = [];
      Array.prototype.push.apply(temp_rules,rules)
      Array.prototype.push.apply(temp_rules,infoObject.rules || [])
      other.rules = temp_rules;
      other.type = infoObject.type;
      other.targetComponent = AntdInput;
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return Input;
}

const Item = component(BasicItem); 

export default Item; 





