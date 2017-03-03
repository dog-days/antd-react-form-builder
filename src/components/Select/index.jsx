import React from 'react'
import BasicItem from '../BasicItem'
import Select from 'antd/lib/select'
import FormItemComponentDecorator from '../../decorator/FormItemComponent'

function component(BasicItemComponent){
  @FormItemComponentDecorator
  class FSelect extends React.Component {

    static contextTypes = {
      selectSourceData: React.PropTypes.object,
    }

    renderOptions(options){
      return options && options.map && options.map((v,k)=>{
        return (
          <Select.Option key={ k } value={ v.value+"" }>
            { v.text }
          </Select.Option>
        )
      })
    }

    render(){
      let {
        options,
        group,
        select_target,
        ...other, 
      } = this.props;
      other.targetComponent = Select;
      other.type = "select";
      if(other.multiple){
        other.type = "multiple-select";
      }
      this.propsAdapter(other);
      if(group){
        return (
          //这里的BasicItemComponent相当于
          //<FormItem>
          //  <Select>(AntdSelect)
          //    { children }
          //  </Select>
          //</FormItem>
          <BasicItemComponent placeholder="请选择" { ...other }>
            {
              group && group[0] && group.map((g_v,g_k)=>{
                return (
                  <Select.OptGroup key={ g_k } label={ g_v.label || "" }>
                    { this.renderOptions(g_v.options) }
                  </Select.OptGroup>
                )
              })
            }
          </BasicItemComponent> 
        )
      }else if(options){
        return (
          <BasicItemComponent placeholder="请选择" { ...other }>
            { this.renderOptions(options) }
          </BasicItemComponent>
        )
      }else if(select_target){
        //console.debug(this.context.selectSourceData);
        options = this.context.selectSourceData[select_target]; 
        return (
          <BasicItemComponent placeholder="请选择" { ...other } >
            { this.renderOptions(options) }
          </BasicItemComponent>
        ) 
      }else {
        return (
          <BasicItemComponent placeholder="暂无数据" { ...other } >
          </BasicItemComponent>
        )
      }
    }
  }
  return FSelect;
}
export default component(BasicItem) 
