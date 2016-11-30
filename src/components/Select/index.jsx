import React from 'react'
import BasicItem from '../BasicItem'
import AntdSelect from 'antd/lib/select'

const Option = AntdSelect.Option;
const OptGroup = AntdSelect.OptGroup;

function component(BasicItemComponent){
  return class Select extends React.Component {
    render(){
      let {
        options,
        group,
        ...other, 
      } = this.props;
      other.targetComponent = AntdSelect;
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
                  <OptGroup key={ g_k } label={ g_v.label || "" }>
                    {
                      g_v.options && g_v.options[0] && g_v.options.map((o_v,o_k)=>{
                        return (
                          <Option key={ o_k } value={ o_k+"" }>
                            { o_v.text }
                          </Option>
                        )
                      })
                    }
                  </OptGroup>
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
                  <Option key={ o_k } value={ o_k+"" }>
                    { o_v.text }
                  </Option>
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
