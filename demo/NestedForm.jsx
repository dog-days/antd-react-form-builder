import React from 'react'
import _ from 'lodash'
import { FormBuilder,Button } from '../lib/index'
import feilds from "./config"

@FormBuilder.create()
class NestedForm extends React.Component {
  constructor(props){
    super(props);
    var text = _.cloneDeep(feilds.text);
    text.formItemProps = {
      label: "test",
    }
    var text2 = _.cloneDeep(feilds.text);
    text2.name = "dddd";
    text2.formItemProps = {
      label: "test",
    }
    var text3 = _.cloneDeep(feilds.text);
    text3.name = "dddd222";
    text3.formItemProps = {
      label: "test",
    }
    var text4 = _.cloneDeep(feilds.text);
    text4.name = "dddd22233";
    text4.formItemProps = {
      label: "test",
    }
    var text_last = _.cloneDeep(feilds.text);
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
                      action: true,
                      name: "1-1-1",
                      feilds: [
                        _.cloneDeep(text),
                        _.cloneDeep(text2),
                        _.cloneDeep(text3),
                        _.cloneDeep(text4),
                        _.cloneDeep(feilds.email),
                        _.cloneDeep(feilds.singleSelect),
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
                            _.cloneDeep(Object.assign({},feilds.textarea,{
                              action: true,
                            })),
                            {
                              title: "1-2-1-1",
                              action: "least",
                              name: "1-2-1-1",
                              feilds: [
                                _.cloneDeep(text),
                                _.cloneDeep(text2),
                                _.cloneDeep(text3),
                                _.cloneDeep(text4),
                                _.cloneDeep(feilds.email),
                                _.cloneDeep(feilds.singleSelect),
                              ],  
                            }
                          ],
                        },
                        {
                          title: "1-2-1",
                          action: true,
                          name: "1-2-1",
                          nest: [
                            _.cloneDeep(feilds.textarea),
                            {
                              title: "1-2-1-1",
                              action: true,
                              name: "1-2-1-1",
                              feilds: [
                                _.cloneDeep(text),
                                _.cloneDeep(text2),
                                _.cloneDeep(text3),
                                _.cloneDeep(text4),
                                _.cloneDeep(feilds.email),
                                _.cloneDeep(feilds.singleSelect),
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
          action: "all",
          name: "test",
          nest: [
            {
              title: "分组一",
              action: true,
              name: "group",
              feilds: [
                _.cloneDeep(text),
                _.cloneDeep(text2),
                _.cloneDeep(text3),
                _.cloneDeep(text4),
                _.cloneDeep(feilds.email),
                _.cloneDeep(feilds.singleSelect),
                _.cloneDeep(feilds.multipleSelect),
              ],  
            },
            {
              title: "分组一",
              action: true,
              name: "group",
              feilds: [
                _.cloneDeep(text),
                _.cloneDeep(text2),
                _.cloneDeep(text3),
                _.cloneDeep(text4),
                _.cloneDeep(feilds.email),
                _.cloneDeep(feilds.singleSelect),
                _.cloneDeep(feilds.multipleSelect),
              ],  
            }
          ],
        },
        {
          title: "test2",
          name: "test2",
          action: true,
          nest: [
            _.cloneDeep(feilds.text),
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
