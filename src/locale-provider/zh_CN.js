import Input from '../components/Input/en_US'
import InputNumber from '../components/InputNumber/en_US'
import Password from '../components/Password/en_US'
import Select from '../components/Select/en_US'
import FormBuilderConfiger from '../components/FormBuilderConfiger/en_US'

export default Object.assign(
  {
    FormBuilderCommon: {
      required: "是必填项",
      charactersBetwteen: "必须介于%d到%d个字符",
      charactersMin: "至少要%d个字符",
      charactersMax: "不能超过%d个字符",
      charactersOnlyLetter: "只能是英文字母字符",
    }
  },
  Input,
  InputNumber,
  Password,
  Select,
  FormBuilderConfiger,
) 



