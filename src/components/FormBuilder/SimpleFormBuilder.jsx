import React from 'react'
import _ from 'lodash'
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
      ...other 
    } = this.props;
//console.debug(this.props.children)
    other.className = className + " builder-con";
//console.debug(this.config)
    return (
      <Form { ...other } >
        <SimpleWithoutFormBuilder config={ config }/>
        { this.props.children }
      </Form>
    );
  }
}

export default SimpleFormBuilder


