import React from 'react'
import _ from 'lodash'
import schema from "async-validator"
import AntdForm from 'antd/lib/form'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'
import AntdInput from 'antd/lib/input'
import PureRender from '../decorator/PureRender'
import ItemButtonGroupDecorator from '../decorator/ItemButtonGroup'
import util from '../util'

let FormItem = AntdForm.Item;


/**
 * 所有表单组件的公共处理部分
 * @prop { string } type 组件类型 
 * @prop { string } name 跟原生的html一样，同时async-validator要用到（表单验证），取值要用到，要唯一。 
 * @prop { array } rules 参考 async-validatord的rules。
 * @prop { object } formItemProps 跟antd的Form.Item的props完全一致，请参考Form.Item，这个不经常使用。
 */
@PureRender
@ItemButtonGroupDecorator
class BasicItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      errors_type: "",
      errors_message: "",
    };
    //console.debug(this.context)
    this.validate(this.props,true);
  }

  static propTypes = {
    type: React.PropTypes.string,
    rules: React.PropTypes.array,
    name: React.PropTypes.string,
    formItemProps: React.PropTypes.object,
  }

  static contextTypes = {
    form: React.PropTypes.object,
    size: React.PropTypes.string,
    hasFeedback: React.PropTypes.bool,
    labelCol: React.PropTypes.object,
    wrapperCol: React.PropTypes.object,
    inline: React.PropTypes.bool,
    itemsValidateFunc: React.PropTypes.object,
    setFieldValueFunc: React.PropTypes.object,
  }

  componentDidMount(){
    this.bindValidate(this.props);  
    this.bindSetFieldValue(this.props);
  }

  componentWillReceiveProps(nextProps){
    this.bindValidate(nextProps);  
    this.bindSetFieldValue(nextProps);
    this.validate(nextProps);
  }
  componentWillUnmount(){
    //销毁时，删除验证函数
    if(this.context.itemsValidateFunc){
      delete this.context.itemsValidateFunc[this.key];
    }
  }

  /**
  * 公共验证方法
  * @param { object } props 当前组件props或结构差不多的object对象 
  */
  commonValidate = (props)=>{
    let {
      name,
      storage,
      rules,
      type,
    } = props;
//console.debug("dddd",name,storage)
    return (errorCallback,successCallback)=>{
      if(!rules || (rules && !rules[0])){
        return false;
      }
      var descriptor = {};
      descriptor[name] = rules; 
      var validator = new schema(descriptor);
      var obj = { };
      switch(type){
        case "number":
        case "float":
        case "integer":
          if(storage.value){
            obj[name] = Number(storage.value);
          }
        break;
        default:
          obj[name] = storage.value;
      }
//console.debug(obj[name])
      validator.validate(obj, (errors, fields) => {
        if(errors){
          errorCallback && errorCallback(errors,this);
        }else {
      //console.debug(fields)
          successCallback && successCallback(fields);
        }
      });
    }
  }

  bindValidate(props){
    let {
      name,
      uniqueKey,
    } = props;
    if(this.key){
      if(this.context.itemsValidateFunc){
        delete this.context.itemsValidateFunc[this.key];
      }
    }
    if(uniqueKey){
      this.key = name + "-" + uniqueKey;
    }else {
      this.key = name;
    }
    if(this.context.itemsValidateFunc){
      this.context.itemsValidateFunc[this.key] = this.commonValidate(props);
    }
    //console.debug(this.context)
  }

  bindSetFieldValue(props){
    if(this.context.setFieldValueFunc){
      this.context.setFieldValueFunc[props.name] = (value)=>{
        props.storage.value = value;
        this.setState({
          random: util.getUniqueKey(),
        })
        this.setArrayValue = true;
        this.validate(props);
      };
    }
  }

  /**
  * 当前表单组件验证，并提示
  * @param { object } props 当前组件props 
  * @param { boolean } isConstructor 是否是当类构造器（构造函数实例化后只运行一次） 
  */
  validate(props,isConstructor){
    let {
      name,
      storage,
      value,
      rules,
      //是否是整个表单验证（提交的时候）
      validateAll,
    } = props;
    if((storage.value === undefined || storage.value === null) && !validateAll ){
      return;
    }
    this.commonValidate(props)((errors)=>{
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
    },(fields)=>{
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

  onChange = (rules)=>{
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
        this.validate(this.props);
      }
  //console.debug(value,this.props)
      this.props.onChange && this.props.onChange(e);
    }
  }

  onButtonChange = (data,index)=>{
    return (btn_index)=>{
      switch(btn_index){ 
        case "up":
          util.swapArrayItem(data,index,index - 1);
          break;
        case "down":
          util.swapArrayItem(data,index ,index + 1);
          break;
        case "delete":
          //console.debug(data,index)
          data.splice(index, 1);
          break;
      }
      this.setState({
        random: util.getUniqueKey(),
      })
    }
  }

  onAddClick = (data,index)=>{
    return (e)=>{
      var index_data = _.cloneDeep(data[index]);
      index_data.key = util.getUniqueKey();
      index_data.storage = { };
      data.splice(index + 1, 0, index_data);
      this.setState({
        random: util.getUniqueKey(),
      })
    }
  }

  renderArrayItem(){
    let {
      storage,
      label,
      type,
    } = this.props;
    if(this.props.array && type !== "select" && type !== "multiple-select"){
      if(!storage.arrayProps){
        var obj;
        storage.arrayProps = [];
        if(_.isString(this.props.storage.value) || !this.props.storage.value){
          obj = _.cloneDeep(this.props);
          obj.key = util.getUniqueKey();
          storage.arrayProps = [obj];
        }else if(_.isArray(this.props.storage.value)){
          storage.value.forEach((v,k)=>{
            obj = _.cloneDeep(this.props);
            obj.key = util.getUniqueKey();
            obj.value = v;
            obj.storage = {
              value: v,
            }
            storage.arrayProps.push(obj);
          })
        }
      }else {
        if(this.setArrayValue){
          storage.arrayProps.forEach((v,k)=>{
            v.value = storage.value[k];
            v.storage.value = storage.value[k];
          })
          this.setArrayValue = false;
        }
      }
      return (
        <span>
          {
            storage.arrayProps.map((v,k)=>{
              //v.storage.value = undefined;
              var className = "array-item-none-label";
              if(label){
                className = "array-item-has-label";
              }
              if(k !== 0){
                className = "array-item-none-label";
              }
              return (
                <div key={ v.key } className={className + " clearfix"}>
                  <div className="array-item-con">
                    <div className="array-item-left">
                      <BasicItem 
                        { ...v } 
                        name={
                          `${ v.name }[${ k }]` 
                        }
                        array={ false }
                      />
                    </div>
                    <div className="array-item-right">
                      <div>
                        {
                          this.buttonGroupAdapter({
                            up_action: true,
                            down_action: true,
                            delete_action: true,
                          },k,storage.arrayProps)
                        }
                      </div>
                    </div>
                  </div>
                  {
                    k === storage.arrayProps.length - 1 &&
                    <Button 
                      type="primary" 
                      className="array-item-add-btn fr"
                      onClick={ this.onAddClick(storage.arrayProps,k) }
                    >
                      <Icon type="plus"/>
                    </Button>
                  }
                </div>
              )
            })
          }
        </span>
      ) 
    }
  }

  render() { 
    let props = this.props;
    let {
      min,//在这只是为了解决原生html表单props多余问题
      max,//在这只是为了解决原生html表单props多余问题
      onlyLetter,//在这只是为了解决原生html表单props多余报错问题
      validateAll,//在这只是为了解决原生html表单props多余报错问题
      array,//在这只是为了解决原生html表单props多余报错问题
      uniqueKey,//在这只是为了解决原生html表单props多余报错问题
      label,//在这只是为了解决原生html表单props多余报错问题
      storage,//存储一些信息，如同步antd的value值
      children,
      rules = [],
      value,
      targetComponent,
      formItemProps={},
      ...other,
    } = props;
    other = this.addOtherPropsFromFormBuilder(other);
    formItemProps = this.addFormItemPropsFromFormBuilder(formItemProps);
    //渲染array类型的Item
    var arrayItem = this.renderArrayItem(); 
    if(arrayItem){
      return arrayItem;
    }
    //消除原生表单required属性的影响
    delete other.required;
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
            this.onChange(rules)
          }
        >
          { children }
        </FormItemComponent>
      )
    }else {
      var temp_name;
      if(other.type !== "timepicker"){
        temp_name = other.name;
      }
      component = (
        <FormItemComponent 
          {...other} 
          name={ temp_name }
          value={ storage.value }
          onChange={
            this.onChange(rules)
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
    //console.debug(other.name,this.state.errors_type)
    //console.debug(other.name,rules)
    var errors_type = this.state.errors_type;
    if(!rules[0]){
      errors_type= null;
    }
    return (
      <span> 
        <FormItem 
          {...formItemProps}
          required={ required }
          validateStatus={ errors_type }
          help={this.state.errors_message}
        >
          { component }
        </FormItem>
        {
          (
            other.type === "radiogroup" ||
            other.type === "select" 
          ) &&
          //处理timepicker这种，无法设置name的表单组件
          <AntdInput 
            type="hidden" 
            name={ other.name }
            value={ storage.value }
          />
        }
        {
          (
            other.type === "monthpicker" ||
            other.type === "timepicker" ||
            other.type === "datepicker"
          ) &&
          //处理timepicker这种，无法设置name的表单组件
          <AntdInput 
            type="hidden" 
            name={ other.name }
            value={ Math.floor(+storage.value / 1000) }
          />
        }
        {
          other.type === "rangepicker"  && 
          storage.value && storage.value.map((v,k)=>{
            return (
              <span key={ k }>
                <AntdInput 
                  type="hidden" 
                  name={ other.name }
                  value={ Math.floor(+v / 1000) }
                />
              </span>
            )
          })
        }
        {
          (
            other.type === "cascader" ||
            other.type === "multiple-select" || 
            other.type === "checkboxgroup" 
          ) && 
          storage.value && storage.value.map((v,k)=>{
            return (
              <span key={ k }>
                <AntdInput 
                  type="hidden" 
                  name={ other.name }
                  value={ v }
                />
              </span>
            )
          })
        }
      </span>
    ) 
  }
}

export default BasicItem; 

