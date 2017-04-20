import React, { PropTypes } from 'react'
import _ from 'lodash'
import util from '../util'

let propTypes = {
  size: React.PropTypes.string,
  hasFeedback: React.PropTypes.bool,
  labelCol: React.PropTypes.object,
  wrapperCol: React.PropTypes.object,
  config: React.PropTypes.array,
}

let childContextTypes = {
  size: React.PropTypes.string,
  hasFeedback: React.PropTypes.bool,
  labelCol: React.PropTypes.object,
  wrapperCol: React.PropTypes.object,
  inline: React.PropTypes.bool,
  setFieldValueFunc: React.PropTypes.object,
  itemsValidateFunc: React.PropTypes.object,
  selectSourceData: React.PropTypes.object,
}

let contextTypes = {
  formBuilder: React.PropTypes.object,
}
function create(){
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
/**
* formBuilderConfig value赋值（根据FormBuilder的表单结构所存储的值来赋值） 
* @param { array } formBuilderConfig FormBuilder组件的props.config
* @param { object } data  FormBuilder的表单结构所存储的值
*/
function valuesToConfig(formBuilderConfig,data){
  formBuilderConfig.forEach((v,k)=>{
    if(v.type === "array"){
      v.type = "table";
    }
    if(!v.key){
      v.key = util.getUniqueKey();
    }
    if(!v.children){
      if(data[v.name] !== undefined){
        v.value = data[v.name];
      }
    }else if(v.type === "object" && v.children){
      if(data[v.name] !== undefined){
        valuesToConfig(v.children,data[v.name]);
      }
    }else if(v.type === "table" && v.children){
      if(data[v.name] !== undefined){
        var arr = [];
        var temp_data = data[v.name];
        temp_data.forEach((v2,k2)=>{
          var temp = _.cloneDeep(v.children[0]);
          //处理key值
          temp.forEach((v3,k3)=>{
            v3.key = util.getUniqueKey();
          })
          valuesToConfig(temp,v2);
          arr.push(temp)
        //console.debug(v)
        })
        v.children = arr;
      }
    }
  })
  return formBuilderConfig;
}

function getChildContext(){
  return {
    size: this.props.size,
    hasFeedback: this.props.hasFeedback,
    labelCol: this.props.labelCol,
    wrapperCol: this.props.wrapperCol,
    inline: this.props.inline,
    setFieldValueFunc: this.setFieldValueFunc,
    itemsValidateFunc: this.itemsValidateFunc,
    selectSourceData: this.props.selectSourceData,
  }
} 

function builderDecorator(component){
  component.propTypes = propTypes;
  component.childContextTypes = childContextTypes;
  component.contextTypes = contextTypes;
  component.create = create;
  component.valuesToConfig = valuesToConfig;
  component.prototype.getChildContext = getChildContext;
}
export default builderDecorator;
