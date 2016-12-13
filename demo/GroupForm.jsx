import React from 'react'
import _ from 'lodash'
import { FormBuilder,Button } from '../lib/index'
import feilds from "./config"

@FormBuilder.create()
class GroupForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      config: [
        _.cloneDeep(feilds.text),
        _.cloneDeep(feilds.nextedText),
        {
          title: "分组一",
          feilds: [
            _.cloneDeep(feilds.text),
            _.cloneDeep(feilds.nextedText),
            _.cloneDeep(feilds.email),
            _.cloneDeep(feilds.textarea),
          ],
        }
      ],
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
        nestedConfig={ this.state.config }
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
