import React from 'react'
import AntdButton from 'antd/lib/button'
import AntdForm from 'antd/lib/form'

let FormItem = AntdForm.Item;

export default class Button extends React.Component {

  render() {
    let props = this.props;
    let {
      value,
      buttonType,
      formItemProps,
      ...other,
    } = props;

    other.type = buttonType;
    return (
      <FormItem {...formItemProps}>
        <AntdButton
          { ...other }
        >
          { value }
        </AntdButton>
      </FormItem>
    ) 
  }
}



