import React from 'react'
import _ from 'lodash'
import BuilderDecorator from '../../decorator/Builder'
import renderItemDecorator from "../../decorator/RenderItem"
import NestedItemContainer from "../_util/NestedItemContainer"
import SimpleItemContainer from "../_util/NestItemContainer"
import util from "../../util"
import GroupWithoutFormBuilder from './GroupWithoutFormBuilder'
import SimpleWithoutFormBuilder from './SimpleWithoutFormBuilder'
import { 
  Form,
} from '../../FormItemBind'

/**
 * NestFormBuilder 
 * @prop {String} size size 设置表单子项（包括antd Input、Select等和FormItem）size，表单子项size优先级更高
 * @prop {function} onSubmit 类似于antd Form中的onSumbit，不过多了两个输入参数
 *                          （源自于antd this.props.form.validateFields），
 *                           只有通过此方法才可获得FormBuilder的所有表单值 
 * @prop {Boolean} hasFeedback 表单验证在FormItem是否反馈，表单子项hasFeedback优先级更高 
 * @prop {Object} config FormBuilder 配置项，表单就是从这些配置中渲染出来的 （可选） 
 */
@BuilderDecorator
class GroupFormBuilder extends React.Component {

  constructor(props){
    super(props);
    this.config = this.configAdapter();
  }

  configAdapter(){
    var config = this.props.config;
    var data = [];
    config && config.forEach((v,k)=>{
      var uniqueKey = util.getUniqueKey();
      v.uniqueKey = uniqueKey; 
      v.uniqueKeyNestedSpecial = util.getUniqueKey(); 
      v.nest && v.nest.forEach((v2,k2)=>{
        if(!v2){
          return;
        }
        if(v2.feilds && _.isBoolean(v2.action)){
          v2.action = {
            up_action: true,
            down_action: true,
            plus_action: true,
            close_action: true,
          }
        }
      })
      data.push(v);
    })
//console.debug(data)
    return config; 
  }
  
  onButtonGroupClick(data,index){
//console.debug(index)
    return (btn_index)=>{
      switch(btn_index){
        case "up":
          util.swapArrayItem(data,index,index - 1);
        break;
        case "down":
          util.swapArrayItem(data,index,index + 1);
        break;
      }
//console.debug(data);
      this.setState({})
    }
  }

  renderByNestedConfig(config){
//console.debug(config)
    return config && config[0] && config.map((v,k)=>{
      let {
        action,
        nest,
        title,
        uniqueKey,
        uniqueKeyNestedSpecial,
      } = v;
      if(_.isBoolean(action)){
        action = {
          up_action: true,
          down_action: true,
          plus_action: false,
          close_action: false,
        };
      }
      if(nest){
        return (
          <NestedItemContainer 
            index={ k } 
            title={ title }
            key={ uniqueKey } 
            data={ config }
            action={ action }
          >
            <GroupWithoutFormBuilder
              config={ nest }
            />
          </NestedItemContainer>
        )
      }else {
        return (
          <SimpleItemContainer 
            index={ k } 
            title={ title }
            key={ uniqueKeyNestedSpecial } 
            data={ config }
            action={ action }
          >
            <SimpleWithoutFormBuilder
              config={ [v] }
            />
          </SimpleItemContainer>
        )
      }
    })
  }

  render() {
    let { 
      config,
      form,
      size,
      hasFeedback,
      labelCol,
      wrapperCol,
      className = "",
      ...other 
    } = this.props;
    other.className = className + " builder-con builder-group-con";
    return (
      <Form { ...other } >
        { this.renderByNestedConfig(this.config) }
        { this.props.children }
      </Form>
    );
  }
}

export default GroupFormBuilder; 

