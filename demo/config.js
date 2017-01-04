import util from "../src/util"
module.exports = {
  text: {
    type: "text",
    name: "text",
    value: "text",
    key: util.getUniqueKey(),
    formItemProps: {
      label: "说明",
    },
    rules: [
      {
        required: true,
        message: "请不要留空"
      }
    ],
    placeholder: "请输入！",
  }
}
