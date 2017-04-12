import React, { PropTypes } from 'react'
import PureRender from "../../decorator/PureRender"
import _ from 'lodash'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import Card from 'antd/lib/card'
import renderItemDecorator from "../../decorator/RenderItem"
import IconGroup from "../_util/IconGroup"
import util from "../../util"

/**
 * FormBuilderWidthConfig 
 * 通过配置生成各种表单项，包括嵌套的，理论上可以无限嵌套。
 * @prop { array } config 配置数据
 * @prop { boolean } validateAll 是否验证全部表单项
 */
@PureRender
@renderItemDecorator
class FormBuilderWidthConfig extends React.Component {

  static propTypes = {
    config: React.PropTypes.array.isRequired,
    validateAll: React.PropTypes.bool,
  }

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

  onIconClick = (data,index)=>{
    return (btn_index)=>{
      switch(btn_index){ 
        case "up":
          util.swapArrayItem(data,index,index - 1);
          break;
        case "down":
          util.swapArrayItem(data,index ,index + 1);
          break;
        case "delete":
          data.splice(index, 1);
          break;
      }
      //重置name，和repeat_count值
      data.forEach((v,k)=>{
        v.forEach((v2,k2)=>{
          v2.name = v2.origin_name;
          delete v2.origin_name;
          delete v2.repeat_count;
        })
      })
      this.setChangeState();
      //console.debug(index,data);
    }
  }

  onAddClick = (data,index)=>{
    return (e)=>{
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
      this.setChangeState();
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
      //兼容处理
      if(v.data_type && !v.type){
        v.type = v.data_type;
      }
      if(v.type === "array"){
        v.type = "table";
      }
      var required = util.convertStringOfTrueAndFalseToBollean(v.required);
      var rules = v.rules || [];
      switch(v.type){
        case "object":
        case "table":
          isElement = false;
          break;
        default:
          isElement = true;
          if(!v.storage){
            v.storage = {
              value: v.value,
            };
          } 
          var type = v.type;
          //console.debug(v)
          element_props = {
            required,
            array: util.convertStringOfTrueAndFalseToBollean(v.array),
            min: parseInt(v.min,10),
            max: parseInt(v.max,10),
            name: e_name,
            type: type,
            key: v.key,
            uniqueKey: v.key,
            storage: v.storage,
            value: v.value,
            label: v.label,
            formItemProps: v.formItemProps || {},
            rules: rules,
            validateAll: this.props.validateAll,
          }
          v.rules = element_props.rules; 
          v.name = element_props.name; 
          //重复渲染次数
          if(!v.repeat_count){
            v.repeat_count = 0;
          }
          v.repeat_count++; 
          switch(v.type){
            case "string":
              type = "text";
            break;
            case "dropdown":
              type = "select";
              //字段配置时选择的select数据源
              element_props.select_target = v.select_target;
            break;
            case "boolean":
              element_props.boolean = true;
              type = "select";
            break;
          }
  //console.debug(v);
          Element = this.getFormItemComponentByType(type);
      }
      var temp_name = e_name;
      return (
        <div key={ k }>
          {
            !isElement 
            && v.type === "table" 
            && v.children 
            && v.children[0] 
            && v.children[0][0] &&
            <Card title={ v.label } className="mb10 array-card-con">
              {
                v.children.map((v2,k2)=>{
                  var array_title;
                  var otherProps = { }
                  if(v.children.length !== 1){
                    array_title = (
                      <IconGroup 
                        action={
                          {
                            up_action: true,
                            down_action: true,
                            delete_action: true,
                          }
                        }
                        index={ k2 }
                        data={ v.children }
                        onIconClick={
                          this.onIconClick(v.children,k2)
                        }
                      />
                    )
                    otherProps.title = array_title; 
                  }
                  e_name = `${ temp_name }[${ k2 }]`; 
                  return (
                    <div 
                      key={ v2[0].key }
                    >
                      <Card 
                        { ...otherProps }
                        className="array-card mb10"
                      >
                        { this.configRender(v2,e_name) }
                      </Card>
                      {
                        k2 === (v.children.length -1) &&
                        <Button 
                          className="builder-add-btn"
                          type="primary"
                          onClick={
                            this.onAddClick(v.children,k2)
                          }
                        >
                          <Icon type="plus"/>
                        </Button>
                      }
                    </div>
                  )
                })
              }
            </Card>
          }
          {
            !isElement 
            && v.type !== "table" 
            && v.children 
            && v.children[0] && 
            <Card title={ v.label } className="mb10 not-array-card-con">
              { 
                v.type !== "table" && 
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

export default FormBuilderWidthConfig;


