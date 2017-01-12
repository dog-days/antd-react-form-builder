import React from 'react'
import AntdInput from 'antd/lib/input'
import BasicItem from '../BasicItem'
import localeText from './zh_CN'

function component(BasicItemComponent){
  return class Input extends React.Component {

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
      //这里运行了多次，没想到更好办法，目前先这样处理
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
      if(!other.storage){
        if(this.storage){
          other.storage = this.storage;
        }else {
          other.storage = {
            value: other.value,
          }
          this.storage = other.storage; 
        }
      }
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
}

const Item = component(BasicItem); 

export default Item; 





