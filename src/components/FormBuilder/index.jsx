import React from 'react'
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
import GroupFormBuilder from './GroupFormBuilder'

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

  static create(options){
    
    function getDealValue(values){
      var new_values = { };
      for(var k in values){
        var name_split = k.split("-[");
        if(!new_values[name_split[0]] && name_split[1]) {
          new_values[name_split[0]] = [];
          new_values[name_split[0]].push(values[k]);
        }else if(name_split[1]){
          new_values[name_split[0]].push(values[k]);
        }else {
          new_values[name_split[0]] = values[k];
        }
      }
      return new_values; 
    }
    
    return function(Component){
      var FormComponent = AntdForm.create(options)(Component);
      Component.prototype.validateFieldsAndScroll = function(callback){
        this.props.form.validateFieldsAndScroll((err, values) => {
          var new_values = getDealValue(values);
          callback(err,new_values);
        });
      }
      Component.prototype.validateFields = function(callback){
        this.props.form.validateFields((err, values) => {
          var new_values = getDealValue(values);
          callback(err,new_values);
        });
      }
      return FormComponent;
    }
  }

  render() {
//console.debug(this.context.form)
    let {
      config,
      nestedConfig,
      ...other,
    } = this.props;
    if(nestedConfig){
      other.config = nestedConfig;
      return (
        <GroupFormBuilder
          { ...other }
        />
      )
    }else {
      other.config = config;
      return (
        <SimpleFormBuilder
          { ...other }
        />
      )
    }
  }
}

export default FormBuilder


