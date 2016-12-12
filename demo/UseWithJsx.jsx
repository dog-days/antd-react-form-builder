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
        hasFeedback={ false }
        horizontal 
      >
        <Input 
          { ...feilds.text }
        />
        <InputNest 
          { ...feilds.nextedText }
        />
        <Input 
          { ...feilds.email }
        />
        <InputNest 
          { ...feilds.nestedEmail }
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
