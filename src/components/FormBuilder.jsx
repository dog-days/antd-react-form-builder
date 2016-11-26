import React from 'react'
import { 
  Form,
  Input,
  InputNumber,
  Select,
  Button,
} from '../FormItemBind'

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
  }

  static propTypes = {
    size: React.PropTypes.string,
    onSubmit: React.PropTypes.func,
    hasFeedback: React.PropTypes.bool,
    config: React.PropTypes.object,
  }

  static childContextTypes = {
    form: React.PropTypes.any
  }

  getChildContext(){
    return {
      form: this.props.form,
    }
  } 
  /**
  * 表单子项props适配（包括FormItem组件）
  * @param [obj] itemProps 表单子项props
  */
  childPropsAdapter(itemProps){
    var formProps = this.props;
    //obj--begin
    let obj = {};
    obj.formItemProps = itemProps.formItemProps;
    if(formProps.size){
      obj.size = formProps.size;
    }else if(itemProps.size){
      obj.size = itemProps.size;
    }
    if(!obj.formItemProps){
      obj.formItemProps =  {}
    }
    if(formProps.hasFeedback){
      obj.formItemProps.hasFeedback = true;
    }
    //obj--end
    return obj;
  }

  submitEvent = (e)=>{
    this.props.form.validateFields((err, values) => {
      this.props.onSubmit(e,err,values);
    });
  }

  render() {
    let { 
      config,
      form,
      size,
      hasFeedback,
      ...other 
    } = this.props;
    //console.debug(this.props.children)
    return (
      <Form 
        { ...other }
        onSubmit={ this.submitEvent }
      >
        {
          config && config.feilds && config.feilds[0] && config.feilds.map((v,k)=>{
            //console.debug(v)
            let { 
              ...v_other
            } = v;
            
            var obj = this.childPropsAdapter(v);
            var Element;
            switch(v.type){
              case "hidden":
              case "text":
              case "email":
              case "url":
                Element = Input;
              break;
              case "number":
                Element = InputNumber;
              break;
              case "password":
              case "textarea":
                Element = Input;
              break;
              case "select":
                Element = Select;
              break;
              case "button":
                Element = Button;
              break;
            }
            if(Element){
              return (
                <Element 
                  key={ k }
                  { ...obj }
                  { ...v_other }
                />
              )
            }else {
              return false;
            }
          })
        }
        { this.props.children }
      </Form>
    );
  }
}

export default Form.create()(FormBuilder)


