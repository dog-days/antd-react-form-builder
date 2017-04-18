import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import {
  Radio 
} from "antd"
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

const RadioGroup = Radio.Group;

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class FRadioGroup extends React.Component {

    render(){
      let { options,...other } = this.props;
      other.targetComponent = RadioGroup;
      other.type = "radiogroup";
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }>
          {
            options && options[0] && options.map((v,k)=>{
              return (
                <Radio value={ v.value } key={ k }>
                  { v.label }
                </Radio>
              )
            })
          }
        </BasicItemComponent>
      )
    }
    
  }
  return FRadioGroup;
}

export default component(BasicItem) 




