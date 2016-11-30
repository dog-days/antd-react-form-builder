module.exports = {
  text: {
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
  hidden: {
    "type": "hidden",
    "name": "hidden",
    "value": "dddd"
  },
  email: {
    "type": "email",
    "name": "email",
    "value": "xianshannan@qq.com",
    "rules": [
      {
        "required": true,
        "message": "请不要留空"
      }
    ],
    "placeholder": "请输入邮箱！",
    "formItemProps": {
      "label": "邮箱",
      "labelCol": { "span": 0 }
    }
  },
  url: {
    "type": "url",
    "name": "url",
    "value": "xianshannan@test.com",
    "rules": [
      {
        "required": true,
        "message": "请不要留空"
      }
    ],
    "formItemProps": {
      "label": "网址",
      "labelCol": { "span": 0 }
    },
    "placeholder": "请输入网址"
  },
  textarea: {
    "type": "textarea",
    "name": "textarea",
    "value": "123456",
    "rules": [
      {
        "required": true,
        "message": "请不要留空"
      }
    ],
    "formItemProps": {
      "label": "评论",
      "labelCol": { "span": 0 }
    },
    "placeholder": ""
  },
  number: {
    "type": "number",
    "name": "number",
    "value": "123456",
    "rules": [
      {
        "required": true,
        "message": "请不要留空"
      }
    ],
    "formItemProps": {
      "label": "序号",
      "labelCol": { "span": 0 }
    },
    "placeholder": ""
  },
  "singleSelect": {
    "type": "select",
    "name": "city",
    "value": "0",
    "allowClear": true,
    "rules": [
      {
        "required": true, 
        "message": "请选择城市"
      }
    ],
    "options": [
      {
        "value": "shenzen",
        "text": "深圳"
      },
      {
        "value": "1",
        "text": "上海"
      },
      {
        "value": "2",
        "text": "北京"
      }
    ],
    "formItemProps": {
      "label": "城市",
      "labelCol": { "span": 0 }
    },
    "placeholder": "请选择城市！"
  },
  groupSelect: {
    "type": "select",
    "name": "city2",
    "value": "0",
    "rules": [
      {
        "required": true, 
        "message": "请选择城市"
      }
    ],
    "group": [
      {
        "label": "广东省",
        "options": [
          {
            "value": "shenzen",
            "text": "深圳"
          }
        ] 
      }
    ],
    "formItemProps": {
      "label": "城市",
      "labelCol": { "span": 0 }
    },
    "placeholder": "请选择城市！"
  },
  multipleSelect: {
    "multiple": true,
    "type": "select",
    "name": "city3",
    "rules": [
      {
        "type": "array", 
        "required": true,
        "message": "请选择城市"
      }
    ],
    "value": ["0","1","2"],
    "options": [
      {
        "value": "shenzen",
        "text": "深圳"
      },
      {
        "value": "上海",
        "text": "上海"
      },
      {
        "value": "北京",
        "text": "北京"
      }
    ],
    "formItemProps": {
      "label": "城市",
      "labelCol": { "span": 0 }
    },
    "placeholder": "请选择城市！"
  },
  timePicker: {
    "type": "time",
    "name": "time",
    "value": "13:30:56", 
    "rules": [
      {
        "required": true,
        "message": "请选择时间"
      }
    ],
    "formItemProps": {
      "label": "时间",
      "labelCol": { "span": 0 }
    }
  },
  button: {
    "type": "button",
    "buttonType": "primary",
    "htmlType": "submit",
    "formItemProps": {
      "label": "操作",
      "labelCol": { "span": 0 }
    },
    "value": "提交"
  }
}
