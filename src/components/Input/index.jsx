import React from 'react'
import {
  Input 
} from "antd"
import FormItemComponentDecorator from '../../decorator/FormItemComponent'
import localeDecorator from "../../decorator/Locale"
import BasicItem from '../BasicItem'
import localeText from './zh_CN'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  @localeDecorator
  class FInput extends React.Component {

    constructor(props){
      super(props);
    }

    static propTypes = {
      min: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]),
      max: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]),
      onlyLetter: React.PropTypes.bool,
    }

    //其他地方也可以访问这个rules，测试就要用到
    static getRules(replaceLocale) {
      var locale = replaceLocale;
      return {
        email: [
          { 
            type: "email",
            message: locale.emailErrorMsg,
          }
        ],
        url: [
          { 
            type: "url",
            message: locale.urlErrorMsg,
          }
        ], 
        phone: [
          {
            validator: function(rule, value, callback, source, options){
              var reg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i;
              var errors = [];
              if(!reg.test(value) && value !=""){
                errors.push({
                  message: locale.phoneErrorMsg,
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
      var locale = this.getLocale(localeText,"FormBuilderInput");
      var rules = FInput.getRules(locale); 
      switch(type){
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
      let { 
        type,
        rules=[],
        ...other 
      } = this.props;
      let infoObject = this.getInfoObject(type); 
      let temp_rules = [];
      Array.prototype.push.apply(temp_rules,rules)
      Array.prototype.push.apply(temp_rules,infoObject.rules || [])
      other.rules = temp_rules;
      other.type = infoObject.type;
      other.targetComponent = Input;
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return FInput;
}

const Item = component(BasicItem); 

export default Item; 





