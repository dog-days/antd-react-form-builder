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

@FormBuilder.create()
class Container extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      config: [
        feilds.text,
        feilds.nextedText,
        feilds.hidden,
        feilds.nestedEmail,
        feilds.email,
        feilds.url,
        feilds.textarea,
        feilds.number,
        feilds.singleSelect,
        feilds.groupSelect,
        feilds.multipleSelect,
        feilds.timePicker,
      ]
    }
  }

  handleOnsubmit(e){
    e.preventDefault();
    this.validateFieldsAndScroll(this.state.config,(err, values) => {
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
        horizontal
        config={ this.state.config }
      >    
        <Button
          buttonType="primary"
          htmlType="submit"
        >
          提交
        </Button>
      </FormBuilder>
    );
  }
}

export default Container; 
