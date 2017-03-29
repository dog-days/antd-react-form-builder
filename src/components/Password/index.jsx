import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import Input from 'antd/lib/input'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'
import localeText from './zh_CN'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class Password extends React.Component {

    static contextTypes = {
      antLocale: React.PropTypes.object,
    };

    render(){
      let { locale,key,rePassword,...other } = this.props;
      //console.debug(this.context)
      if(!locale && this.context.antLocale){
        locale = this.context.antLocale;
      }else if(!locale) {
        locale = localeText;
      }

      other.targetComponent = Input;
      other.type = "password";
      this.propsAdapter(other);
      console.debug(other)
      if(rePassword){
        var reProps = _.cloneDeep(other);
        reProps.formItemProps.label = locale.FormBuilderRepasswordInput.label;
        reProps.name = "re-" + reProps.name;
        reProps.rules.push(
          {
            validator(rule, value, callback, source, options) {
              var errors = [];
              var password_value = document.getElementsByName(other.name)[0].value;
              //console.debug(password_value)
              if(password_value !== value){
                errors.push({
                  message: locale.FormBuilderRepasswordInput.checkErrorMsg,
                })
              }
              callback(errors);
            }
          }
        )
      }
      return (
        <div key={ key } className="password-con">
          <BasicItemComponent { ...other }/>
          {
            rePassword &&
            <BasicItemComponent { ...reProps } required/>
          }
        </div>
      )
    }
    
  }
  return Password;
}

export default component(BasicItem) 




