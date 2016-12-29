import React from 'react'
import _ from 'lodash'
import { FormBuilder,Button } from '../lib/index'
import fields from "./config"

@FormBuilder.create()
class GroupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      config: [
        _.cloneDeep(fields.text),
        _.cloneDeep(fields.nextedText),
        {
          title: "分组一",
          action: true,
          name: "group",
          fields: [
            _.cloneDeep(fields.text),
            _.cloneDeep(fields.nextedText),
            _.cloneDeep(fields.email),
            _.cloneDeep(fields.textarea),
          ],
        }
      ],
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
        groupConfig={ this.state.config }
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

export default GroupForm; 
