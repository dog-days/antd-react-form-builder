import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import TimePicker from 'antd/lib/time-picker'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class FTimePicker extends React.Component {

    render(){
      let { ...other } = this.props;

      other.targetComponent = TimePicker;
      if(_.isString(other.value)){
        other.value = new moment(other.value,"HH:mm:ss")
      }
      other.type = "timepicker";
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return FTimePicker;
}

export default component(BasicItem) 




