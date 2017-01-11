import React from 'react'
import PureRender from "../../decorator/PureRender"
import renderItemDecorator from "../../decorator/RenderItem"
import ItemButtonGroupDecorator from "../../decorator/ItemButtonGroup"
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
import {
  Card,
} from "antd"

/**
 * SimpleFormBuilder 
 * @prop {String} size size 设置表单子项（包括antd Input、Select等和FormItem）size，表单子项size优先级更高
 * @prop {function} onSubmit 类似于antd Form中的onSumbit，不过多了两个输入参数
 *                          （源自于antd this.props.form.validateFields），
 *                           只有通过此方法才可获得FormBuilder的所有表单值 
 * @prop {Boolean} hasFeedback 表单验证在FormItem是否反馈，表单子项hasFeedback优先级更高 
 * @prop {Object} config FormBuilder 配置项，表单就是从这些配置中渲染出来的 （可选） 
 */
@PureRender
@ItemButtonGroupDecorator
@renderItemDecorator
class SimpleWithoutFormBuilder extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
  }

  setChangeState = ()=>{
    var random = util.getUniqueKey();
    this.setState({
      random,
    })
  }

  onButtonGroupClick = (data,index)=>{
    return (btn_index)=>{
      switch(btn_index){
        case "plus":
          var index_data = _.cloneDeep(data[index]);
          index_data.forEach((v,k)=>{
            //改变key值
            v.key = util.getUniqueKey();
            //还原name
            v.name = v.origin_name;
            //还原repeat_count
            v.repeat_count = null;
            v.storage = {
              value: v.value,
            }
          })
          data.splice(index + 1, 0, index_data);
          break;
        case "delete":
          data.splice(index, 1);
          break;
      }
      this.setChangeState();
      //console.debug(index,data);
    }
  }

  configRender(config,name){
    return config && config.map((v,k)=>{
      var isElement = true;
      var Element,element_props = { };
      var e_name;
      if(name && !v.repeat_count){
        v.origin_name = v.name;
        //第一次渲染处理
        e_name = `${name}[${v.name}]`;
      }else {
        e_name = v.name;
      }
      switch(v.data_type){
        case "object":
        case "array":
          isElement = false;
          break;
        default:
          isElement = true;
          if(!v.storage){
            v.storage = {
              value: v.value,
            };
          } 
          var type = v.data_type;
          switch(v.data_type){
            case "string":
              type = "text";
            break;
            case "integer":
            case "float":
              type = "number";
            break;
          }
//console.debug(e_name);
          element_props = {
            name: e_name,
            type: type,
            key: v.key,
            storage: v.storage,
            value: v.value,
            formItemProps: Object.assign({},v.formItemProps || {},{
              label: v.label,
            }),
            rules: Object.assign([],[
              {
                required: !!parseInt(v.required,10),
                message: "请不要留空"
              }
            ],v.rules || []),
            validateAll: this.props.validateAll,
          }
          v.rules = element_props.rules; 
          v.name = element_props.name; 
          //重复渲染次数
          if(!v.repeat_count){
            v.repeat_count = 0;
          }
          v.repeat_count++; 
//console.debug(v);
          Element = this.getFormItemComponentByType(v.data_type);
      }
      var temp_name = e_name;
      return (
        <div key={ k }>
          {
            !isElement 
            && v.data_type === "array" 
            && v.children 
            && v.children[0] 
            && v.children[0][0] &&
            <Card title={ v.label } className="mb10">
              {
                v.children.map((v2,k2)=>{
                  var array_title;
                  array_title = this.buttonGroupAdapter({
                    plus_action: true,
                    close_action: true,
                  },k2,v.children);
                  e_name = `${ temp_name }[${ k2 }]`; 
                  return (
                    <Card title={ array_title } className="mb10" key={ v2[0].key }>
                      { this.configRender(v2,e_name) }
                    </Card>
                  )
                })
              }
            </Card>
          }
          {
            !isElement 
            && v.data_type !== "array" 
            && v.children 
            && v.children[0] && 
            <Card title={ v.label } className="mb10">
              { 
                v.data_type !== "array" && 
                this.configRender(v.children,e_name) 
              }
            </Card>
          }
          {
            isElement && !v.children &&
            <Element { ...element_props }/>
          }
        </div>
      )
    })
  }

  render() {
    let { 
      className,
      config,
      onChange,
      ...other 
    } = this.props;
    other.className = className + " builder-without-form-con";
    return (
      <div>
        { this.configRender(config) }
      </div>
    )
  }
}

export default SimpleWithoutFormBuilder;


