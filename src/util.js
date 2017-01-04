module.exports = {
  /**
   * 交换数组指定的的两个键值位置,index2 > index1 下移，相反上移
   * @param {Array} arr 需要处理的数组
   * @param {index1} index1 索引位置1
   * @param {index2} index2 索引位置2
   * @return {Array} 返回处理的数组
   */
  swapArrayItem(arr, index1, index2) {
    arr[index1] = arr.splice(index2, 1, arr[index1])[0];
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
  dataType: [
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
      "value": "array",
      "text": "array"
    },
    {
      "value": "object",
      "text": "object"
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

