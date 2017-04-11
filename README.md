# antd-react-form-buider

[![build status](https://travis-ci.org/dog-days/antd-react-form-builder.svg?branch=master)](https://travis-ci.org/dog-days/antd-react-form-builder) [![Coverage Status](https://coveralls.io/repos/github/dog-days/antd-react-form-builder/badge.svg?branch=master)](https://coveralls.io/github/dog-days/antd-react-form-builder?branch=master) [![npm package](https://badge.fury.io/js/antd-react-form-builder.svg)](https://www.npmjs.org/package/antd-react-form-builder) [![NPM downloads](http://img.shields.io/npm/dm/antd-react-form-builder.svg)](https://npmjs.org/package/antd-react-form-builder)

之所以写了这个项目有以下几点原因：

- [Antd](https://ant.design/docs/react/introduce)的表单验证是会触发整个组件渲染，（使用Form.create()装饰器后和getFieldDecorator后）
- 默认的Antd表单组件是不自带验证的，需要使用配套的getFieldDecorator装饰过后才可以验证。
- 没有嵌套的表单可用。

基于以上原因，就有了本项目。

本项目是基于[Antd](https://ant.design/docs/react/introduce)的antd-react-form-builder，既可以使用配置生成表单（整合了表单验证），也支持直接是使用JSX。（两种方式都支持，就像使用react-router一样）

### 安装

目前只支持通过npm安装。

```sh
npm install antd-react-form-builder --save
```

### 兼容

兼容IE10以上，兼容谷歌、Safari、火狐等浏览器最新版本。

### 使用

`antd-react-form-builder`是基于antd form进行了一些简便封装，具体antd from用法还是要使用者自己去了解，这里就不多说。`antd-react-form-builder`的表单项都包含了antd 的`<FormItem \>`，表单验证直接通过表单组件props.rules传进来。详细的说明请看下面的**API**。

可以直接参考本项目中的demo。

需要而外引入css文件

```js
import "antd/dist/antd.css"
import "antd-react-form-buider/lib/style.css"
```

#### JSX直接使用

```jsx
import React from 'react'
import {
  FormBuilder,
  Input,
} from "antd-react-form-buider"
import {
  Form,
} from "antd"

@FormBuilder.create()
export default class Container extends React.Component {
  handleOnsubmit(e){
    e.preventDefault();
    this.props.formBuilder &&
    this.props.formBuilder.validateFields((err, values) => {
      console.debug('values: ', values);
      if(err){
        console.debug("表单错误",err)
        return; 
      }else {
        console.debug('表单值: ', values);
      }
    });
  }
  render(){
    return (
  	  <FormBuilder
        onSubmit={ this.handleOnsubmit }
        size="default"
        hasFeedback={ true }
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
          type="text" 
          name="text"
          required
          value="ddd"
		 label="随意"
          placeholder="请输入！"
        />
        <Form.Item>
          <Button htmlType="submit">
            提交
          </Button>
        </Form.Item>
  	  </FormBuilder>
  	)
  }
}
```

#### 通过配置使用（简单的）

```jsx
import React from 'react'
import {
  FormBuilder,
  Input,
} from "antd-react-form-buider"
let config = [
  {
    type: "text",
    name: "text[]",
    //规则验证，必填验证可以直接使用required
    rules: [
      {
        required: true,
        "message": "请不要留空"
      }
    ],
    //antd Form.Item props，formItemProps.label可以直接使用label="xxx"
    formItemProps: {
      label: "随意",
      labelCol: { "span": 0 }
    },
    value: "dddd",
    placeholder: "请输入！"
  },
  {
    type: "text",
    name: "text",
    required
    label: "随意"
    value: "dddd",
    placeholder: "请输入！"
  },
]
@FormBuilder.create()
class Container extends React.Component {
  handleOnsubmit(e){
    e.preventDefault();
    this.props.formBuilder &&
    this.props.formBuilder.validateFields((err, values) => {
      console.debug('values: ', values);
      if(err){
        console.debug("表单错误",err)
        return; 
      }else {
        console.debug('表单值: ', values);
      }
    });
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
export default Container;
```

#### 混合使用

```jsx
import React from 'react'
import {
  FormBuilder,
  Input,
} from "antd-react-form-buider"
let config = [
  {
    type: "text",
    name: "text",
    required
    label: "随意"
    value: "dddd",
    placeholder: "请输入！"
  },
]
@FormBuilder.create()
class Container extends React.Component {
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
        <Input 
          type="text" 
          name="text"
          required
          value="ddd"
		 label="随意"
          placeholder="请输入！"
        />
        <Form.Item>
          <Button htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </FormBuilder>
  	)
  }
}
export default Container;
```

### 国际化

跟antd的国际化用法一致，请参考[https://ant.design/docs/react/i18n-cn](https://ant.design/docs/react/i18n-cn)。

```jsx
import AntdEnUS from 'antd/lib/locale-provider/en_US'
import FormBuilderEnUS from '../lib/locale-provider/es_US'
//整合Antd和FormBuilder的国际化语言
let enUS = Object.assign({},AntdEnUS,FormBuilderEnUS)
return (
  <LocaleProvider locale={enUS}>
    <App />
  </LocaleProvider>
);
```

### FormBuilder API

表单验证的API，请看[antd的表单验证](https://ant.design/components/form/#getFieldDecorator-参数)和[async-validator](https://github.com/yiminghe/async-validator)（antd 采用了这个）。

#### FormBuilder

```jsx
<FormBuilder
  config={config}
  onSubmit={ this.handleOnsubmit }
  size="default"
  hasFeedback={ false }
>
  <Input name="test"/>
</FormBuilder>
```

| props            | 说明                                       | 类型      | 必填   | 默认值     |
| ---------------- | ---------------------------------------- | ------- | ---- | ------- |
| config          | FormBuilder 配置项，表单就是从这些配置中渲染出来的          | object  | 否    | 无       |
| size             | 设置表单子项（包括antd Input、Select等和FormItem）size，单个针对设置优先级更高。 | string  | 否    | default |
| hasFeedback      | 表单验证在antd的FormItem验证是否反馈，单个针对设置优先级更高。    | boolean | 否    | false   |
| labelCol         | 跟antd的Form.Item prop.labelCol完全一致，这里是统一设置，单个针对设置优先级更高。 | object  | 否    | 无       |
| wrapperCol       | 跟antd的Form.Item prop.wrapperCol完全一致，这里是统一设置，单个针对设置优先级更高。 | object  | 否    | 无       |
| formBuilder      | 经 `FormBuilder.create()` 包装过的组件会自带 `this.props.formBuilder` 属性，FormBuilder 无需设置。用法跟antd的`Form.create()`类似。 | object  | 否    | 无       |
| selectSourceData | list类型数据源，动态配置的时候用到，直接写配置的可以不用这种方式，主要是配合FormBuilderConfiger使用。 | array   | 否    | 无       |
| 其他props          | 其他props完全跟antd \<Form /\>一致              |         |      |         |

config格式如下，可以参考后续的每个表单项props API：

```js
//简单的
var simpleConfig = [
  {
    key: "name",
    name: "physics",
    label: "服务器物理属性表",
    required: true,
    type: "number",
  }
]
//嵌套的，关键看children
//模型
var config = [
  {
    key: "name",
    name: "physics",
    label: "服务器物理属性表",
    required: true,
    type: "object",
    children: [
      {...},
      {...},
    ],
  },
  {
    key: "name",
    name: "physics",
    label: "服务器物理属性表",
    required: true,
    type: "array",
    children: [
      [...],
      [...],
    ],
  },
]
//示例
var config = [
  {
    key: util.getUniqueKey(),
    name: "physics",
    label: "服务器物理属性表",
    type: "object",
    required: true,
    children: [
      {
        key: util.getUniqueKey(),
        name: "power_num",
        type: "number",
        required: true,
        label: "电源个数",
        value: "10",
        read_only: true,
        can_not_delete: true,
      },
      {
        key: util.getUniqueKey(),
        name: "rack_digit",
        type: "number",
        required: true,
        label: "机架位数",
      },
      {
        key: util.getUniqueKey(),
        name: "dist_list",
        type: "array",
        required: true,
        label: "硬盘列表",
        children: [
          [
            {
              key: util.getUniqueKey(),
              name: "brand",
              type: "string",
              required: true,
              label: "硬盘品牌",
            },
            {
              key: util.getUniqueKey(),
              name: "model",
              type: "string",
              required: true,
              label: "硬盘型号",
            },
          ],
		 [
            {
              key: util.getUniqueKey(),
              name: "brand1",
              type: "string",
              required: true,
              label: "硬盘品牌1",
            },
            {
              key: util.getUniqueKey(),
              name: "model1",
              type: "string",
              required: true,
              label: "硬盘型号1",
            },
          ],
        ],
      },
    ]
  }
]
```

结构说明

| 字段名      | 类型     | 说明                                       | 必填   |
| -------- | ------ | ---------------------------------------- | ---- |
| key      | string | react key值                               | 是    |
| name     | string | 字段名                                      | 是    |
| type     | string | 字段类型                                     | 是    |
| label    | string | 字段说明                                     | 否    |
| required | string | 是否必填                                     | 否    |
| children | array  | 子字段，里面的结构完全同父结构，只有`object`和`array`类型有children字段。 | 否    |

`type`说明

| 可取值     | 说明                   |
| ------- | -------------------- |
| string  | 字符串类型，默认是这种类型        |
| number  | 数字类型                 |
| integer | 整数类型                 |
| float   | 浮点数类型                |
| boolean | 布尔值 true \|\| false  |
| list    | 下拉类型，select选择框，特殊的一种 |
| array   | 数组类型                 |
| object  | 对象类型                 |
| date    | 日期对象类型               |
| url     | url类型                |
| emai    | 电子邮箱类型               |

#### FormBuilder.create()

高阶组件方式

```jsx
class CustomizedForm extends React.Component {}
CustomizedForm = FormBuilder.create()(CustomizedForm);
```

类装饰器方式

```jsx
@FormBuilder.create()
class CustomizedForm extends React.Component {}
```

类似antd的`FormBuilder.create()`。经过 `FormBuilder.create()` 包装的组件将会自带 `this.props.formBuilder` 属性，`this.props.formBuilder` 提供的 API 如下：

| 参数             | 说明                                       | 类型     | 类型                                   |
| -------------- | ---------------------------------------- | ------ | ------------------------------------ |
| setFieldsValue | 跟antd的一样，设置一组输入控件的值（注意：不要在 `componentWillReceiveProps` 内使用，否则会导致死循环） | string | setFieldsValue({xxx: value})         |
| validateFields | 校验并获取全部表单组件的输入域的值与 Error，通常在onSubmit中使用。（跟antd不一样的地方在于不可以局部校验） | string | validateFields(function(err,values)) |
| 其他props        | 其他props完全跟antd \<Input /\>一致             |        |                                      |

#### FormBuilder.valuesToConfig

formBuilderConfig value赋值（根据FormBuilder的表单结构所存储的值来赋值） 。当我们需要为嵌套的表单赋值时，使用这个方法（setFieldsValue不够用了）。

| 参数                | 说明                         | 类型     | 默认值  |
| :---------------- | :------------------------- | :----- | :--- |
| formBuilderConfig | FormBuilder组件的props.config | array  | 无    |
| data              | FormBuilder的嵌套表单的值         | object | 无    |

```jsx
//配置
var config = [
  {
    type: "email",
    required: true,
    label: "说明",
    placeholder: "请输入"
  },
  {
    type: "email2",
    required: true,
    label: "说明",
    placeholder: "请输入"
  },
]
var values = {
  email: "test@163.com",
  email2: "test2@163.com",
}
config = FormBuilder.valuesToConfig(config,values);
...
return (
  <FromBuilder config={config}/>
)
...
```

#### 表单组件公共部分的API

| props         | 说明                                       | 类型      | 必填   | 默认值   |
| ------------- | ---------------------------------------- | ------- | ---- | ----- |
| name          | input、select等的的name（跟原生的html一样），同时async-validator要用到（表单验证），取值要用到，要唯一。 | string  | 是    | 无     |
| label         | 表单项左边的展示名称                               | string  | 否    | 无     |
| value         | 初始化的value设置，**这里没有`defaultValue`的概念**。   |         |      |       |
| required      | 表单项是否必填（这个验证会合并到rules中的）                 | boolean | 否    | 无     |
| rules         | 验证规则请参考下面`props.rules`的说明。               | array   | 否    | 无     |
| formItemProps | 跟antd的Form.Item的props完全一致，请参考[Form.Item](https://ant.design/components/form-cn/#Form.Item)，这个不经常使用 | object  | 否    | 无     |
| array         | 是否是数组类型的表单（可以动态添加多项）。**注意：除了select类型表单组件，其他表单组件都应用这个设置**。 | boolean | 否    | false |
| 其他props       | 其他props继承antd的中表单项，`defualtValue`除外。     |         |      |       |

`props.rules`大致结构如下，更高级请参考 [async-validator](https://github.com/yiminghe/async-validator)。

```js
[
  //async-validator自带的验证规则
  { type: "string", required: true,message: "必填项"},
  //自定义验证规则
  {
    validator(rule, value, callback, source, options) {
      var errors = [];
      // test if email address already exists in a database
      // and add a validation error to the errors array if it does
      callback(errors);
    }
  }
]
```

#### Input

```jsx
//jsx
<Input type="email" required label="说明" placeholder="请输入"/>
//配置
[{
  type: "email",
  required: true,
  label: "说明",
  placeholder: "请输入"
}]
```

| props      | 说明          | 类型      | 必填   | 默认值   |
| ---------- | ----------- | ------- | ---- | ----- |
| type       | 表单子项类型      | string  | 否    | text  |
| onlyLetter | 是否只允许输入英文字母 | boolean | 否    | false |
| min        | 输入字符最小长度    | number  | 否    | 无     |
| max        | 输入字符最大长度    | number  | 否    | 无     |

参考[Antd.Input](https://ant.design/components/input-cn/)。

公共部分的props请参考，**表单组件公共部分的API**。

type类型如下：

| type类型   | 说明                        |
| -------- | ------------------------- |
| email    | 自带email格式验证input          |
| url      | 自带urll格式验证input           |
| phone    | 自带手机验证规则（现在只支持中国的，不支持国外的） |
| hidden   | 隐藏Input                   |
| textarea | textarea                  |

#### InputNumber

```jsx
//jsx
<InputNumber required label="说明" placeholder="请输入"/>
//配置
[{
  type: "number",
  required: true,
  label: "说明",
  placeholder: "请输入"
}]
```

| 说明                                       | props | 类型     | 必填   | 默认值    |
| ---------------------------------------- | ----- | ------ | ---- | ------ |
| 使用配置时**必填**，直接使用JSX可选。type值分别为`number`、`float`、`integer`。 | type  | string | 否    | number |

参考[Antd.Input](https://ant.design/components/input-cn/)。
公共部分的props请参考，**表单组件公共部分的API**。

#### Select

```jsx
//jsx
<Select required label="说明" options={[]}/>
//配置
[{
  type: "select",
  required: true,
  label: "说明",
  options: []
}]
```

| props    | 说明                                       | 类型      | 默认值    |
| -------- | ---------------------------------------- | ------- | ------ |
| type     | 使用配置时**必填**，直接使用JSX可选。type取值`select`，只有一种值。 | string  | select |
| options  | select options配置项                        | array   | []     |
| multiple | 是否多选                                     | boolean | false  |
| group    | select分组配置项，这个配置优先于`props.options`       | array   | 无      |
| boolean  | 是否是boolean选择组件（只有”是“和”否“两个选项）            |         |        |

参考[Antd.Select](https://ant.design/components/select-cn/)。
公共部分的props请参考，**表单组件公共部分的API**。
select`props.options`结构如下：

```js
[
  {
    value: "shenzhen",
    label: "深圳"
  },
  {
    value: "beijing",
    label: "北京"
  },
]
```

select`props.group`结构如下：

```js
[
  {
    label: "广东省",
    options: [
      {
        value: "shenzen",
        label: "深圳"
      }
    ] 
  },
  {
    label: "广东省",
    options: [
      {
        value: "shenzen2",
        label: "深圳2"
      }
    ] 
  },
]
```

#### TimePicker

```jsx
//jsx
<TimePicker required label="说明" value="19:01:00"/>
//配置
[{
  type: "time",
  required: true,
  label: "说明",
  value: "19:01:00"
}]
```

| props | 说明                                       | 类型                                     | 默认值  |
| ----- | ---------------------------------------- | -------------------------------------- | ---- |
| type  | 使用配置时**必填**，直接使用JSX可选。type取值`time`或`time-picker`，只有一种值。 | string                                 | time |
| value | string类型为`HH:mm:ss`（19:01:00），moment类型`new moment(value,"HH:mm:ss")`。 | string或 [moment](http://momentjs.com/) | 无    |

参考[Antd.TimePicker](https://ant.design/components/time-picker-cn/)。
公共部分的props请参考，**表单组件公共部分的API**。

#### DatePicker

```jsx
//jsx
<DatePicker required label="说明" value="2017-03-30"/>
//配置
[{
  type: "date",
  required: true,
  label: "说明",
  value: "2017-03-30"
}]
```

| props | 说明                                       | 类型                                     | 默认值  |
| ----- | ---------------------------------------- | -------------------------------------- | ---- |
| type  | 使用配置时**必填**，直接使用JSX可选。type取值`date`或`date-picker`，只有一种值。 | string                                 | date |
| value | string类型取值跟moment的[format](http://momentjs.cn/docs/#/displaying/format/)格式一致（如YYYY-MM-DD对应2017-03-30），moment类型`new moment(value,props.format)`。 | string或 [moment](http://momentjs.com/) | 无    |

参考[Antd.DatePicker](https://ant.design/components/date-picker-cn/)。
公共部分的props请参考，**表单组件公共部分的API**。

#### MonthPicker

```jsx
//jsx
<MonthPicker required label="说明" value="2017-03"/>
//配置
[{
  type: "month",
  required: true,
  label: "说明",
  value: "2017-03"
}]
```

| props | 说明                                       | 类型                                     | 默认值   |
| ----- | ---------------------------------------- | -------------------------------------- | ----- |
| type  | 使用配置时**必填**，直接使用JSX可选。type取值`month`或`month-picker`，只有一种值。 | string                                 | month |
| value | string类型为`YYYY-MM`（2017-03），moment类型`new moment(value,"YYYY-MM")`。 | string或 [moment](http://momentjs.com/) | 无     |

参考[Antd.DatePicker](https://ant.design/components/date-picker-cn/)。
公共部分的props请参考，**表单组件公共部分的API**。

#### RangePicker

```jsx
//jsx
<RangePicker required label="说明" value={["2017-03-01","2017-03-03"]}/>
//配置
[{
  type: "month",
  required: true,
  label: "说明",
  value: ["2017-03-01","2017-03-03"]
}]
```

| props | 说明                                       | 类型     | 默认值   |
| ----- | ---------------------------------------- | ------ | ----- |
| type  | 使用配置时**必填**，直接使用JSX可选。type取值`range`或`range-picker`，只有一种值。 | string | range |
| value | 数组中的取值，参考DataPicker的value                | array  | 无     |

参考[Antd.DatePicker](https://ant.design/components/date-picker-cn/)。
公共部分的props请参考，**表单组件公共部分的API**。

#### CheckboxGroup

```jsx
//jsx
<CheckboxGroup required label="说明" options={[]}/>
//配置
[{
  type: "checkbox-group",
  required: true,
  label: "说明",
  options={[]}
}]
```

| props | 说明                                       | 类型     | 默认值            |
| ----- | ---------------------------------------- | ------ | -------------- |
| type  | 使用配置时**必填**，直接使用JSX可选。type取值`checkbox-group`，只有一种值。 | string | checkbox-group |

参考[Antd.Checkbox](https://ant.design/components/checkbox-cn/)。
公共部分的props请参考，**表单组件公共部分的API**。

#### RadioGroup

```jsx
//jsx
<RadioGroup required label="说明" options={[]}/>
//配置
[{
  type: "checkbox-group",
  required: true,
  label: "说明",
  options={[]}
}]
```

| props   | 说明                                       | 类型     | 默认值         |
| ------- | ---------------------------------------- | ------ | ----------- |
| type    | 使用配置时**必填**，直接使用JSX可选。type取值`radio-group`，只有一种值。 | string | radio-group |
| options | 配置选项                                     |        |             |

参考[Antd.Radio](https://ant.design/components/radio-cn/)。
公共部分的props请参考，**表单组件公共部分的API**。

RadioGroup的`props.options`结构如下：

```js
[
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
]
```

#### Password

````jsx
//jsx
<Password required label="密码" rePassword={true}/>
//配置
[{
  type: "checkbox-group",
  required: true,
  label: "说明",
  rePassword: true
}]
````

| props               | 说明                                       | 类型      | 默认值      |
| ------------------- | ---------------------------------------- | ------- | -------- |
| type                | 使用配置时**必填**，直接使用JSX可选。type取值`password`，只有一种值。 | string  | password |
| rePassword          | 是否重复验证密码                                 | boolean | false    |
| onlyLetterAndNumber | 只允许输入英文字母和数字结合的密码                        | boolean | true     |
| min                 | 输入字符最小长度                                 | number  | 否        |
| max                 | 输入字符最大长度                                 | number  | 无        |

参考[Antd.Input](https://ant.design/components/input-cn/)。
公共部分的props请参考，**表单组件公共部分的API**。

#### Cascader

```jsx
//jsx
<Cascader required label="密码" options={[]}/>
//配置
[{
  type: "checkbox-group",
  required: true,
  label: "说明",
  options: [],
}]
```

| props | 说明                                       | 类型     | 默认值      |
| ----- | ---------------------------------------- | ------ | -------- |
| type  | 使用配置时**必填**，直接使用JSX可选。type取值`cascader`，只有一种值。 | string | cascader |

参考[Antd.Cascader](https://ant.design/components/cascader-cn/)。
公共部分的props请参考，**表单组件公共部分的API**。

### FormBuilderConfiger API

#### FormBuilderConfiger

```jsx
<FormBuilderConfiger 
  hasNoneTableTitle={ true }
  onChange={ this.onConfigerChange }
  config={
    this.state.table
  }
  title="表格字段配置"
  selectSourceDataMap={
    selectSourceDataMap
  }
/>
```

| props               | 说明                                       | 类型       | 默认值                         |
| ------------------- | ---------------------------------------- | -------- | --------------------------- |
| title               | 第一级table的title，hasNoneTableTitle为true时隐藏 | string   | 字段管理                        |
| config              | 配置数据，只要config改变了都会以新的config重新渲染（父组件传进来）  | array    | []                          |
| onChange            | 配置数据变化时触发的回调函数（这里的配置数据与父组件传进来的是相互独立的）,function(data01,data02)，data01是formBuilderConfiger的配置数据，data02是formBuilder的配置数据 | function | 无                           |
| hasNoneTableTitle   | antd table title是否显示（两种添加新字段的方式）         | boolean  | true                        |
| selectSourceDataMap | 拉选择数据源选项                                 | array    | 无                           |
| fieldAddedOperation | fieldAddedOperation 添加字段的按钮或图标（react组件）  | object   | `<Antd.Icon type="plus" />` |

`props.config`

```js
var config = [
  {
    key: util.getUniqueKey(),
    name: "physics",
    label: "服务器物理属性表",
    type: "object",
    required: true,
    children: [
      {
        key: util.getUniqueKey(),
        name: "power_num",
        type: "number",
        required: true,
        label: "电源个数",
        value: "10",
        read_only: true,
        can_not_delete: true,
      },
      {
        key: util.getUniqueKey(),
        name: "rack_digit",
        type: "number",
        required: true,
        label: "机架位数",
      },
      {
        key: util.getUniqueKey(),
        name: "dist_list",
        type: "array",
        required: true,
        label: "硬盘列表",
        children: [
          {
            key: util.getUniqueKey(),
            name: "brand",
            type: "string",
            required: true,
            label: "硬盘品牌",
          },
          {
            key: util.getUniqueKey(),
            name: "model",
            type: "string",
            required: true,
            label: "硬盘型号",
          },
        ],
      },
    ]
  }
]
```

#### FormBuilderConfiger.create()

高阶组件方式

```jsx
class CustomizedForm extends React.Component {}
CustomizedForm = FormBuilderConfiger.create()(CustomizedForm);
```

类装饰器方式

```jsx
@FormBuilderConfiger.create()
class CustomizedForm extends React.Component {}
```

经过 `FormBuilderConfiger.create()` 包装的组件将会自带 `this.props.formBuilderConfiger` 属性，`this.props.formBuilderConfiger` 提供的 API 如下：

| props                                    | 说明                                       | 类型       | 默认值           |
| :--------------------------------------- | :--------------------------------------- | :------- | :------------ |
| formBuilderConfiger.openAddFieldDialogEvent | 打开最上层添加字段的弹窗，一般在hasNoneTableTitle设置为true时需要用到。 | function | function(e){} |

#### FormBuilderConfiger.formBuilderConfigAdapter

formBuilderConfiger配置转换成FormBuilder的config配置，他们的区别在于type为array类型的时候，formBuilder的children需要再包一层数组，`children: [] => children: [[]]`。

| 参数   | 说明                     | 类型    | 默认值  |
| :--- | :--------------------- | :---- | :--- |
| data | formBuilderConfiger的配置 | array | 无    |

