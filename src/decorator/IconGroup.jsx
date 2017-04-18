import React from "react" 
import _ from 'lodash'
import {
  Icon,
} from 'antd'

function renderIconGroup(action,index,data){
  var group;
  if(action){
    if(_.isBoolean(action)){
      action = {
        up_action: true,
        down_action: true,
        add_action: true,
        delete_action: true,
      };
    }
    var upIcon = (
      <Icon 
        className="mr10"
        type="arrow-up"
        onClick={
          (e)=>{
            this.onButtonChange(data,index)("up");
          }
        }
      />
    )
    var downIcon = (
      <Icon 
        className="mr10"
        type="arrow-down"
        onClick={
          (e)=>{
            this.onButtonChange(data,index)("down");
          }
        }
      />
    )
    var addIcon = (
      <Icon 
        className="mr10"
        type="plus"
        onClick={
          (e)=>{
            this.onButtonChange(data,index)("add");
          }
        }
      />
    )
    var deleteIcon = (
      <Icon 
        className="mr10"
        type="delete"
        onClick={
          (e)=>{
            this.onButtonChange(data,index)("delete");
          }
        }
      />
    )

    if(!action.up_action){
      upIcon = false;
    }
    if(!action.down_action){
      downIcon = false;
    }
    if(!action.add_action){
      addIcon = false;
    }
    if(!action.delete_action){
      deleteIcon = false;
    }
    if(index === 0){
      upIcon = false;
    }
    if(index === data.length - 1){
      downIcon = false;
    }
    if((data.length - 1) === 0){
      deleteIcon = false;
    }
    group = (
      <span className="icon-group-con">
        { upIcon }
        { downIcon }
        { addIcon }
        { deleteIcon }
      </span>
    )
  }
  return group;
}

function iconGroupDecorator(component){
  component.prototype.renderIconGroup = renderIconGroup;
}
export default iconGroupDecorator;
