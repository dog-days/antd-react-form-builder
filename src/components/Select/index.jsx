import React from 'react'
import BasicItem from '../BasicItem'
import Select from 'antd/lib/select'

//const Option = AntdSelect.Option;
//const OptGroup = AntdSelect.OptGroup;

function component(BasicItemComponent){
  return class FSelect extends React.Component {
    render(){
      let {
        options,
        group,
        ...other, 
      } = this.props;
      other.targetComponent = Select;
      if(!other.storage){
        if(this.storage){
          other.storage = this.storage;
        }else {
          other.storage = {
            value: other.value,
          }
          this.storage = other.storage; 
        }
      }
      if(group){
        return (
          //这里的BasicItemComponent相当于
          //<FormItem>
          //  <Select>(AntdSelect)
          //    { children }
          //  </Select>
          //</FormItem>
          <BasicItemComponent { ...other }>
            {
              group && group[0] && group.map((g_v,g_k)=>{
                return (
                  <Select.OptGroup key={ g_k } label={ g_v.label || "" }>
                    {
                      g_v.options && g_v.options[0] && g_v.options.map((o_v,o_k)=>{
                        return (
                          <Select.Option key={ o_k } value={ o_v.value + "" }>
                            { o_v.text }
                          </Select.Option>
                        )
                      })
                    }
                  </Select.OptGroup>
                )
              })
            }
          </BasicItemComponent> 
        )
      }else if(options){
        return (
          <BasicItemComponent { ...other }>
            {
              options && options[0] && options.map((o_v,o_k)=>{
                return (
                  <Select.Option key={ o_k } value={ o_v.value+"" }>
                    { o_v.text }
                  </Select.Option>
                )
              })
            }
          </BasicItemComponent>
        )
      }
    }
  }
}
export default component(BasicItem) 
