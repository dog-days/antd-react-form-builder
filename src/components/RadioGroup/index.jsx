import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import AntdRadio from 'antd/lib/radio'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

const RadioGroup = AntdRadio.Group;

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
                <AntdRadio value={ v.value } key={ k }>
                  { v.label }
                </AntdRadio>
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




