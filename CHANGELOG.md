## 更新日志

### 0.5.0

`2017-04-20`

- Fix 无props.config报错问题

### 0.4.9

`2017-04-20`

- Recover FormBuilderConfiger中的config每个数据都要设置key值

### 0.4.8

`2017-04-20`

- Fix FormBuilder.valuesToConfig的type类型为array，值填充失败问题
- Fix IconGroup缺失lodash问题
- modify FormBuilderConfiger 的props.config可以不用添加key值

### 0.4.7

`2017-04-19`

- Add 单独Antd表单等本项目依赖的样式（src/style/index.js）

### 0.4.6

`2017-04-18`

- rewrite antd组件引入方式，去掉样式引入

### 0.4.5

`2017-04-18`

-  Fix 使用babel-plugin-import时样式问题
-  Fix 时间类组件不设置value值时，隐藏input值为NaN问题

### 0.4.4

`2017-04-17`

- TimePicker && DatePicker && MonthPicker && RangePicer
  - validateFields中参数返回值改为unix字符串
- Fix 无FormBuilder组件包含报错问题
- Fix password类型映射问题
- Fix 无FormBuilder组件包含保存问
- Modified FormBuilderConfiger弹窗长度设置input改为inutnumber
- Add input && password props.min 和props.max 支持string类型
- Fix password 填写默认值报错问题
- Fix loadsh未引入问题
- Add 自动化测试
- Fix 配置模式password类型映射问题

### 0.4.3

`2017-04-12`

- FormBuilder
  -  Modified 重新定义FormBuilder表单配置类型
- FormBuilderConfiger
  - Modified 重新定义FormBuilder表单配置类型
  - Add props.canNotDeleteFunction属性
  - Add props.readOnlyFunction属性
  - Add 表单而外类型array选择功能
  - Add 类型为srting的表单组件最小最大长度功能

#### 0.4.2

`2017-04-11`

- Input

  - Add 表单长度验证功能
  - Add 只允许输入英文验证功能
  - Fixed type为phone时，空字符也验证手机格式问题

- Password

  - Add 表单长度验证
  - Add 只允许输入英文和数字结合验证

  ​