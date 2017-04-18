import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import AntdTimePicker from 'antd/lib/time-picker'
import 'antd/lib/time-picker/style/css'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class TimePicker extends React.Component {

    render(){
      let { ...other } = this.props;

      other.targetComponent = AntdTimePicker;
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
  return TimePicker;
}

export default component(BasicItem) 




