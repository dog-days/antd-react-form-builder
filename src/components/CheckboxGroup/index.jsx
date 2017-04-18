import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import AntdCheckbox from 'antd/lib/checkbox'
import 'antd/lib/checkbox/style/css'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

const CheckboxGroup = AntdCheckbox.Group;

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




