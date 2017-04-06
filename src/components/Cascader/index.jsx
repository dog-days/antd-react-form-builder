import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import BasicItem from '../BasicItem'
import AntdCascader from 'antd/lib/cascader'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class Cascader extends React.Component {

    render(){
      let { ...other } = this.props;

      other.targetComponent = AntdCascader;
      other.type = "cascader";
      this.propsAdapter(other);
      return (
        <BasicItemComponent { ...other }/>
      )
    }
    
  }
  return Cascader;
}

export default component(BasicItem) 




