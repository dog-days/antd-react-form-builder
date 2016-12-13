import React from 'react'
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
      var keys = ["up","down","plus","delete"];
      var buttonTexts = [
        <Icon type="arrow-up"/>,
        <Icon type="arrow-down"/>,
        <Icon type="plus"/>,
        <Icon type="close"/>,
      ];
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

