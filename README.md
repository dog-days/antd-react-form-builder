# antd-react-form-buider

[![build status](https://travis-ci.org/dog-days/antd-react-form-builder.svg?branch=master)](https://travis-ci.org/dog-days/antd-react-form-builder) [![Coverage Status](https://coveralls.io/repos/github/dog-days/antd-react-form-builder/badge.svg?branch=master)](https://coveralls.io/github/dog-days/antd-react-form-builder?branch=master) [![npm package](https://badge.fury.io/js/antd-react-form-builder.svg)](https://www.npmjs.org/package/antd-react-form-builder) [![NPM downloads](http://img.shields.io/npm/dm/antd-react-form-builder.svg)](https://npmjs.org/package/antd-react-form-builder)

基于[Antd](https://ant.design/docs/react/introduce)的react-form-builder，可以使用配置生成表单（整合了表单验证），也支持直接是使用JSX。（两种方式都支持，就像使用react-router一样）

### 安装

目前只支持通过npm安装，需要配合webpack使用。

```sh
npm install antd-react-form-buider --save
```

### 使用

`antd-react-form-builder`是基于antd form进行了一些简便封装，具体antd from用法还是要使用者自己去了解，这里就不多说。`antd-react-form-builder`的表单项都包含了antd 的\<FormItem /\>，表单验证直接通过表单组件props.rules传进来。详细的说明请看下面的**API**。

可以直接参考本项目中的demo。

#### JSX直接使用

```jsx
import React from 'react'
import {
  FormBuilder,
  Input,
  InputNumber,
  Select,
  Button as FButton,
  TimePicker,
} from 
export default class Container extends React.Component {
  handleOnsubmit(e,err,values){
    e.preventDefault();
    console.debug('表单值: ', values);
    if(err){
      console.debug("表单错误",err)
      return; 
    }
  }
  render(){
    return (
  	  <FormBuilder
        onSubmit={ this.handleOnsubmit }
        size="default"
        hasFeedback={ false }
        horizontal 
      >
        <Input 
          type="text" 
          name="text"
          rules={ 
            [
              {
                "required": true,
                "message": "请不要留空"
              }
            ]
          }
          value="ddd"
          placeholder="请输入！"
        />
        <Input 
          type="email" 
          name="email"
          placeholder="请输入邮箱"
        />
        <Button htmlType="submit">
          提交
        </Button>
  	  </FormBuilder>
  	)
  }
}
```

#### 通过配置使用

```jsx
import React from 'react'
import {
  FormBuilder,
  Input,
  InputNumber,
  Select,
  Button as FButton,
  TimePicker,
}
let config = [
  {
    "type": "text",
    "name": "text[]",
    "rules": [
      {
        "required": true,
        "message": "请不要留空"
      }
    ],
    "formItemProps": {
      "label": "随意",
      "labelCol": { "span": 0 }
    },
    "value": "dddd",
    "placeholder": "请输入！"
  },
  {
    "type": "hidden",
    "name": "hidden",
    "value": "dddd"
  },
  {
    "type": "button",
    "buttonType": "primary",
    "htmlType": "submit",
    "formItemProps": {
      "label": "操作",
      "labelCol": { "span": 0 }
    },
    "value": "提交"
  }
]
export default class Container extends React.Component {
  handleOnsubmit(e,err,values){
    e.preventDefault();
    console.debug('表单值: ', values);
    if(err){
      console.debug("表单错误",err)
      return; 
    }
  }
  render(){
    return (
  	  <FormBuilder
        config={config}
        onSubmit={ this.handleOnsubmit }
        size="default"
        hasFeedback={ false }
        horizontal 
      />
  	)
  }
}
```

#### 混合使用

```jsx
import React from 'react'
import {
  FormBuilder,
  Input,
  InputNumber,
  Select,
  Button as FButton,
  TimePicker,
}
let config = [
  {
    "type": "text",
    "name": "text",
    "rules": [
      {
        "required": true,
        "message": "请不要留空"
      }
    ],
    "formItemProps": {
      "label": "随意",
      "labelCol": { "span": 0 }
    },
    "value": "dddd",
    "placeholder": "请输入！"
  },
  {
    "type": "hidden",
    "name": "hidden",
    "value": "dddd"
  }
]
export default class Container extends React.Component {
  handleOnsubmit(e,err,values){
    e.preventDefault();
    console.debug('表单值: ', values);
    if(err){
      console.debug("表单错误",err)
      return; 
    }
  }
  render(){
    return (
  	  <FormBuilder
        config={config}
        onSubmit={ this.handleOnsubmit }
        size="default"
        hasFeedback={ false }
        horizontal 
      >
        <Button 
          buttonType="primary"
          htmlType="submit"
          value="提交"
        />
      </FormBuilder>
  	)
  }
}
```

### API

表单验证的API，请看[antd的表单验证](https://ant.design/components/form/#getFieldDecorator-参数)和[async-validator](https://github.com/yiminghe/async-validator)（antd 采用了这个）。

#### FormBuilder

FormBuilder Props

| props       | 说明                                       | 类型       | 默认值     |
| ----------- | ---------------------------------------- | -------- | ------- |
| config     | 表单生成配置项                                  | object   |         |
| size        | 所有表单子项类型大小（跟antd的size一致，可以被当前设置大小的表单子项size覆盖） | string   | default |
| hasFeedback | antd表单验证FormItem组件是否反馈                   | boolean  | false   |
| onSubmit    | 数据验证成功后回调事件                              | function |         |
| 其他props     | 其他props完全跟antd \<Form /\>一致              |          |         |

config格式如下：

```js
var config = {
  feilds: [
    {
      type: "email",
      name: "email",
      value: "test",
    },
    {
      type: "url",
      name: "url",
      value: "test",
    }
  ]
}
```

onSubmit，传入三个参数，err和values是antd `this.props.form.validateFields`回调函数中的两个参数。

```js
handleSubmit(e,err,values){
  e.preventDefault();
  console.debug('表单值: ', values);
  if(err){
    console.debug("表单错误",err)
    return; 
  }
}
```

#### Input

Input Props

| props   | 说明                                       | 类型     | 默认值     |
| ------- | ---------------------------------------- | ------ | ------- |
| type    | 必填，表单子项类型                                | string | text    |
| name    | 必填，表单验证getFieldDecorator要用到              | string | default |
| rules   | 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) | array  |         |
| 其他props | 其他props完全跟antd \<Input /\>一致             |        |         |

type类型如下：

| type类型   | 说明               |
| -------- | ---------------- |
| email    | 自带email格式验证input |
| url      | 自带urll格式验证input  |
| textarea | 生成textarea       |

#### InputNumber

| props   | 说明                                       | 类型     | 默认值     |
| ------- | ---------------------------------------- | ------ | ------- |
| type    | 值为"number"，使用配置时**必填**，直接使用JSX不用填。       | string | text    |
| name    | 必填，表单验证getFieldDecorator要用到              | string | default |
| rules   | 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) | array  |         |
| 其他props | 其他props完全跟antd \<InputNumber /\>一致       |        |         |

#### InputFile

#### Radio

#### Checkbox

#### Select

| props   | 说明                                       | 类型     | 默认值     |
| ------- | ---------------------------------------- | ------ | ------- |
| type    | 值为"select"，使用配置时**必填**，直接使用JSX不用填。       | string | text    |
| name    | 必填，表单验证getFieldDecorator要用到              | string | default |
| rules   | 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) | array  |         |
| 其他props | 其他props完全跟antd \<Select /\>一致            |        |         |

#### TimePicker

| props   | 说明                                       | 类型     | 默认值     |
| ------- | ---------------------------------------- | ------ | ------- |
| type    | 值为"time"，使用配置时**必填**，直接使用JSX不用填。         | string | text    |
| name    | 必填，表单验证getFieldDecorator要用到              | string | default |
| rules   | 校验规则，参见 [async-validator](https://github.com/yiminghe/async-validator) | array  |         |
| 其他props | 其他props完全跟antd \<TimePicker /\>一致        |        |         |

#### DatePicker

#### Mention

#### Cascader

### 国际化