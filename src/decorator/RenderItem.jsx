import React from 'react'
import _ from 'lodash'
import { 
  Input,
  InputNest,
  InputNumber,
  Select,
  Button,
  TimePicker,
  DatePicker,
  MonthPicker,
  RangePicker,
  CheckboxGroup,
  RadioGroup,
} from '../FormItemBind'

function getFormItemComponentByType(type){
  var Element;
  switch(type){
    case "hidden":
    case "text":
    case "email":
    case "textarea":
    case "url":
      Element = Input;
    break;
    case "number":
    case "float":
    case "integer":
      Element = InputNumber;
    break;
    case "password":
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
    case "time-picker":
      Element = TimePicker;
    break;
    case "date":
    case "date-picker":
      Element = DatePicker;
    break;
    case "month-picker":
    case "month":
      Element = MonthPicker;
    break;
    case "range":
    case "range-picker":
      Element = RangePicker;
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
