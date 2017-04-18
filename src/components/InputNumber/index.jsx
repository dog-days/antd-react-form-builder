import React from 'react'
import {
  Input 
} from "antd"
import BasicItem from '../BasicItem'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'
import localeText from './zh_CN'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class InputNumber extends React.Component {
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
      if(!locale.FormBuilderFloatInput){
        locale.FormBuilderFloatInput = localeText.FormBuilderFloatInput;
      }
      if(!locale.FormBuilderIntegerInput){
        locale.FormBuilderIntegerInput = localeText.FormBuilderIntegerInput;
      }
      //这里运行了多次，没想到更好办法，目前先这样处理
      return {
        integer: [
          { 
            type: "integer",
            message: (
              locale.FormBuilderIntegerInput.formatErrorMsg ||
              localeText.FormBuilderIntegerInput.formatErrorMsg
            ),
          }
        ],
        float: [
          { 
            type: "float",
            message: (
              locale.FormBuilderFloatInput.formatErrorMsg ||
              localeText.FormBuilderFloatInput.formatErrorMsg
            ),
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
      var rules = InputNumber.getRules(locale); 
      switch(type){
        case "float":
          return {
            rules: rules.float,
            type: "number",
          }
        case "integer":
          return {
            rules: rules.integer,
            type: "number",
          }
        default:
          return {
            type: "number",
            rules: [],
          };
      }
    }


    render(){
      let { type,rules,...other } = this.props;
      other.type = "number";
      if(other.value){
        other.value = Number(other.value);
      }
      other.targetComponent = Input;
      let infoObject = this.getInfoObject(type); 
      let temp_rules = [];
      Array.prototype.push.apply(temp_rules,rules)
      Array.prototype.push.apply(temp_rules,infoObject.rules || [])
      other.rules = temp_rules;
      other.type = infoObject.type;
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return InputNumber;
}

export default component(BasicItem) 





