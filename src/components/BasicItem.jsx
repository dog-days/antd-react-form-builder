import React from 'react'
import schema from "async-validator"
import AntdForm from 'antd/lib/form'
import PureRender from '../decorator/PureRender'
import util from '../util'

let FormItem = AntdForm.Item;

@PureRender
class BasicItem extends React.Component {

  constructor(props){
    super(props);
    let {
      name,
      value,
      storage,
      rules,
      validateAll,
    } = this.props;
    this.state = {
      errors_type: "",
      errors_message: "",
    };
    //console.debug(this.context)
    this.validate(validateAll,true);
  }

  static PropTypes = {
    rules: React.PropTypes.array,
    type: React.PropTypes.string,
    name: React.PropTypes.string,
    formItemProps: React.PropTypes.object,
  }

  static contextTypes = {
    form: React.PropTypes.object,
    size: React.PropTypes.string,
    hasFeedback: React.PropTypes.bool,
    labelCol: React.PropTypes.object,
    wrapperCol: React.PropTypes.object,
    itemsValidateFnc: React.PropTypes.object,
  }

  componentDidMount(){
    let {
      name,
      storage,
      rules,
    } = this.props;
    var key = name + "-" + util.getUniqueKey();
    this.context.itemsValidateFnc[key] = this.commonValidate(name,storage,rules);
    //console.debug(this.context)
  }
  
  componentWillReceiveProps(nextProps){
    let {
      name,
      storage,
      rules,
      validateAll,
    } = nextProps;
    this.validate(validateAll);
  }
  /**
  * 公共验证方法
  * @param { string } name 表单项name
  * @param { object } name 表单项组件props之storage
  * @param { array } rules 表单项组件验证规则（asyc-validate ）
  */
  commonValidate = (name,storage,rules)=>{
    var _this = this;
    return function(errorCallback,successCallback){
      var descriptor = {};
      descriptor[name] = rules; 
      var validator = new schema(descriptor);
      var obj = { };
      obj[name] = storage.value;
      validator.validate(obj, (errors, fields) => {
        if(errors){
          errorCallback && errorCallback(errors,_this);
        }else {
          successCallback && successCallback(fields);
        }
      });
    }
  }

  
  getDealProp(props,index,defaultValue){
    if(props[index] === undefined){
      if(this.context[index]){
        props[index] = this.context[index];
      }else {
        props[index] = defaultValue;
      }
    }
  }

  addOtherPropsFromFormBuilder(props){
    this.getDealProp(props,"size","default");
    return props;
  }

  addFormItemPropsFromFormBuilder(props){
    this.getDealProp(props,"hasFeedback",false);
    this.getDealProp(props,"labelCol",null);
    this.getDealProp(props,"wrapperCol",null);
    return props;
  }
  /**
  * 当前表单组件验证，并提示
  * @param { boolean } validateAll 是否是整个表单验证（提交的时候）
  * @param { boolean } isConstructor 是否是当类构造器（构造函数实例化后只运行一次） 
  */
  validate(validateAll,isConstructor){
    let {
      name,
      storage,
      rules,
    } = this.props;
    var value = storage.value;
    if((value === undefined || value === null) && !validateAll ){
      return;
    }
    this.commonValidate(name,storage,rules)((errors)=>{
      //验证失败
      var message = "";
      errors.forEach((v,k)=>{
        if(k !== 0){
          message += "，" + v.message;
        }else {
          message += v.message;
        }
      })
      var obj = {
        errors_type: "error",
        errors_message: message,
      };
      if(!isConstructor){
        this.setState(obj)
      }else {
        this.state = obj;
      }
    },()=>{
      //验证成功
      var obj = {
        errors_type: "success",
        errors_message: "",
      };
      if(isConstructor){
        this.state = obj;
      }else {
        this.setState(obj)
      }
    });
  }

  onChange = (name,rules)=>{
    return (e)=>{
      var value;
      if(e && e.target){
        value = e.target.value;
      }else {
        value = e;
      }
      this.setState({
         random: util.getUniqueKey(),
      })
      //console.debug(value)
      if(this.props.storage){
        this.props.storage.value = value;
      }
      //console.debug(rules)
      if(rules[0]){
        this.validate(name,value,rules);
      }
  //console.debug(value,this.props)
      this.props.onChange && this.props.onChange(e);
    }
  }

  render() {
    let props = this.props;
    let {
      storage,//存储一些信息，如同步antd的value值
      validateAll,//在这只是为了解决原生html表单props多余报错问题
      children,
      rules = [],
      value,
      targetComponent,
      formItemProps={},
      ...other,
    } = props;
    other = this.addOtherPropsFromFormBuilder(other);
    formItemProps = this.addFormItemPropsFromFormBuilder(formItemProps);
    var FormItemComponent = targetComponent;
    var component; 
    if(!FormItemComponent){
      return false;
    }else if(children){
      //可以传子组件进来，像Select的option等
      component = ( 
        <FormItemComponent 
          {...other} 
          value={ storage.value }
          onChange={
            this.onChange(other.name,rules)
          }
        >
          { children }
        </FormItemComponent>
      )
    }else {
      component = (
        <FormItemComponent 
          {...other} 
          value={ storage.value }
          onChange={
            this.onChange(other.name,rules)
          }
        />
      )
    }

    if(other.type === "hidden") {
      return component;
    }
    var required = false;
    rules.forEach(v=>{
      if(v.required){
        required = true;
      }
    })
    //console.debug(this.state)
    return (
      <FormItem 
        {...formItemProps}
        required={ required }
        validateStatus={this.state.errors_type}
        help={this.state.errors_message}
      >
        { component }
      </FormItem>
    ) 
  }
}

export default BasicItem; 

