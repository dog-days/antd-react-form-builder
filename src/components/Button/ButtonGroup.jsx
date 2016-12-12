import React from 'react'
import Antd from 'antd'
import Button from 'antd/lib/button'

/**
 *  ButtonGroup 
 * @prop {string} size size跟ant button group一致 
 * @prop {string} defaultType 默认按钮类型，跟ant button type一致
 * @prop {string} hightlightType 高亮按钮类型，跟ant button type一致
 * @prop {number} hightButton 高亮按钮索引（数字或自定义索引），跟下面buttonTexts其中一个索引或者keys某个value一致 
 * @prop {array} buttonTexts 按钮文案数组 
 * @prop {array} disableButtons 禁用的按钮组,索引数组 
 * @prop {array} keys 每个button的key，按顺序一一对应  
 * @prop {function} onButtonClick(index) 所有按钮点击时间回调函数，参数为当前按钮索引值 
 */
class ButtonGroup extends React.Component {
  constructor(props){
    super(props)  
  }

  static propTypes = {
    size: React.PropTypes.string,
    defaultType: React.PropTypes.string,
    onButtonClick: React.PropTypes.func,
    hightButton: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool,
    ]),
    buttonTexts: React.PropTypes.array,
    disableButtons: React.PropTypes.array,
    keys: React.PropTypes.array,
  }

  onButtonClick = (index,callback)=>{
    return (e)=>{
      callback && callback(index,e);
    }
  }

  render(){
    let { 
      size,
      defaultType="ghost",
      hightlightType="primary",
      hightButton=0,
      buttonTexts,
      onButtonClick,
      disableButtons,
      keys,
      ...otherProps
    } = this.props;
    return (
      <div { ...otherProps }>
        <Button.Group size={ size || undefined }>
          {
            buttonTexts.map((v,k)=>{
              var type = defaultType;
              var disabled = false;
              if(disableButtons && disableButtons.indexOf(k) != -1){
                disabled = true;
              }
              if((hightButton == k || (keys && keys[k] == hightButton)) && hightButton !== false){
                type = hightlightType;
              }
              return (
                <Button 
                  key={k} 
                  type={type} 
                  onClick={ this.onButtonClick((keys && keys[k]) || k,onButtonClick) } 
                  disabled={disabled}
                >
                  { v }
                </Button>
              )
            })
          }
        </Button.Group>
      </div>
    )  
  }
}

module.exports = ButtonGroup; 
