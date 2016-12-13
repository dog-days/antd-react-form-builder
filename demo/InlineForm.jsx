import React from 'react'
import {
  FormBuilder,
  Input,
  InputNest,
  InputNumber,
  Select,
  Button,
  TimePicker,
} from '../lib/index'
import feilds from "./config"

//适配
feilds.text.formItemProps = {
  label: "随意",
}

@FormBuilder.create()
class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      config: {
        "feilds": [
          feilds.text,
          feilds.email,
          feilds.url,
          feilds.number,
          feilds.singleSelect,
          feilds.groupSelect,
          feilds.multipleSelect,
          feilds.timePicker,
          feilds.button,
        ]
      },
    }
  }

  handleOnsubmit(e){
    e.preventDefault();
    this.validateFieldsAndScroll((err, values) => {
      console.debug('表单值: ', values);
      if(err){
        console.debug("表单错误",err)
        return; 
      }
    });
  }

  render() {
    return (
      <FormBuilder 
        onSubmit={ this.handleOnsubmit.bind(this) }
        size="default"
        hasFeedback={ true }
        config={ this.state.config }
      />    
    );
  }
}

export default Container; 
