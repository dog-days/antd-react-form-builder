import React from 'react'
import AntdSelect from 'antd/lib/select'
import AntdForm from 'antd/lib/form'

let FormItem = AntdForm.Item;
let Option = AntdSelect.Option;

export default class Select extends React.Component {

  static contextTypes = {
    form: React.PropTypes.any
  }

  constructor(props){
    super(props);
  }

  getRules(type){
    return [];
  }

  render() {
    let props = this.props;
    let {
      value,
      name,
      rules = [],
      options,
      formItemProps,
      ...other,
    } = props;
    let form = this.context.form;
    if(!form){
      console.error("请使用Antd.Form.create()(targetForm)处理目标form函数对象（类）")
      return false;
    }

    Array.prototype.push.apply(rules,this.getRules())
    var obj = {
      rules: rules || [],
    }
    if(value || value == 0){
      obj.initialValue = value; 
    }
    var element = form.getFieldDecorator(name, obj)(
      <AntdSelect {...other}>
        {
          options && options[0] && options.map((o_v,o_k)=>{
            return (
              <Option key={ o_k } value={ o_k+"" }>
                { o_v.text }
              </Option>
            )
          })
        }
      </AntdSelect>
    )

    return (
      <FormItem {...formItemProps}>
        { element }
      </FormItem>
    )
  }
}


