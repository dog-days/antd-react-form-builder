import React ,{ PropTypes } from 'react'
import BasicItem from '../BasicItem'
import {
  Select 
} from "antd"
import FormItemComponentDecorator from '../../decorator/FormItemComponent'
import localeDecorator from "../../decorator/Locale"
import localeText from './zh_CN'

function component(BasicItemComponent){
  /**
  * @prop { array } options options配置项 
  * @prop { array } group select分组配置项，这个配置优先于props.options
  * @prop { boolean } multiple 是否多选
  * @prop { boolean } boolean 是否是boolean选择组件（只有”是“和”否“两个选项）
  */
  @FormItemComponentDecorator
  @localeDecorator
  class FSelect extends React.Component {
 
    static contextTypes = Object.assign(
      { },
      FormItemComponentDecorator.contextTypes,
      {
        selectSourceData: React.PropTypes.object,
      }
    );
    
    static propTypes = {
      options: React.PropTypes.array,
      group: React.PropTypes.array,
      boolean: React.PropTypes.bool,
    }

    constructor(props){
      super(props); 
    }

    getBooleanOptions(){
      var locale = this.getLocale(localeText,"FormBuilderSelect"); 
      return [
        {
          label: locale.yes,
          value: "true",
        },
        {
          label: locale.no,
          value: "false",
        }
      ];
    }

    renderOptions(options){
      return options && options.map && options.map((v,k)=>{
        return (
          <Select.Option 
            key={ k } 
            value={ v.value+"" }
          >
            { v.label || v.text }
          </Select.Option>
        )
      })
    }

    render(){
      let {
        options,
        group,
        select_target,
        boolean,
        ...other, 
      } = this.props;
      var locale = this.getLocale(localeText,"FormBuilderSelect"); 
      var boolOptions = this.getBooleanOptions();
      other.targetComponent = Select;
      other.type = "select";
      if(other.multiple){
        other.type = "multiple-select";
      }
      this.propsAdapter(other);
      if(boolean){
        other.value = other.value + "";
        if(other.storage.value != undefined){
          other.storage.value += "";
        }
        return (
          //这里的BasicItemComponent相当于
          //<FormItem>
          //  <Select>(AntdSelect)
          //    { children }
          //  </Select>
          //</FormItem>
          <BasicItemComponent 
            placeholder={ locale.placeholder }
            { ...other }
          >
            { this.renderOptions(boolOptions) }
          </BasicItemComponent> 
        )
      }else if(group){
        return (
          <BasicItemComponent 
            placeholder={
              locale.placeholder 
            }
            { ...other }
          >
            {
              group.map((g_v,g_k)=>{
                return (
                  <Select.OptGroup 
                    key={ g_k } 
                    label={ g_v.label || "" }
                  >
                    { this.renderOptions(g_v.options) }
                  </Select.OptGroup>
                )
              })
            }
          </BasicItemComponent> 
        )
      }else if(options){
        return (
          <BasicItemComponent 
            placeholder={
              locale.placeholder 
            }
            { ...other }
          >
            { this.renderOptions(options) }
          </BasicItemComponent>
        )
      }else if(select_target){
        //console.debug(this.context.selectSourceData);
        options = this.context.selectSourceData[select_target]; 
        return (
          <BasicItemComponent 
            placeholder={
              locale.placeholder 
            }
            { ...other } 
          >
            { this.renderOptions(options) }
          </BasicItemComponent>
        ) 
      }else {
        return (
          <BasicItemComponent 
            placeholder={
              locale.placeholder 
            }
            { ...other } 
          >
          </BasicItemComponent>
        )
      }
    }
  }
  return FSelect;
}
export default component(BasicItem) 
