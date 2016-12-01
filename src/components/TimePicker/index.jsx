import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import AntdTimePicker from 'antd/lib/time-picker'

function component(BasicItemComponent){
  return class TimePicker extends React.Component {
    getRules(){
      return [
        {
          type: "object",
        }
      ]
    }

    render(){
      let { rules,...other } = this.props;

      let temp_rules = [];
      Array.prototype.push.apply(temp_rules,rules)
      Array.prototype.push.apply(temp_rules,this.getRules())
      other.rules = temp_rules;

      other.targetComponent = AntdTimePicker;
      if(_.isString(other.value)){
        other.value = new moment(other.value,"HH:mm:ss")
      }
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
}

export default component(BasicItem) 




