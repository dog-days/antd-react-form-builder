import React from 'react'
import _ from 'lodash'
import Input from '../components/Input'
import InputNumber from '../components/InputNumber'
import Select from '../components/Select'
import TimePicker from '../components/TimePicker'
import DatePicker from '../components/DatePicker'
import MonthPicker from '../components/MonthPicker'
import RangePicker from '../components/RangePicker'
import CheckboxGroup from '../components/CheckboxGroup'
import RadioGroup from '../components/RadioGroup'
import Password from '../components/Password'
import Cascader from '../components/Cascader'

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
    case "select":
      Element = Select;
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
    case "checkbox-group":
      Element = CheckboxGroup;
    break;
    case "radio-group":
      Element = RadioGroup;
    break;
    case "password":
      Element = Password;
    break;
    case "cascader":
      Element = Cascader;
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
