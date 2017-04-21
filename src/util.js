import localeText from "./locale-provider/zh_CN"
import _ from "lodash"

export default {
  isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  },
  /**
   * 交换数组指定的的两个键值位置,repalceIndex > index 下移，相反上移
   * @param {Array} arr 需要处理的数组
   * @param {index1} index 目标索引位置 
   * @param {index2} repalceIndex 替换索引位置
   * @return {Array} 返回处理的数组
   */
  swapArrayItem(arr, index, repalceIndex) {
    arr[repalceIndex] = arr.splice(index, 1, arr[repalceIndex])[0];
    return arr;
  },
  /**
  * 获取随机的唯一key值
  *@param { int } number 随机范围
  *@function { string } 返回字符串随机key值，基本唯一 
  */
  getUniqueKey(number = 100000000000){
    var uniqueKey = Math.floor(Math.random(number) * number) + "";
    return uniqueKey;
  },
  /**
  * 字符串"true" 和 "false" 转换为boolean 
  *@function { string }  str 值只为"true" or "false"
  *@return { any } 传入的是"true" or "false"返回boolean，其他的返回原来的数据
  */
  convertStringOfTrueAndFalseToBollean(str){
    if(str === "true"){
      return true;
    }else if(str === "false"){
      return false;
    }else {
      //console.warn("传入的字符串不是true或false");
      return str;
    }
  },
  dataType: [
    {
      "value": "object",
      "text": "object"
    },
    {
      "value": "table",
      "text": "table"
    },
    {
      "value": "dropdown",
      "text": "dropdown"
    },
    {
      "value": "string",
      "text": "string"
    },
    {
      "value": "number",
      "text": "number"
    },
    {
      "value": "integer",
      "text": "integer"
    },
    {
      "value": "float",
      "text": "float"
    },
    {
      "value": "boolean",
      "text": "boolean"
    },
    {
      "value": "date",
      "text": "date"
    },
    {
      "value": "url",
      "text": "url"
    },
    {
      "value": "email",
      "text": "email"
    },
  ],
}

