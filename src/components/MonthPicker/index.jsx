import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import AntdDatePicker from 'antd/lib/date-picker'
import 'antd/lib/date-picker/style/css'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

const { MonthPicker, RangePicker } = AntdDatePicker;

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class FMonthPicker extends React.Component {

    render(){
      let { ...other } = this.props;
      other.targetComponent = MonthPicker;
      other.type = "monthpicker";
      if(_.isString(other.value)){
        other.value = new moment(other.value,other.format || "YYYY-MM")
      }
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return FMonthPicker;
}

export default component(BasicItem) 




