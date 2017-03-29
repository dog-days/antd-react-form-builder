import React, { PropTypes } from 'react'
import _ from 'lodash'
import AntdForm from 'antd/lib/form'
import { 
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  TimePicker,
} from '../../FormItemBind'
import SimpleFormBuilder from './SimpleFormBuilder'
import util from '../../util'

/**
 * FormBuilder 
 * @prop {String} size size 设置表单子项（包括antd Input、Select等和FormItem）size，表单子项size优先级更高
 * @prop {function} onSubmit 类似于antd Form中的onSumbit，不过多了两个输入参数
 *                          （源自于antd this.props.form.validateFields），
 *                           只有通过此方法才可获得FormBuilder的所有表单值 
 * @prop {Boolean} hasFeedback 表单验证在FormItem是否反馈，表单子项hasFeedback优先级更高 
 * @prop {Object} config FormBuilder 配置项，表单就是从这些配置中渲染出来的 （可选） 
 */
class FormBuilder extends React.Component {

  constructor(props){
    super(props);
    //存放各个表单项设置value的方法
    this.setFieldValueFunc = { };
  }

  componentDidMount(){
    if(!this.context.formBuilder){
      return;
    }
    this.context.formBuilder.setFieldsValue = (values)=>{
      for(var k in values){
        this.setFieldValueFunc[k](values[k]);
      }
    }
  }

  static contextTypes = {
    formBuilder: React.PropTypes.object,
  }

  static childContextTypes = {
    setFieldValueFunc: React.PropTypes.object,
  } 

  static create(){
    class Decorator extends React.Component {

      constructor(props){
        super(props);
        this.formBuilder = {};
      }

      static childContextTypes = {
        formBuilder: PropTypes.object.isRequired,
      }

      getChildContext() {
        return {
          formBuilder: this.formBuilder,
        };
      }

      render(){
        var WrapperComponent = this.getWrapperComponent(); 
        return (
          <WrapperComponent 
            { ...this.props }
            formBuilder={ this.formBuilder }
          />
        )
      }
    }
    return (WrappedComponent)=>{
      function getDisplayName(WrappedComponent) {
        return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
      }
      Decorator.displayName = `FormBuilder(${getDisplayName(WrappedComponent)})`;
      Decorator.prototype.getWrapperComponent = ()=>WrappedComponent; 
      return Decorator;
    }
  }

  getChildContext(){
    return {
      setFieldValueFunc: this.setFieldValueFunc,
    }
  } 

  /**
  * formBuilderConfig value赋值（根据FormBuilder的表单结构所存储的值来赋值） 
  * @param { array } formBuilderConfig FormBuilder组件的props.config
  * @param { object } data  FormBuilder的表单结构所存储的值
  */
  static valuesToConfig(formBuilderConfig,data){
    formBuilderConfig.forEach((v,k)=>{
      if(!v.key){
        v.key = util.getUniqueKey();
      }
      if(!v.children){
        if(data[v.name] !== undefined){
          v.value = data[v.name];
        }
      }else if(v.data_type === "object" && v.children){
        if(data[v.name] !== undefined){
          FormBuilder.valuesToConfig(v.children,data[v.name]);
        }
      }else if(v.data_type === "array" && v.children){
        if(data[v.name] !== undefined){
          var arr = [];
          var temp_data = data[v.name];
          temp_data.forEach((v2,k2)=>{
            var temp = _.cloneDeep(v.children[0]);
            //处理key值
            temp.forEach((v3,k3)=>{
              v3.key = util.getUniqueKey();
            })
            FormBuilder.valuesToConfig(temp,v2);
            arr.push(temp)
          //console.debug(v)
          })
          v.children = arr;
        }
      }
    })
    return formBuilderConfig;
  }

  render() {
//console.debug(this.context.form)
    let {
      config,
      groupConfig,
      nestedConfig,
      ...other,
    } = this.props;
    if(groupConfig){
      other.config = groupConfig;
      return (
        <div/>
      )
    }else if(nestedConfig){
      other.config = nestedConfig;
      return (
        <div/>
      )

    } else {
      other.config = config;
      return (
        <SimpleFormBuilder { ...other } />
      )
    }
  }
}

export default FormBuilder


