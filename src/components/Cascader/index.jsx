import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import Cascader from 'antd/lib/cascader'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class FCascader extends React.Component {

    render(){
      let { ...other } = this.props;

      other.targetComponent = Cascader;
      other.type = "cascader";
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return FCascader;
}

export default component(BasicItem) 




