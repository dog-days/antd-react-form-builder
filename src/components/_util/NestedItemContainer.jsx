import React from 'react'
import _ from 'lodash'
import ButtonGroup from '../Button/ButtonGroup'
import Icon from 'antd/lib/icon'
import Card from 'antd/lib/card'
import util from '../../util'

class NestItemContainer extends React.Component {

  static contextTypes = {
    onButtonGroupClick: React.PropTypes.func,
  } 

  render() {
    let {
      index,
      title,
      action,
      data,
      ...other
    } = this.props;
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
        disableButtons.push(0); 
      }
//console.debug(index,data.length)
      if(index === data.length - 1){
        disableButtons.push(1); 
      }
      if(data.length === 1){
        disableButtons.push(3); 
      }
//console.debug(this.context)
      buttonGroup = (
        <ButtonGroup 
          className="builder-group-btn-group"
          size="default"
          keys={keys}
          hightButton={false}
          disableButtons={ disableButtons }
          buttonTexts={buttonTexts}
          onButtonClick={ 
            this.context.onButtonGroupClick 
            && this.context.onButtonGroupClick(data,index) 
          }
        />
      );  
    }
    //定义className
    var con_class = "builder-group-item-con";
    if(other.className){
      other.className = con_class + other.className;
    }else {
      other.className = con_class;
    }
    return (
      <Card 
        title={title || "  "} 
        extra={ buttonGroup }
        { ...other }
      >
        { this.props.children }
      </Card>
    ) 
  }
}

export default NestItemContainer; 

