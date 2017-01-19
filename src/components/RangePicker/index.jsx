import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import AntdDatePicker from 'antd/lib/date-picker'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

const { MonthPicker, RangePicker } = AntdDatePicker;

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class FRangePicker extends React.Component {

    render(){
      let { ...other } = this.props;
      other.targetComponent = RangePicker;
      other.type = "rangepicker";
      if(_.isArray(other.value)){
        other.value.forEach((v,k)=>{
          if(_.isString(v)){
            other.value[k] = new moment(v,other.format || "YYYY-MM-DD")
          }
        })
      }
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return FRangePicker;
}

export default component(BasicItem) 




