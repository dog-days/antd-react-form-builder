import React from 'react'
import ButtonGroup from '../Button/ButtonGroup'
import Icon from 'antd/lib/icon'
import util from '../../util'

class NestItemContainer extends React.Component {

  static contextTypes = {
    onButtonGroupClick: React.PropTypes.func,
  } 

  render() {
    let {
      index,
      data,
      ...other
    } = this.props;
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
    if(index === data.length - 1){
      disableButtons.push(1); 
    }
    if(data.length === 1){
      disableButtons.push(3); 
    }
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
          <ButtonGroup 
            className="builder-simple-btn-group"
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
        </div>
      </div>
    ) 
  }
}

export default NestItemContainer; 

