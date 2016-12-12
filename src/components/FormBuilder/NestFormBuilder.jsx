import React from 'react'
import Icon from 'antd/lib/icon'
import AntdButton from 'antd/lib/button'
import Card from 'antd/lib/card'
import Modal from 'antd/lib/modal'
import Popover from 'antd/lib/popover'
import BuilderDecorator from '../../decorator/Builder'
import NestItemContainer from "../_util/NestItemContainer"
import ButtonGroup from '../Button/ButtonGroup'
import util from '../../util'
import SimpleFormBuilder from '../FormBuilder/SimpleFormBuilder'
import { 
  Form,
  Input,
  InputNumber,
  Select,
  Button,
  TimePicker,
} from '../../FormItemBind'

/**
 * NestFormBuilder 
 * @prop {String} size size 设置表单子项（包括antd Input、Select等和FormItem）size，表单子项size优先级更高
 * @prop {function} onSubmit 类似于antd Form中的onSumbit，不过多了两个输入参数
 *                          （源自于antd this.props.form.validateFields），
 *                           只有通过此方法才可获得FormBuilder的所有表单值 
 * @prop {Boolean} hasFeedback 表单验证在FormItem是否反馈，表单子项hasFeedback优先级更高 
 * @prop {Object} config FormBuilder 配置项，表单就是从这些配置中渲染出来的 （可选） 
 */
@BuilderDecorator
class NestFormBuilder extends React.Component {

  constructor(props){
    super(props);
    this.nestedConfig = this.props.nestedConfig;
    this.state = {
      visible: false, 
    }
  }

  refresh(){
    this.setState({})
  }

  onButtonGroupClick(index){
    return (btn_index)=>{
      var data = this.nestedConfig;
      switch(btn_index){
        case "up":
          util.swapArrayItem(data,index,index - 1);
        break;
        case "down":
          util.swapArrayItem(data,index,index + 1);
        break;
        case "plus":
          return;
        break;
        case "delete":
          data.splice(index,1);
        break;
      }
      this.refresh();
    }
  }

  handleAddEvent = (name)=>{
    return (e,err,values)=>{
      var data = this.nestedConfig;
      this.context.form.validateFieldsAndScroll((err, values) => {
        console.debug('表单值: ', values);
        if(err){
          console.debug("表单错误",err)
          return; 
        }
      });
      //data.splice(index + 1,0,data[index]);
    }
  }

  renderByNestedConfig(){
    return this.nestedConfig && this.nestedConfig[0] && this.nestedConfig.map((v,k)=>{
      var disableButtons = [];
      if(k === 0){
        disableButtons.push(0); 
      }
      if(k === this.nestedConfig.length - 1){
        disableButtons.push(1); 
      }
      if(this.nestedConfig.length == 1){
        disableButtons.push(3); 
      }
      var btnAddInputName = "builder-nested-add-feilds-" + k;
      var button_group = (
        <ButtonGroup 
          size="default"
          hightButton={false}
          keys={["up","down","plus","delete"]}
          disableButtons={ disableButtons }
          buttonTexts={[
            <Icon type="arrow-up"/>,
            <Icon type="arrow-down"/>,
            <Icon type="plus"/>,
            <Icon type="close"/>,
          ]}
          onButtonClick={ this.onButtonGroupClick(k) }
        />
      ) 
      return (
        <Card 
          key={ v.name }
          title={ v.title }
          className="builder-nested-card-con"
          extra={ button_group }
        >
          { 
            v.feilds 
            && v.feilds[0] 
            && this.renderItemByArray(
                v.feilds,
                NestItemContainer,
                (props,key)=>{
                  //console.debug(v.name)
                  props.name = "builder["+ v.k +"]" + "[" + props.name + "]";
                  return props;
                }
              ) 
            }
        </Card>
      )
    })
  }

  render() {
    let { 
      nestedConfig,
      form,
      size,
      hasFeedback,
      labelCol,
      wrapperCol,
      className = "",
      ...other 
    } = this.props;
    //console.debug(this.props.children)
    other.className = className + " builder-nested-con";
    return (
      <Form 
        { ...other }
      >
        { this.renderByNestedConfig() }
        <Modal 
          title="添加" 
          visible={this.state.visible}
          onOk={this.handleOk} 
          onCancel={this.handleCancel}
        >
        </Modal>
      </Form>
    );
  }
}

export default NestFormBuilder; 

