import Input from '../components/Input/en_US'
import InputNumber from '../components/InputNumber/en_US'
import Password from '../components/Password/en_US'
import Select from '../components/Select/en_US'
import FormBuilderConfiger from '../components/FormBuilderConfiger/en_US'

export default Object.assign(
  {
    FormBuilderCommon: {
      required: " is required",
      charactersBetwteen: "characters text must be between %d and %d",
      charactersMin: "characters must be at least %d",
      charactersMax: "characters cannot be longer than %d",
      charactersOnlyLetter: "characters must be english letter",
    }
  },
  Input,
  InputNumber,
  Password,
  Select,
  FormBuilderConfiger,
) 


