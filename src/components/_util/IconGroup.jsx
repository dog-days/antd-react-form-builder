import React from 'react'
import Icon from 'antd/lib/icon'
import _ from 'lodash'

class IconGroup extends React.Component {

  onIconClick = (button_type,e)=>{
    this.props.onIconClick && this.props.onIconClick(button_type,e);
  }

  render() {
    let {
      action,
      data,
      index,
    } = this.props;
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
              this.onIconClick("up",e);
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
              this.onIconClick("down",e);
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
              this.onIconClick("add",e);
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
              this.onIconClick("delete",e);
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
      if(index !== undefined && index === 0){
        upIcon = false;
      }
      if(index !== undefined && data !== undefined && index === data.length - 1){
        downIcon = false;
      }
      if(data !== undefined && (data.length - 1) === 0){
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
}

export default IconGroup; 

