import React from 'react'
import _ from 'lodash'
import {
  Form,
  Button as AntdButton,
  Icon,
  Table,
  Tooltip,
  Modal,
  Input,
  Select,
} from 'antd'
import util from "../../../util"

const FormItem = Form.Item;

@Form.create()
class AddAndUpdateForm extends React.Component {

  constructor(props){
    super(props);
    this.state = { }; 
    if(this.props.index !== undefined){
      //index不为undefined，说明是编辑，否则是添加
      this.isEdited = true;
    }else {
      this.isEdited = false;
    }
  }

  componentDidMount(){
    let {
      currentData,
      index,
    } = this.props;
    if(this.isEdited){
      var data = currentData[index];
      var obj = {
        name: data.name,
        label: data.label,
        data_type: data.data_type,
      }
      if(data.required){
        obj.required = data.required + "";
      }
      if(data.read_only){
        obj.read_only = data.read_only + "";
      }
      if(data.can_not_delete){
        obj.can_not_delete = data.can_not_delete + "";
      }
      this.props.form.setFieldsValue(currentData[index]);
    }
  }

  submitEvent = (e)=>{
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //console.debug(values);
      if (err) {
        console.log(err);
        return;
      }
      let {
        currentData,
        index,
      } = this.props;
      switch(values.data_type){
        case "object":
        case "array":
          if(!this.isEdited){
            values.children = [];
          }
        break;
      }
      if(this.isEdited){
        values.key = currentData[index].key; 
        if(values.data_type === "array" || values.data_type === "object"){
          values.children = currentData[index].children || []; 
        };
        currentData[index] = values;
      }else {
        values.key = util.getUniqueKey();
        currentData.push(values);
      }
      //console.debug(currentData)
      this.props.setChangeState();
      this.props.setAddFieldDialogState(false)();
    });
  }

  render(){ 
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
    var data_type = this.props.form.getFieldValue("data_type");
    //console.debug(data_type);
    return (
      <Form
        onSubmit={ this.submitEvent }
      >
        <FormItem {...formItemLayout}
          label="字段"
          hasFeedback
        >
          {
            getFieldDecorator(
              'name', 
              {
                rules: [
                  {
                    required: true, 
                    message: '请填写字段',
                  }
                ],
              }
            )(
              <Input 
                placeholder="请填写字段"
              />
            )
          }
        </FormItem>
        <FormItem {...formItemLayout}
          label="配置名"
          hasFeedback
        >
          {
            getFieldDecorator(
              'label', 
              {
                rules: [
                  {
                    required: true, 
                    message: '请填写字段配置名',
                  }
                ],
              }
            )(
              <Input 
                placeholder="请填写字段配置名"
              />
            )
          }
        </FormItem>
        <FormItem {...formItemLayout}
          label="数据类型"
          hasFeedback
        >
          {
            getFieldDecorator(
              'data_type', 
              {
                rules: [
                  {
                    required: true, 
                    message: '请选择字段类型',
                  }
                ],
              }
            )(
              <Select 
                placeholder="请选择字段类型"
              >
                {
                  util.dataType.map((v,k)=>{
                    return (
                      <Select.Option 
                        value={v.value}
                        key={v.value}
                      >
                        { v.text }
                      </Select.Option>
                    );
                  })
                }
              </Select>
            )
          }
        </FormItem>
        {
          (data_type !== "object" && data_type !== "array") &&
          <FormItem {...formItemLayout}
            label="默认值"
            hasFeedback
          >
            {
              getFieldDecorator(
                'value'
              )(
                <Input 
                  placeholder="请填写默认值"
                />
              )
            }
          </FormItem>
        }
        <FormItem {...formItemLayout}
          label="是否必填"
          hasFeedback
        >
          {
            getFieldDecorator(
              'required', 
              {
                initialValue: "1",
                rules: [
                  {
                    required: true, 
                    message: '请选择',
                  }
                ],
              }
            )(
              <Select 
                placeholder="请选择"
              >
                <Select.Option value={"1"} >
                  是
                </Select.Option>
                <Select.Option value={"0"} >
                  否 
                </Select.Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem {...formItemLayout}
          label="是否只读"
          hasFeedback
        >
          {
            getFieldDecorator(
              'read_only', 
              {
                initialValue: "0",
                rules: [
                  {
                    required: true, 
                    message: '请选择',
                  }
                ],
              }
            )(
              <Select 
                placeholder="请选择"
              >
                <Select.Option value={"1"} >
                  是
                </Select.Option>
                <Select.Option value={"0"} >
                  否 
                </Select.Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem {...formItemLayout}
          label="不可删除"
          hasFeedback
        >
          {
            getFieldDecorator(
              'can_not_delete', 
              {
                initialValue: "0",
                rules: [
                  {
                    required: true, 
                    message: '请选择',
                  }
                ],
              }
            )(
              <Select 
                placeholder="请选择"
              >
                <Select.Option value={"1"} >
                  是
                </Select.Option>
                <Select.Option value={"0"} >
                  否 
                </Select.Option>
              </Select>
            )
          }
        </FormItem>
        <FormItem {...formItemLayout}
          className="none-label-con mt20"
          label=" "
          hasFeedback
        >
          <AntdButton 
            className="fr"
            type="default"
            size="large"
          >
            取消
          </AntdButton>
          <AntdButton 
            className="fr mr10"
            type="primary"
            size="large"
            htmlType="submit"
          >
            确定 
          </AntdButton>
        </FormItem>
      </Form>
    )
  }

}

export default AddAndUpdateForm;


