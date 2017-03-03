import React from 'react'
import _ from 'lodash'
import {
  Form,
  Radio,
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
const RadioGroup = Radio.Group;

@Form.create()
class AddAndUpdateForm extends React.Component {

  constructor(props){
    super(props);
    let {
      currentData,
      index,
    } = props;
    this.state = { };
    if(index !== undefined){
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
        value: data.value,
        select_target: data.select_target,
      }
      console.debug(obj)
      if(data.required){
        obj.required = data.required + "";
      }
      if(data.read_only){
        obj.read_only = data.read_only + "";
      }
      if(data.can_not_delete){
        obj.can_not_delete = data.can_not_delete + "";
      }
      this.props.form.setFieldsValue(obj); 
    }
  }

  onRadioChangeEvent = (e)=>{
    this.setState({
      radioValue: e.target.value,
    })
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
    let {
      selectSourceDataMap, 
      currentData,
      index,
    } = this.props;
    const { 
      getFieldDecorator, 
    } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
    var data_type = this.props.form.getFieldValue("data_type") 
      || (currentData[index] && currentData[index].data_type);
    //console.debug(data_type);
    const radioStyle = {
      display: 'block',
      height: '35px',
      lineHeight: '35px',
    };
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
                    if(!selectSourceDataMap && v.value === "list") {
                      return false; 
                    }
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
          (data_type !== "object" && data_type !== "array" && (data_type != undefined || currentData[index])) &&
          data_type !== "list" &&
          <FormItem 
            label="默认值"
            {...formItemLayout}
          >
            {
              getFieldDecorator('value')(
                <Input 
                  placeholder="请填写默认值"
                />
              )
            }
          </FormItem>
        }
        {
          (data_type === "list") &&
          <FormItem 
            label="下拉选择"
            {...formItemLayout}
          >
            {
              getFieldDecorator('select_target',
                {
                  rules: [
                    {
                      required: true, 
                      message: '请选择',
                    }
                  ],
                }                 
              )(
                <Select placeholder="请选择" >
                  {
                    selectSourceDataMap.map((v,k)=>{
                      return (
                        <Select.Option value={v.value} key={ k }>
                          { v.text }
                        </Select.Option>
                      )
                    })
                  }
                </Select>
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
            type="primary"
            size="large"
            htmlType="submit"
          >
            确定 
          </AntdButton>
          <AntdButton 
            className="fr mr10"
            type="default"
            size="large"
            onClick={
              (e)=>{
                this.props.setAddFieldDialogState(false)(e);
              }
            }
          >
            取消
          </AntdButton>
        </FormItem>
      </Form>
    )
  }

}

export default AddAndUpdateForm;


