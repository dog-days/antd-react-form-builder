import React from 'react'
import _ from 'lodash'

function propsAdapter(props){
  let {
    label,
    formItemProps={},
    value,
  } = props;
  if(!formItemProps.label){
    formItemProps.label = label;
  }
  props.formItemProps = formItemProps;
  if(!props.storage){
    if(this.storage){
      props.storage = this.storage;
    }else {
      props.storage = {
        value: value,
      }
      this.storage = props.storage; 
    }
  }
}

function formItemComponentDecorator(component){
  component.prototype.propsAdapter = propsAdapter;
  return component;
}
export default formItemComponentDecorator;
