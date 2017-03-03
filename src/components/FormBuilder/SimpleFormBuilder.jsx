import React from 'react'
import ReactDOM from 'react-dom'
import schema from "async-validator"
import _ from 'lodash'
import serialize from "form-serialize" 
import BuilderDecorator from '../../decorator/Builder'
import ItemContainer from "../_util/NestItemContainer"
import util from "../../util"
import SimpleWithoutFormBuilder from "./SimpleWithoutFormBuilder"
import { 
  Form
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
@BuilderDecorator
class SimpleFormBuilder extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    //表单各个输入组件验证方法存储
    this.itemsValidateFunc = {};
    this.errors = [];
    //表单错误信息存放
    this.errors = [];
    //是否验证全部表单（提交表单时用到）
    this.validateAll = false;
  }

  componentDidMount(){
    var formDom = ReactDOM.findDOMNode(this.refs.formBuilder);
    this.context.formBuilder.validateFields = (callback)=>{
      this.errors = [];
      //表单验证
      for(var k in this.itemsValidateFunc){
        this.itemsValidateFunc[k]((errors,currentFormItem)=>{
          //console.debug(k)
          this.errors.push(errors);
          //使用jsx style组件，特殊处理
          if(!this.props.config){
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
            currentFormItem.setState(obj)
          }
        });
      }
      var values = serialize(formDom, { hash: true });
      if(this.errors[0]){
        this.setState({
          random: util.getUniqueKey(),
          validateAll: true,
        })
        callback(this.errors,values);
      }else {
        callback(null,values);
      }
    }
  }

  render() {
    let { 
      form,
      size,
      config,
      hasFeedback,
      labelCol,
      wrapperCol,
      className,
      selectSourceData,
      ...other 
    } = this.props;
    other.className = className + " builder-con";
    return (
      <Form { ...other } ref="formBuilder">
        {
          config &&
          <SimpleWithoutFormBuilder 
            config={ config }
            random={ this.state.random }
            validateAll={ this.state.validateAll }
          />
        }
        { this.props.children }
      </Form>
    );
  }
}

export default SimpleFormBuilder


