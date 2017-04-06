import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import Input from 'antd/lib/input'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'
import localeDecorator from "../../decorator/Locale"
import localeText from './zh_CN'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  @localeDecorator
  class Password extends React.Component {

    render(){
      let { locale,key,rePassword,...other } = this.props;
      //console.debug(this.context)
      locale = this.getLocale(localeText,"FormBuilderPassword"); 

      other.targetComponent = Input;
      other.type = "password";
      this.propsAdapter(other);
      if(rePassword){
        var reProps = _.cloneDeep(other);
        reProps.formItemProps.label = locale.label, 
        reProps.name = "re-" + reProps.name;
        reProps.rules.push(
          {
            validator(rule, value, callback, source, options) {
              var errors = [];
              var password_value = document.getElementsByName(other.name)[0].value;
              if(password_value !== value){
                errors.push({
                  message: locale.checkErrorMsg,
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
            <BasicItemComponent { ...reProps } />
          }
        </div>
      )
    }
    
  }
  return Password;
}

export default component(BasicItem) 




