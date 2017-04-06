import React from 'react'
import _ from 'lodash'
import Icon from 'antd/lib/icon'
import AntdForm from 'antd/lib/form'
import AntdButton from 'antd/lib/button'
import FormBuilder from "../../FormBuilder"
import Input from "../../Input"
import Select from "../../Select"
import util from "../../../util"
import localeText from '../zh_CN'
import localeDecorator from "../../../decorator/Locale"

const FormItem = AntdForm.Item;

@FormBuilder.create()
@localeDecorator
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
        type: data.type,
      }
      if(data.type === "boolean"){
        obj.value  = !!util.convertStringOfTrueAndFalseToBollean(data.value) + "";
      }else if(data.value){
        obj.value = data.value;
      }
      if(data.select_target){
        obj.select_target = data.select_target;
      }
      if(data.required !== undefined){
        obj.required = !!util.convertStringOfTrueAndFalseToBollean(data.required) + "";
      }
      if(data.read_only !== undefined){
        obj.read_only = !!util.convertStringOfTrueAndFalseToBollean(data.read_only) + "";
      }
      if(data.can_not_delete !== undefined){
        obj.can_not_delete = !!util.convertStringOfTrueAndFalseToBollean(data.can_not_delete) + "";
      }
      //console.debug(obj)
      this.props.formBuilder &&
      this.props.formBuilder.setFieldsValue(obj); 
    }
  }

  onTypeChange = (value)=>{
    this.setState({
      type: value,
    })
  }

  submitEvent = (e)=>{
    e.preventDefault();
    this.props.formBuilder.validateFields((err, values) => {
      //console.debug(values);
      if (err) {
        console.log(err);
        return;
      }
      let {
        currentData,
        index,
      } = this.props;
      //console.debug(values);
      switch(values.type){
        case "object":
        case "array":
          if(!this.isEdited){
            values.children = [];
          }
        break;
      }
      if(this.isEdited){
        values.key = currentData[index].key; 
        if(values.type === "array" || values.type === "object"){
          values.children = currentData[index].children || []; 
        };
        currentData[index] = values;
      }else {
        values.key = util.getUniqueKey();
        currentData.push(values);
      }
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
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 17 },
    };
    var type = this.state.type || (currentData[index] && currentData[index].type);
    //console.debug(type);
    var locale = this.getLocale(localeText,"FormBuilderConfiger");
    return (
      <FormBuilder
        size="large"
        onSubmit={ this.submitEvent }
        { ...formItemLayout }
      >
        <Input 
          label={ locale.fieldName }
          name="name"
          required
          placeholder={ locale.filedNameRequiredMessage }
        />
        <Input 
          label={ locale.labelName }
          name="label"
          required
          placeholder={ locale.labelNameRequiredMessage }
        />
        <Select 
          label={ locale.dataType }
          name="type"
          required
          options={ util.dataType  }
          placeholder={ locale.dataTypeReqiuredMessage }
          onChange={ this.onTypeChange }
        />
        {
          type !== "object" && 
          type !== "array" && 
          (type != undefined || currentData[index]) &&
          type !== "list" &&
          type !== "boolean" &&
          <Input 
            name="value"
            label={ locale.defaultValue }
            placeholder={ locale.defaultValuePlaceholder }
          />
        }
        {
          type === "boolean" &&
          <Select 
            name="value"
            label={ locale.defaultValue }
            placeholder={ locale.please }
            boolean={ true }
          />
        }
        {
          (type === "list") &&
          <Select 
            required
            name="select_target"
            label={ locale.listTargetLabel }
            placeholder={ locale.listTargetPlease }
            options={ selectSourceDataMap }
          />
        }
        <Select 
          required
          name="required"
          label={ locale.required }
          placeholder={ locale.requiredPlease }
          boolean={ true }
          value={ true }
        />
        <Select 
          name="read_only"
          label={ locale.readOnly }
          placeholder={ locale.readOnlyPlease }
          boolean={ true }
          value={ false }
        />
        <Select 
          name="can_not_delete"
          label={ locale.cannotDelete }
          placeholder={ locale.cannotDeletePlease }
          boolean={ true }
          value={ false }
        />
        <FormItem 
          {...formItemLayout}
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
            { locale.confirm }
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
            { locale.cancel }
          </AntdButton>
        </FormItem>
      </FormBuilder>
    )
  }

}

export default AddAndUpdateForm;


