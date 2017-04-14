import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import AntdDatePicker from 'antd/lib/date-picker'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class DatePicker extends React.Component {

    render(){
      let { ...other } = this.props;

      other.targetComponent = AntdDatePicker;
      if(_.isString(other.value)){
        other.value = moment(other.value)
      }
      other.type = "datepicker";
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return DatePicker;
}

export default component(BasicItem) 




