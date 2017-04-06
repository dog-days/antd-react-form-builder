import React from 'react'
import _ from 'lodash'
import Button from 'antd/lib/button'
import PureRender from '../../decorator/PureRender'

/**
 *  ButtonGroup 
 * @prop {string} size size跟ant button group一致 
 * @prop { string } type radio or checkbox 
 * @prop { array } options 选项 
 * @prop { array || string || number } defaultValue 默认值 
 * @prop { array || string || number } value 默认值 
 * @prop {function} onChange 所有按钮选项变化回调函数
 */
@PureRender
class ButtonGroup extends React.Component {
  constructor(props){
    super(props)  
    this.state = { }
  }

  static propTypes = {
    size: React.PropTypes.string,
    type: React.PropTypes.string,
    options: React.PropTypes.array,
    defaultValue: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    value: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.string,
      React.PropTypes.number,
    ]),
    onChange: React.PropTypes.func,
    hightlightType: React.PropTypes.string,
  }

  onChange = (value)=>{
    return (e)=>{
      if(this.props.type === "checkbox"){
        if(this.checkboxButtonValue && this.checkboxButtonValue[value]){
          this.checkboxButtonValue[value] = false;
        }else {
          this.checkboxButtonValue[value] = true;
        }
        var values = [];
        for(var k in this.checkboxButtonValue){
          if(this.checkboxButtonValue[k]){
            values.push(k);
          }
        }
        this.setState({
          currentValue: values,
        });
        this.props.onChange && this.props.onChange(values,e);
      }else {
        this.setState({
          currentValue: value,
        });
        this.props.onChange && this.props.onChange(value,e);
      }
    }
  }

  render(){
    let { 
      size="default",
      type="radio",
      hightlightType="primary",
      options,
      defaultValue,
      value,
      ...otherProps
    } = this.props;
    return (
      <div { ...otherProps }>
        <Button.Group size={ size }>
          {
            options && options.map((v,k)=>{
              var btn_props = {};
              btn_props.type = "ghost";
              btn_props.size = size;
              if(v.disabled){
                btn_props.disabled = true;
              }
              if(type === "radio"){
                if(value){
                  if(v.value === value){
                    btn_props.type = hightlightType;
                  }
                }else if(this.state.currentValue){
                  if(v.value === this.state.currentValue){
                    btn_props.type = hightlightType;
                  }
                }else if(defaultValue){
                  if(v.value === defaultValue){
                    btn_props.type = hightlightType;
                  }
                }
              }else if(this.props.type === "checkbox"){
                if(!this.checkboxButtonValue){
                  this.checkboxButtonValue = {};
                }
                if(value && _.isArray(value)){
                  value.forEach((v,k)=>{
                    this.checkboxButtonValue[v] = true;
                  })
                  if(value.indexOf(v.value) !== -1){
                    btn_props.type = hightlightType;
                  }
                }else if(this.state.currentValue){
                  if(this.state.currentValue.indexOf(v.value) !== -1){
                    btn_props.type = hightlightType;
                  }
                }else if(defaultValue && _.isArray(defaultValue)){
                  defaultValue.forEach((v,k)=>{
                    this.checkboxButtonValue[v] = true;
                  })
                  if(defaultValue.indexOf(v.value) !== -1){
                    btn_props.type = hightlightType;
                  }
                }else {
                  console.error("value 或 defaultValue 不是数组类型！");
                  return false;
                }
              }
              return (
                <Button 
                  { ...btn_props }
                  key={ k } 
                  onClick={ this.onChange(v.value) }
                >
                  { v.label }
                </Button>
              )
            })
          }
        </Button.Group>
      </div>
    )  
  }
}

export default ButtonGroup; 
