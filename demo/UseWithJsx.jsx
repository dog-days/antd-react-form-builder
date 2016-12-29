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
import fields from "./config"

@FormBuilder.create()
class Container extends React.Component {
  constructor(props){
    super(props);
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
        horizontal 
      >
        <Input 
          { ...fields.text }
        />
        <InputNest 
          { ...fields.nextedText }
        />
        <Input 
          { ...fields.email }
        />
        <InputNest 
          { ...fields.nestedEmail }
        />
        <Select 
          { ...fields.singleSelect }
        />
        <Button 
          htmlType="submit"
          buttonType="primary" 
        >
          提交
        </Button>
      </FormBuilder>
    );
  }
}

export default Container; 
