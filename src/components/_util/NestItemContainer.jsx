import React from 'react'
import ButtonGroup from '../Button/ButtonGroup'
import Icon from 'antd/lib/icon'
import util from '../../util'
import ItemButtonGroupDecorator from "../../decorator/ItemButtonGroup"

@ItemButtonGroupDecorator
class NestItemContainer extends React.Component {

  static contextTypes = {
    onButtonGroupClick: React.PropTypes.func,
  } 

  render() {
    let {
      index,
      action,
      data,
      ...other
    } = this.props;
    var buttonGroup = this.buttonGroupAdapter(index,data,{
      className: "builder-simple-btn-group",
    });
    var con_class = "builder-simple-item-con builder-flex-con";
    if(other.className){
      other.className = con_class + other.className;
    }else {
      other.className = con_class;
    }
    return (
      <div { ...other }>
        <div className="builder-item-left">
          { this.props.children }
        </div>
        <div className="builder-item-right">
          { buttonGroup }
        </div>
      </div>
    ) 
  }
}

export default NestItemContainer; 

