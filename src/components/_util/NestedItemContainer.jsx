import React from 'react'
import _ from 'lodash'
import Card from 'antd/lib/card'
import ItemButtonGroupDecorator from "../../decorator/ItemButtonGroup"
import util from '../../util'

@ItemButtonGroupDecorator
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
    var buttonGroup = this.buttonGroupAdapter(index,data,{
      className: "builder-group-btn-group",
    });
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

