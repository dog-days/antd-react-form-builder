import React from 'react'
import _ from 'lodash'
import { 
  Form,
  Input,
  InputNest,
  InputNumber,
  Select,
  Button,
  TimePicker,
} from '../FormItemBind'

function getFormItemComponentByType(type){
  var Element;
  switch(type){
    case "hidden":
    case "text":
    case "email":
    case "url":
      Element = Input;
    break;
    case "number":
      Element = InputNumber;
    break;
    case "password":
    case "textarea":
      Element = Input;
    break;
    case "select":
      Element = Select;
    break;
    case "button":
      Element = Button;
    break;
    case "time":
      Element = TimePicker;
    break;
    //nested item 
    case "InputNest":
      Element = InputNest;
    break;
    default:
      Element = Input;
  }
  return Element;
}

function renderItemDecorator(component){
  component.prototype.getFormItemComponentByType = getFormItemComponentByType;
  return component;
}
export default renderItemDecorator;
