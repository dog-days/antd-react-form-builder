import React from 'react'
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
import GroupFormBuilder from './GroupFormBuilder'
import NestedFormBuilder from './NestedFormBuilder'

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

    function getValues(antValues,data){
      var values = {};
      if(!data){
        return getDealValue(antValues)
      }
      data && data.forEach((v,k)=>{
        let name_1 = v.name;
        if(!name_1){
          name_1 = k;
        }
        values[name_1] = {};
        //SimpleFormBuilder
        if(!v.feilds && !v.nest){
          if(!v.array){
            values[name_1] = v.storage.value;
          }else {
            v.array.forEach((v2,k2)=>{
              values[name_1][k2] = v2.storage.value;
            })
          }
        }
        //GroupFormBuilder，也用到上面的
        v.feilds && v.feilds[0] && v.feilds.forEach((v2,k2)=>{
          let name_2 = v2.name.split("-")[1];
          if(!name_2){
            name_2 = k2;
          }
          if(v2.array){
            values[name_1][name_2] = [];
            v2.array.forEach((v3,k3)=>{
              values[name_1][name_2][k3] = v3.storage.value;
            })
          }else {
            values[name_1][name_2] = v2.storage.value;
          }
        })
        //NestedFormBuilder
        v.nest && v.nest[0] && v.nest.forEach((v2,k2)=>{
          //递归取值处
          if(v2.recursion){
            var recursion_value = getValues(antValues,v2.recursion)
            values[name_1] = recursion_value;
            //console.debug(temp_value)
            return;
          }
          let name_2 = v2.name;
          //if(!name_2){
            //name_2 = k2;
          //}
          if(!v2.feilds){
            values[name_1][name_2] = v2.storage.value; 
          }else {
            if(!name_2){
              if(!_.isArray(values[name_1])){
                values[name_1] = [];
              }
            }else {
              if(!values[name_1][name_2]){
                values[name_1][name_2] = []; 
              }
            }
            //console.debug(v2.action)
            //处理混合的表单数据，根据是否可以动态添加表单
            if(!name_2){
              values[name_1][k2] = {}; 
            }else {
              values[name_1][name_2] = {}; 
            }
//console.debug(name_1,name_2)
            v2.feilds && v2.feilds[0] && v2.feilds.forEach((v3,k3)=>{
              let name_3 = v3.name.split("-")[1];
              if(!v3.array){
//console.debug(name_1,name_2,k2,name_3)
                if(!name_2){
                  values[name_1][k2][name_3] = v3.storage.value;
                }else {
                  values[name_1][name_2][name_3] = v3.storage.value;
                }
              }else {
                values[name_1][name_2][k2][name_3] = [];
                v3.array && v3.array[0] && v3.array.forEach((v4,k4)=>{
                  values[name_1][name_2][k2][name_3][k4] = v4.storage.value;
                })
              }
            })
          }
        })
      })
//console.debug(values)
      return values;
    }
    
    return function(Component){
      Component.prototype.validateFieldsAndScroll = function(data,callback){
        if(!callback){
          callback = data;
          data = null;
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
          var new_values = getValues(values,data);
          callback(err,new_values);
        });
      }
      Component.prototype.validateFields = function(data,callback){
        if(!callback){
          callback = data;
          data = null;
        }
        this.props.form.validateFields((err, values) => {
          var new_values = getValues(values,data);
          callback(err,new_values);
        });
      }
      var FormComponent = AntdForm.create(options)(Component);
      return FormComponent;
    }
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
        <GroupFormBuilder { ...other } />
      )
    }else if(nestedConfig){
      other.config = nestedConfig;
      return (
        <NestedFormBuilder { ...other } />
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


