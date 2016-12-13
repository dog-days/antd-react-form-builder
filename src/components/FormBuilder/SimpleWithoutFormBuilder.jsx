import React from 'react'
import BuilderDecorator from '../../decorator/Builder'
import renderItemDecorator from "../../decorator/RenderItem"
import ItemContainer from "../_util/NestItemContainer"
import util from "../../util"
import _ from 'lodash'
import { 
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  TimePicker,
} from '../../FormItemBind'

/**
 * SimpleFormBuilder 
 * @prop {String} size size 设置表单子项（包括antd Input、Select等和FormItem）size，表单子项size优先级更高
 * @prop {function} onSubmit 类似于antd Form中的onSumbit，不过多了两个输入参数
 *                          （源自于antd this.props.form.validateFields），
 *                           只有通过此方法才可获得FormBuilder的所有表单值 
 * @prop {Boolean} hasFeedback 表单验证在FormItem是否反馈，表单子项hasFeedback优先级更高 
 * @prop {Object} config FormBuilder 配置项，表单就是从这些配置中渲染出来的 （可选） 
 */

@renderItemDecorator
class SimpleWithoutFormBuilder extends React.Component {

  constructor(props){
    super(props);
    if(this.props.config){
      this.config = this.configAdapter();
    }
  }

  //config数据适配
  configAdapter(){
    var feilds = this.props.config;
    var data = [];
//console.debug(feilds)
    feilds && feilds.forEach((v,k)=>{
      var uniqueKey = Math.floor(Math.random(10000000) * 10000000) + "";
      v.uniqueKey = uniqueKey;
      if(v.array && _.isArray(v.array)){
        v.nestedType = "InputNest";
      }else if(v.type !== "button"){
        v.fieldDecoratorName = v.name;
      }
      data.push(v);
    })
    return data; 
  }

  render() {
    let { 
      className,
      config,
      ...other 
    } = this.props;
    other.className = className + " builder-without-form-con";
    config = this.config;
//console.debug(config)
    return (
      <div { ...other } >
        { 
          config 
          && config[0] 
          && this.renderItemByArray(config) 
        }
        { this.props.children }
      </div>
    );
  }
}

export default SimpleWithoutFormBuilder;

