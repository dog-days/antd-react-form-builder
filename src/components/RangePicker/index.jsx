import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import {
  DatePicker 
} from "antd"
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

const { RangePicker } = DatePicker;

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
            other.value[k] = new moment(other.value[k],other.format || "YYYY-MM-DD");
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




