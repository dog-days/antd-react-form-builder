import React from "react" 
import _ from 'lodash'
import Icon from 'antd/lib/icon'
import ButtonGroup from '../components/Button/ButtonGroup'
/**
* 获取处理后的ButtonGroup组件
* @param { object || boolean } action 是否操作 
* @param { int } index 当前数组中form item 索引，所有操作都是作用于当前form item
* @param { array } data 当前form item 数据的父级数据 
* @param { object } buttonGrouProps 
*/
function buttonGroupAdapter(action,index,data,buttonGroupProps){
  var buttonGroup;
  if(action){
    if(_.isBoolean(action)){
      action = {
        up_action: true,
        down_action: true,
        plus_action: true,
        close_action: true,
      };
    }
    var keys = [];
    //begin------buttonTexts
    var buttonTexts = [];
    if(action.up_action){
      keys.push("up");
      buttonTexts.push(<Icon type="arrow-up"/>);
    }
    if(action.down_action){
      keys.push("down");
      buttonTexts.push(<Icon type="arrow-down"/>);
    }
    if(action.plus_action){
      keys.push("plus");
      buttonTexts.push(<Icon type="plus"/>);
    }
    if(action.close_action){
      keys.push("delete");
      buttonTexts.push(<Icon type="close"/>);
    }
    //end--------buttonTexts
    var disableButtons = [];
    if(index === 0){
      //disableButtons.push(0); 
    }
//console.debug(index,data.length)
    if(index === data.length - 1){
      //disableButtons.push(1); 
    }
    if(data.length === 1){
      //disableButtons.push(3); 
      disableButtons.push(1); 
    }
//console.debug(this.context)
    buttonGroup = (
      <ButtonGroup 
        size="default"
        keys={keys}
        hightButton={false}
        disableButtons={ disableButtons }
        buttonTexts={ buttonTexts }
        onButtonClick={ 
          this.onButtonGroupClick 
          && this.onButtonGroupClick(data,index) 
        }
        { ...buttonGroupProps }
      />
    );  
  }
  return buttonGroup;
}

function ItemButtonGroupDecorator(component){
  component.prototype.buttonGroupAdapter = buttonGroupAdapter;
}
export default ItemButtonGroupDecorator;
