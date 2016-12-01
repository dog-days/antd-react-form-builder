import React from "react"
import { shallow,mount,render } from "enzyme"
import sinon from "sinon"
import FormBuilder,{ 
  Input,
  InputNumber,
  Select,
  Button,
  TimePicker,
} from '../src/index'
import feilds from "../demo/config" 
import { LocaleProvider } from "antd"
import moment from 'moment'
//begin国际化处理
import AntdEnUS from 'antd/lib/locale-provider/en_US'
import FormBuilderEnUS from '../src/locale-provider/es_US'
import 'moment/locale/zh-cn'

moment.locale('en');
  //整合Antd和FormBuilder的国际化语言
let enUS = Object.assign({},AntdEnUS,FormBuilderEnUS)
//end国际化处理

let inputRules = Input.getRules(enUS);

describe("<FormBuilder><Input /></FormBuilder>",function(){
  var config = {
    feilds: [
      feilds.text,
      feilds.hidden,
      feilds.email,
      feilds.url,
      feilds.textarea,
      feilds.number,
      feilds.singleSelect,
      feilds.groupSelect,
      feilds.multipleSelect,
      feilds.timePicker,
      feilds.button,
    ]
  }
  const handleOnsubmit = sinon.spy();
  const wrapperMount = mount(

    <LocaleProvider
      locale={ enUS }
    >
      <FormBuilder 
        size="default"
        onSubmit={ handleOnsubmit }
        hasFeedback={ true }
        horizontal 
        config={ config }
      />
    </LocaleProvider>
  );
  
  it("<Input />'s length should be equal",function(){
    expect(wrapperMount.find(Input)).toHaveLength(5);
  })

  it("<InputNumber />'s length should be equal",function(){
    expect(wrapperMount.find(InputNumber)).toHaveLength(1);
  })

  it("<Select />'s length should be equal",function(){
    expect(wrapperMount.find(Select)).toHaveLength(3);
  })

  it("<TimePicker />'s length should be equal",function(){
    expect(wrapperMount.find(TimePicker)).toHaveLength(1);
  })

  //console.log(wrapperMount.childAt(0).childAt(1).childAt(0).childAt(0).props())
  config.feilds.forEach((v,k)=>{
    //测试点一，表单子项渲染数目是否相等
    it(`"${ v.type }" Form child's props should be equal`,function(){
      //本项目的Input、Select等Props从配置中是否正确传进来
      expect(wrapperMount.childAt(k).props()).toEqual(Object.assign(
        {
          size: "default", 
          formItemProps: {hasFeedback: true}
        },
        v
      ));
    })

    if(v.type !== "hidden"){
  //测试点二，Antd FormItem 部分props是否一致
      it(`some of "${ v.type }" <FormItem />'s props should be equal`,function(){
        //antd FormItem 第一子组件 Props
        var formItemProps = wrapperMount.childAt(k).childAt(0).props(); 
        expect(formItemProps.span).toEqual(v.formItemProps.labelCol.span);
        expect(formItemProps.children.props.children).toEqual(v.formItemProps.label);
      })

      //button是不用验证的
      if(v.type !== "button"){
  //测试点三，Antd FormItem 是否有表单验证反馈
        it(`"${ v.type }" Form child's verification feedback did work`,function(){
          //antd FormItem 第二子组件 Props
          var inputProps = wrapperMount.childAt(k).childAt(1).props(); 
          expect(inputProps.children.props.className).toEqual("ant-form-item-control has-feedback has-success");
        })
      }
    }

    var antdFormInputProps; 
    //antd 表单组件props（Input,Select等）
    if(v.type !== "hidden"){
      antdFormInputProps = wrapperMount.childAt(k).childAt(1).childAt(0).childAt(0).props()
    }
//测试点四，Antd 表单项（Input，Select）等是否正确渲染（就是是否按照配置一一对应渲染）
    //相同部分
    function antdFormInputExpectCommon(className,type){
      if(v.type === "textarea"){
        type = "textarea";
      }
      expect(antdFormInputProps.type).toEqual(type);
      if(type !== "hidden"){
        expect(antdFormInputProps.prefixCls).toEqual(className);
      }
      expect(antdFormInputProps.size).toEqual("default");
      expect(antdFormInputProps.id).toEqual(v.name);
    }
    switch(v.type){
      case "hidden":
        antdFormInputProps = wrapperMount.childAt(k).childAt(0).props(); 
        //console.log(antdFormInputProps)
        it(`"${ v.type }" <Input />'s should be rendered correctly`,function(){ 
          antdFormInputExpectCommon("ant-input","hidden"); 
        })
      break;
      case "text":
      case "email":
      case "url":
      case "textarea":
        it(`"${ v.type }" <Input />'s should be rendered correctly`,function(){ 
          antdFormInputExpectCommon("ant-input","text"); 
        })
      break;
      case "number":
        //console.log(antdFormInputProps)
        it(`"${ v.type }" <InputNumber />'s should be rendered correctly`,function(){
          antdFormInputExpectCommon("ant-input-number","number"); 
        })
      break;
      case "select":
        //console.log(antdFormInputProps.children[0].type)
        it(`"${ v.type }" <Select />'s should be rendered correctly`,function(){
          antdFormInputExpectCommon("ant-select","select"); 
        })
        if(v.group){
          it(`group <Select />'s should be group`,function(){
            expect(antdFormInputProps.children[0].type.toString()).toContain("OptGroup")
          })
          it(`group <Select />'s children's length should be equal`,function(){
            expect(antdFormInputProps.children).toHaveLength(v.group.length);
          })
        }
        if(v.options){
          it(`option <Select />'s should be options (not group)`,function(){
            expect(antdFormInputProps.children[0].type.toString()).toContain("Option")
          })
          it(`option <Select />'s children's length should be equal`,function(){
            expect(antdFormInputProps.children).toHaveLength(v.options.length);
          })
        }
        if(v.multiple){
          it(`mutiple <Select />'s should be multiple`,function(){
            expect(antdFormInputProps.multiple).toEqual(v.multiple)
          })
          it(`mutiple <Select />'s children's length should be equal`,function(){
            expect(antdFormInputProps.children).toHaveLength(v.options.length);
          })
        }
      break;
      case "time":
        //console.log(antdFormInputProps["data-__meta"].rules)
        it(`"${ v.type }" <TimePicker />'s should be rendered correctly`,function(){
          antdFormInputExpectCommon("ant-time-picker","time"); 
        })
      break;
      default:
    }
//测试点五，Antd 表单项（email，url）等表单验证是否正确渲染
    var rules = antdFormInputProps && antdFormInputProps["data-__meta"] && antdFormInputProps["data-__meta"].rules;
    function commonRuleExpect(other_rules=[]){
      if(rules){
        it(`"${ v.type }" Form child's verification did work correctly`,function(){
          var temp_rules = [];
          Array.prototype.push.apply(temp_rules,v.rules);
          Array.prototype.push.apply(temp_rules,other_rules);
          expect(rules).toEqual(temp_rules)
        })
      }
    }
    switch(v.type){
      case "hidden":
      break;
      case "email":
        //console.log(inputRules)
        commonRuleExpect(inputRules.email);
      break;
      case "url":
        commonRuleExpect(inputRules.url);
      break;
      case "number":
        commonRuleExpect([{
          type: "number",
        }]);
      break;
      case "time":
        commonRuleExpect([{
          type: "object",
        }]);
      break;
      default:
        commonRuleExpect();
    }
  })
})

