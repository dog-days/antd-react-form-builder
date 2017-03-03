import React from 'react'
import _ from 'lodash'
import { 
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  TimePicker,
} from '../FormItemBind'

let propTypes = {
  size: React.PropTypes.string,
  onSubmit: React.PropTypes.func,
  hasFeedback: React.PropTypes.bool,
  config: React.PropTypes.array,
}

let childContextTypes = {
  size: React.PropTypes.string,
  hasFeedback: React.PropTypes.bool,
  labelCol: React.PropTypes.object,
  wrapperCol: React.PropTypes.object,
  inline: React.PropTypes.bool,
  itemsValidateFunc: React.PropTypes.object,
  selectSourceData: React.PropTypes.object,
}

let contextTypes = {
  formBuilder: React.PropTypes.object,
}

function getChildContext(){
  return {
    size: this.props.size,
    hasFeedback: this.props.hasFeedback,
    labelCol: this.props.labelCol,
    wrapperCol: this.props.wrapperCol,
    inline: this.props.inline,
    itemsValidateFunc: this.itemsValidateFunc,
    selectSourceData: this.props.selectSourceData,
  }
} 

function builderDecorator(component){
  component.propTypes = propTypes;
  component.childContextTypes = childContextTypes;
  component.contextTypes = contextTypes;
  component.prototype.getChildContext = getChildContext;
}
export default builderDecorator;
