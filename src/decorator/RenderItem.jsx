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
  }
  return Element;
}

function renderItemByArray(feilds,Container,propsCallback){
//console.debug(feilds)
  if(!_.isFunction(Container)){
    propsCallback = Container;
    Container = null;
  }
  return feilds.map((v,k)=>{
    let { 
      originalName,
      action,
      uniqueKey,
      ...other
    } = v;
    if(propsCallback){
      other = propsCallback(other,k);
    }
    var Element = this.getFormItemComponentByType(v.nestedType || v.type);
//console.debug(v.nestedType)
    if(v.nestedType){
      other.action = action;
      return (
        <Element 
          key={uniqueKey} 
          { ...other } 
        />
      )
    }
    if(!Element){
      return false;
    }
    if(v.type === "hidden"){
      return false;
    }
    if(Container && action){
      return ( 
        <Container 
          action={ action }
          key={ uniqueKey } 
          index={ k } 
          data={feilds}
        >
          <Element { ...other } />
        </Container>
      )
    }else {
      return (
        <Element key={uniqueKey} { ...other } />
      )
    }
  })
}

function renderItemDecorator(component){
  component.prototype.getFormItemComponentByType = getFormItemComponentByType;
  component.prototype.renderItemByArray = renderItemByArray;
  return component;
}
export default renderItemDecorator;
