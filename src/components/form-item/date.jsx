import React from 'react'
import { Form,Input,Select,Option,Textarea } from '../FormItemBind'

export default class FormBuilder extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    let { data,...other } = this.props;
    if(!data || !data.feilds) {
      console.error("FormBuilder 数据源不可以留空");
      return false;
    }
    //console.debug(data.feilds)
    return (
      <Form { ...other }>
        {
          data.feilds[0] && data.feilds.map((v,k)=>{
            var item = <span key={ k }></span>;
            //console.debug(v)
            let { 
              placeholder,
              value,
              name,
              defaultValue,
              size,
              rePassword,
              options,
              mutiple,
              ...v_other
            } = v;
            //obj--begin
            let obj = {};
            if(value) {
              obj.value = value;
            }else {
              obj.defaultValue = defaultValue;
            }
            obj.name = name;
            obj.placeholder = placeholder;
            if(size){
              obj.size = size;
            }else if(data.size){
              obj.size = data.size;
            }
            //obj--end

            switch(v.type){
              case "email":
              case "text":
              case "number":
                return (
                  <Input 
                    key={ k }
                    { ...obj }
                    { ...v_other }
                  />
                )
              break;
              case "password":
                if(rePassword){
                  return (
                    <span key={ k }>
                      <Input 
                        { ...obj }
                        { ...v_other }
                      />
                      <Input 
                        { ...obj }
                        name={ "re-" + v.name }
                        { ...v_other }
                      />
                    </span>
                  )
              }else {
                return (
                  <Input 
                    key={ k }
                    { ...obj }
                    { ...v_other }
                  />
                )
              }
              break;
              case "select":
                return (
                  <Select 
                    mutiple={ mutiple }
                    key={ k }
                    { ...obj }
                    { ...v_other }
                  >
                    {
                      options && options[0] && options.map((o_v,o_k)=>{
                        return (
                          <Option key={ o_k } value={ o_v.value }>
                            { o_v.text }
                          </Option>
                        )
                      })
                    }
                  </Select>
                )
              break;
            }
            return item; 
          })
        }
      </Form>
    );
  }
}


