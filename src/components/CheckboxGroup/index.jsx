import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import {
  Checkbox 
} from "antd"
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

const CheckboxGroup = Checkbox.Group;

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class FCheckboxGroup extends React.Component {

    render(){
      let { ...other } = this.props;
      other.targetComponent = CheckboxGroup;
      other.type = "checkboxgroup";
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return FCheckboxGroup;
}

export default component(BasicItem) 




