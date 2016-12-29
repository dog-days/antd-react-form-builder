import React from 'react'
import _ from 'lodash'
import { FormBuilder,Button } from '../lib/index'
import fields from "./config"

@FormBuilder.create()
class NestedForm extends React.Component {
  constructor(props){
    super(props);
    var text = _.cloneDeep(fields.text);
    text.formItemProps = {
      label: "test",
    }
    var text2 = _.cloneDeep(fields.text);
    text2.name = "dddd";
    text2.formItemProps = {
      label: "test",
    }
    var text3 = _.cloneDeep(fields.text);
    text3.name = "dddd222";
    text3.formItemProps = {
      label: "test",
    }
    var text4 = _.cloneDeep(fields.text);
    text4.name = "dddd22233";
    text4.formItemProps = {
      label: "test",
    }
    var text_last = _.cloneDeep(fields.text);
    text_last.name = "dddd22";
    text_last.action = true;
    text_last.formItemProps = {
      label: "test",
    }
    this.state = {
      config: [
        {
          title: "1",
          action: true,
          name: "test0",
          nest: [
            {
              name: "-1",
              recursion: [
                {
                  title: "1-1",
                  action: true,
                  name: "1-1",
                  nest: [
                    {
                      title: "1-1-1",
                      action: "all",
                      fields: [
                        _.cloneDeep(text),
                        _.cloneDeep(text2),
                        _.cloneDeep(text3),
                        _.cloneDeep(text4),
                        _.cloneDeep(fields.email),
                        _.cloneDeep(fields.singleSelect),
                      ],  
                    }
                  ],
                },
                _.cloneDeep(Object.assign({},text3,{
                  action: true,
                })),
                {
                  title: "1-2",
                  action: true,
                  name: "1-2",
                  nest: [
                    {
                      name: "-1-2",
                      recursion: [
                        {
                          title: "1-2-1",
                          action: true,
                          name: "1-2-1",
                          nest: [
                            _.cloneDeep(Object.assign({},fields.textarea,{
                              action: true,
                            })),
                            {
                              title: "1-2-1-1",
                              action: "least",
                              fields: [
                                _.cloneDeep(text),
                                _.cloneDeep(text2),
                                _.cloneDeep(text3),
                                _.cloneDeep(text4),
                                _.cloneDeep(fields.email),
                                _.cloneDeep(fields.singleSelect),
                              ],  
                            }
                          ],
                        },
                        {
                          title: "1-2-1",
                          action: true,
                          name: "1-2-1",
                          nest: [
                            _.cloneDeep(fields.textarea),
                            {
                              title: "1-2-1-1",
                              action: true,
                              name: "1-2-1-1",
                              fields: [
                                _.cloneDeep(text),
                                _.cloneDeep(text2),
                                _.cloneDeep(text3),
                                _.cloneDeep(text4),
                                _.cloneDeep(fields.email),
                                _.cloneDeep(fields.singleSelect),
                              ],  
                            }
                          ],
                        },
                      ],
                    },
                  ],
                },
              ]  
            }
          ],
        },
        {
          title: "test",
          name: "test",
          nest: [
            {
              title: "分组一",
              action: true,
              fields: [
                _.cloneDeep(text),
                _.cloneDeep(text2),
                _.cloneDeep(text3),
                _.cloneDeep(text4),
                _.cloneDeep(fields.email),
                _.cloneDeep(fields.singleSelect),
                _.cloneDeep(fields.multipleSelect),
              ],  
            },
            {
              title: "分组一",
              action: true,
              fields: [
                _.cloneDeep(text),
                _.cloneDeep(text2),
                _.cloneDeep(text3),
                _.cloneDeep(text4),
                _.cloneDeep(fields.email),
                _.cloneDeep(fields.singleSelect),
                _.cloneDeep(fields.multipleSelect),
              ],  
            }
          ],
        },
        {
          title: "test2",
          name: "test2",
          action: true,
          nest: [
            _.cloneDeep(fields.text),
          ],
        },
        {
          title: "test2",
          name: "test3",
          action: true,
          nest: [
            _.cloneDeep(text2),
          ],
        },
        text_last,
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
        nestedConfig={ this.state.config }
        inline
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

export default NestedForm; 
