import "./polyfill"
import Form from 'antd/lib/form'
import Input from './components/Input'
import InputNumber from './components/InputNumber'
import Select from './components/Select'
import Button from './components/Button'
import TimePicker from './components/TimePicker'
import DatePicker from './components/DatePicker'
import MonthPicker from './components/MonthPicker'
import RangePicker from './components/RangePicker'
import CheckboxGroup from './components/CheckboxGroup'
import RadioGroup from './components/RadioGroup'
import Password from './components/Password'
import Cascader from './components/Cascader'
import FormBuilder from "./components/FormBuilder"
import FormBuilderConfiger from "./components/FormBuilderConfiger"

const FormItem = Form.Item;

export default FormBuilder;

export {
  FormItem,
  FormBuilder,
  FormBuilderConfiger,
  Input,
  InputNumber,
  Select,
  Button,
  TimePicker,
  DatePicker,
  MonthPicker,
  RangePicker,
  CheckboxGroup,
  RadioGroup,
  Password,
  Cascader,
}


