# react-form-buider设计文档

由于业务需求，同时提高开发效率，需要一套可以快速生成form表单类库，于是就有这个类库想法。

## 设计

### 读取表单配置

根据以下json配置生成form表单

```json
{
  "type": "horizontal",
  "feilds": [
    {
      "type": "email",
      "name": "email",
      "label": "邮箱：",
      "value": "xianshannan@qq.com",
      "defaultValue": "xianshannan@qq.com",
      "placeholder": "请输入邮箱！",
      "verification": true
    },
    {
      "type": "password",
      "rePassword": true,
      "name": "password",
      "label": "密码：",
      "value": "123456",
      "defaultValue": "",
      "placeholder": "请输入密码！",
      "verification": true
    },
    {
      "type": "select",
      "name": "select",
      "value": "123456",
      "defaultValue": "",
      "label": "城市：",
      "placeholder": "请选择城市！",
      "verification": true
    },
    {
      "type": "texarea",
      "name": "texarea",
      "value": "123456",
      "defaultValue": "",
      "label": "评论：",
      "placeholder": "",
      "verification": false 
    },
    {
      "type": "number",
      "name": "number",
      "value": "123456",
      "defaultValue": "",
      "label": "序号：",
      "placeholder": "",
      "verification": true
    }
  ]
}
```

### 表单组件绑定

```jsx
//input绑定
export var Input = function(props){
  return <input {...props}/>;
}

//select绑定
export var Select = function(props){
  return (
  	<select {...props}>
      {props.children}
    </select>
  )
}
export var Option = function(props){
  return <option {...props}/>;
}
//texarea绑定
export var Textarea = function(props){
  return <textarea {...props}/>;
}
```

## 疑问

1. json配置中value之渲染，会重新构造（即使一样），这样不是有更多的时间和性能的消耗吗？

   的确会存在这种问题，但是我们的表单项不会特别多的（有20条都算多了），而且重新生成json配置对象并不会消耗多少时间和性能（消耗时间和性能一般都是在dom操作上，程序运行很快的）。而且分开配置，有点不好，就是让人有时候难没有十分把握一一对应，所以还是决定放在一个配置中。