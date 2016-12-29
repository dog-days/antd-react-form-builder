import React from 'react'
import Input from './index'
import ItemContainer from "../_util/NestItemContainer"
import renderItemDecorator from "../../decorator/RenderItem"
import _ from 'lodash'
import util from "../../util"

@renderItemDecorator
class InputNest extends React.Component {
  constructor(props){
    super(props);
    this.data = this.configAdapter();
  }

  static childContextTypes = {
    onButtonGroupClick: React.PropTypes.func,
  }

  getChildContext(){
    return {
      onButtonGroupClick: this.onButtonGroupClick,
    }
  }

  //config数据适配
  configAdapter(){
    let {
      array, 
      ...other,
    } = this.props;
    array.forEach((a_v,a_k)=>{
      var uniqueKey = util.getUniqueKey();
      var formItemProps = Object.assign({},other.formItemProps,{
        className: "none-label-con",
      })
      if(a_k === 0){
        formItemProps = other.formItemProps;
      }
      var targetData = array[a_k];
      //存储antd表单value同步信息
      var storage;
      if(!targetData.storage){
        storage = {value: a_v.value};
      }
      targetData = Object.assign({},other,{
        formItemProps,
      },a_v,{
        array: null,
        nestedType: null,
        uniqueKey,
        fieldDecoratorName: other.name + `-[${ uniqueKey }]`,
        name: other.name + `-[${ uniqueKey }]`,
        storage, 
      });
//console.debug(other,targetData,"--",a_v)
      if(targetData.formItemProps.wrapperCol  && targetData.formItemProps.labelCol){
        if((targetData.formItemProps.wrapperCol.span + targetData.formItemProps.labelCol.span) > 24){
          if(a_k !== 0){
            targetData.formItemProps.label = null;
          }
        }
      }else {
        if(a_k !== 0){
          targetData.formItemProps.label = null;
        }
      }
      array[a_k] = targetData;
    })
//console.debug(array)
    return array; 
  } 

  onButtonGroupClick = (data,index)=>{
//console.debug(data)
    return (btn_index)=>{
      var first_formItemProps = data[0].formItemProps; 
      switch(btn_index){
        case "up":
          util.swapArrayItem(data,index,index - 1);
        break;
        case "down":
          util.swapArrayItem(data,index,index + 1);
        break;
        case "plus":
          var uniqueKey = util.getUniqueKey();
          data.splice(index + 1,0,Object.assign({},data[index],{
            fieldDecoratorName: data[index].name.split("-")[0] + `-[${ uniqueKey }]`,
            uniqueKey, 
            value: "",
            name: data[index].name.split("-")[0] + `-[${ uniqueKey }]`, 
          }));
        break;
        case "delete":
          data.splice(index,1);
        break;
      }
      //重新设置formItemProps值
      data.forEach((v,k)=>{
        if(k == 0){
          v.formItemProps = first_formItemProps;
        }else {
          v.formItemProps = Object.assign({},v.formItemProps,{
            className: "none-label-con",
          })
          if(v.formItemProps.wrapperCol  && v.formItemProps.labelCol){
            if((v.formItemProps.wrapperCol.span + v.formItemProps.labelCol.span) > 24){
              v.formItemProps.label = null;
            }
          }else {
            v.formItemProps.label = null;
          }
        }
      })
      //console.debug(data)
      this.setState({})
    }
  }

  render(){
    if(!this.data){
      return false;
    }
    return (
      <div>
        { this.renderItemByArray(this.data,ItemContainer) }
      </div>
    )
  }
}

export default InputNest; 



