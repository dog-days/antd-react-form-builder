import React from 'react'
import { shallow,mount,render } from 'enzyme'
import sinon from 'sinon'
import FormBuilderConfiger from '../index'

const selectSourceDataMap = [
  {
    text: "选择一",
    value: "one",
  },
  {
    text: "选择二",
    value: "two",
  },
];
const config = [{
  name: "physics",
  label: "服务器物理属性表",
  type: "object",
  required: true,
  children: [
    {
      name: "power_num",
      type: "number",
      required: 'true',
      label: "电源个数",
    },
    {
      name: "rack_digit",
      type: "boolean",
      required: true,
      label: "机架位数",
    },
    {
      name: "disk_list",
      type: "table",
      required: true,
      label: "硬盘列表",
      children: [
        {
          name: "brand",
          type: "string",
          required: true,
          label: "硬盘品牌",
        },
        {
          name: "model",
          type: "string",
          required: true,
          label: "硬盘型号",
        },
      ],
    },
  ]
} ];
describe('FormBuilderConfiger',function(){
  sinon.stub(console,"warn");
  it('renders correctly', () => {
    const wrapper = render(
      <FormBuilderConfiger 
        config={ config }
        selectSourceDataMap={
          selectSourceDataMap
        }
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
})

