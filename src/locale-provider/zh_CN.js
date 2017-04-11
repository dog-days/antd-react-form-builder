import Input from '../components/Input/en_US'
import InputNumber from '../components/InputNumber/en_US'
import Password from '../components/Password/en_US'
import Select from '../components/Select/en_US'
import FormBuilderConfiger from '../components/FormBuilderConfiger/en_US'

export default Object.assign(
  {
    FormBuilderCommon: {
      required: "是必填项",
      charactersBetwteen: "字符个数必须介于%d和%d",
      charactersMin: "字符至少要%d个",
      charactersMax: "字符不能超过%d个",
      charactersOnlyLetter: "字字符串只能是英文字母",
    }
  },
  Input,
  InputNumber,
  Password,
  Select,
  FormBuilderConfiger,
) 



