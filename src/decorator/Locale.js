
/**
 * 获取locale对象
 * @param { object } localeText 中文的locale
 * @param { string } currentIndex 当前组件的翻译索引 
 */
function getLocale(localeText,currentIndex){
  let {
    locale,
  } = this.props;
  if(!locale && this.context.antLocale){
    locale = this.context.antLocale[currentIndex];
  }else if(!locale) {
    locale = localeText[currentIndex];
  }
  //当前组件翻译了部分的兼容处理
  for(var k in localeText[currentIndex]){
    if(!locale[k]){
      locale[k] = localeText[currentIndex][k]; 
    }
  }
  return locale;
}

function localeDecorator(component){
  component.prototype.getLocale = getLocale;
  return component;
}
export default localeDecorator;
