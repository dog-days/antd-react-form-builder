import React from 'react'
import _ from 'lodash'
import BuilderDecorator from '../../decorator/Builder'
import renderItemDecorator from "../../decorator/RenderItem"
import NestedItemContainer from "../_util/NestedItemContainer"
import util from "../../util"
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
@renderItemDecorator
@BuilderDecorator
class NestFormBuilder extends React.Component {

  constructor(props){
    super(props);
    this.config = this.configAdapter();
    //不分类的数据
  }

  configAdapter(){
    var config = this.props.config;
    var data = [];
    config && config.forEach((v,k)=>{
      var uniqueKey = util.getUniqueKey();
      v.uniqueKey = uniqueKey; 
      v.feilds && v.feilds.forEach((v2,k2)=>{
        if(!v2){
          return;
        }
        if(!v2.originalName){
          v2.originalName = v2.name;
        }else {
          v2.name = v2.originalName;
        }
        uniqueKey = util.getUniqueKey();
        v2.name = uniqueKey + "-" + v2.name
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
        case "plus":
          var uniqueKey = util.getUniqueKey();
          var index_data = _.cloneDeep(data[index]);
          index_data.uniqueKey = uniqueKey;
          var temp_data = [];
          index_data.feilds.forEach((v,k)=>{
            uniqueKey = util.getUniqueKey();
            v.name = uniqueKey + "-" + v.originalName;
          })
          data.splice(index + 1,0,index_data);
        break;
        case "delete":
          data.splice(index,1);
        break;
      }
//console.debug(data);
      this.setState({})
    }
  }

  renderByNestedConfig(){
    return this.config && this.config[0] && this.config.map((v,k)=>{
      let {
        action,
        feilds,
        title,
        uniqueKey,
      } = v;
//console.debug("--",feilds)
      if(feilds){
        return (
          <NestedItemContainer 
            index={ k } 
            title={ title }
            key={ uniqueKey } 
            data={ this.config }
            action={ action }
          >
            <SimpleWithoutFormBuilder 
              config={ feilds }
            />
          </NestedItemContainer>
        )
      }else {
        let {
          title,
          ...other
        } = v;
//console.debug(this.dataWithoutGroup)
        return (
          <SimpleWithoutFormBuilder 
            key={uniqueKey}
            config={ [other] }
          />
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
        { this.renderByNestedConfig() }
        { this.props.children }
      </Form>
    );
  }
}

export default NestFormBuilder; 

