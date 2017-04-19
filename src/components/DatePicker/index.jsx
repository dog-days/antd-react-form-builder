import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import DatePicker from 'antd/lib/date-picker'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class FDatePicker extends React.Component {

    render(){
      let { ...other } = this.props;

      other.targetComponent = DatePicker;
      if(_.isString(other.value)){
        other.value = new moment(other.value,other.format || "YYYY-MM-DD")
      }
      other.type = "datepicker";
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return FDatePicker;
}

export default component(BasicItem) 




