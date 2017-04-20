import React, { PropTypes } from 'react'
import _ from 'lodash'
import Modal from 'antd/lib/modal'
import Table from 'antd/lib/table'
import Icon from 'antd/lib/icon'
import util from "../../util"
import PureRender,{ shallowCompare } from "../../decorator/PureRender"
import localeDecorator from "../../decorator/Locale"
import AddAndUpdateForm from "./components/AddAndUpdateForm"
import localeText from './zh_CN'
/**
 * FormBuilder config 配置器 
 *@prop { string } title 第一级table的title
 *@prop { object } config 配置数据，只要config改变了都会以新的config重新渲染（父组件传进来） 
 *@prop { function } onChange 配置数据变化时触发的回调函数（这里的配置数据与父组件传进来的是相互独立的） 
 *   function(data01,data02)，data01是formBuilderConfiger的配置数据，data02是formBuilder的配置数据
 *@prop { boolean } hasNoneTableTitle table title是否显示,默认true 
 *@prop { array } selectSourceDataMap 拉选择数据源 
 *@prop { object } fieldAddedOperation 添加字段的按钮或图标（react组件） 
 *@prop { boolean } canNotDeleteFunction 开启不可删除选项 
 *@prop { boolean } readOnlyFunction 开启只读选项 
 */
@localeDecorator
class FormBuilderConfiger extends React.Component {

  static contextTypes = {
    formBuilderConfiger: React.PropTypes.object,
    antLocale: React.PropTypes.object,
  }

  static create(){
    class Decorator extends React.Component {

      constructor(props){
        super(props);
        this.formBuilderConfiger = {};
      }

      static childContextTypes = {
        formBuilderConfiger: PropTypes.object.isRequired,
      }

      getChildContext() {
        return {
          formBuilderConfiger: this.formBuilderConfiger,
        };
      }

      render(){
        this.formBuilderConfiger.openAddFieldDialogEvent = (e)=>{
          this.formBuilderConfiger.openAddFieldDialog(e);
        }
        var WrapperComponent = this.getWrapperComponent(); 
        return (
          <WrapperComponent 
            { ...this.props }
            formBuilderConfiger={ this.formBuilderConfiger }
          />
        )
      }
    }
    return (WrappedComponent)=>{
      function getDisplayName(WrappedComponent) {
        return WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
      }
      Decorator.displayName = `FormBuilderConfiger(${getDisplayName(WrappedComponent)})`;
      Decorator.prototype.getWrapperComponent = ()=>WrappedComponent; 
      return Decorator;
    }
  }
  /**
  * formBuilderConfiger配置转换成FormBuilder的config配置
  * 他们的区别在于type为array类型的时候，formBuilder的children需要再包一层数组
  * children: [] => children: [[]]
  * @param { array } data formBuilderConfiger的配置
  */
  static formBuilderConfigAdapter(data){
    var re = [];
    data && data[0] && data.forEach((v,k)=>{
      //兼容处理
      if(v.data_type && !v.type){
        v.type = v.data_type;
      }
      //console.debug(v)
      if(v.type === "array"){
        v.type = "table";
      }
      if((v.type === "table" || v.type === "object") && v.children && v.children){
        if(v.type === "table"){
          v.children = [v.children];
          v.children.forEach((v2,k2)=>{
            FormBuilderConfiger.formBuilderConfigAdapter(v2);
          })
        }
        if(v.type !== "table"){
          FormBuilderConfiger.formBuilderConfigAdapter(v.children);
        }
      }
      re.push(v);
    })
    return re;
  }

  /**
  * @this { boolean } outerUpdate 是否父组件更新
  * @this { array } config 配置数据this.props.config 
  */
  constructor(props){
    super(props);
    this.state = {};
    //this.config克隆后，跟props.config不同步，props.config还是原始的数据源
    this.config = _.cloneDeep(this.props.config);
  }

  componentWillReceiveProps(nextProps){
    //是否是父级组件更新，state的变化是内部更新
    this.outerUpdate = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    var flag = shallowCompare(this, nextProps, nextState);
    //一般都是外部props.config改变后触发的。
    //console.debug(flag,this.outerUpdate)
    if(flag && this.outerUpdate){
      this.config = _.cloneDeep(nextProps.config);
    }
    //console.debug(flag)
    return flag;
  }

  componentDidUpdate(){
    let {
      onChange,
    } = this.props;
    if(this.random !== this.state.random){
      onChange && 
      onChange(
        this.config,
        FormBuilderConfiger.formBuilderConfigAdapter(_.cloneDeep(this.config))
      );
    }
    this.random = this.state.random;
  }

  setAddFieldDialogState = (visible)=>{
    return ()=>{
      this.outerUpdate = false;
      this.setState({
        addField: visible, 
      });
    }
  }

  setChangeState = ()=>{
    var random = util.getUniqueKey();
    this.outerUpdate = false;
    this.setState({
      random,
    })
  }
 
  getTableColumns(currentData){
    let {
      hasNoneTableTitle = true,
    } = this.props;
    var locale = this.getLocale(localeText,"FormBuilderConfiger");
    var columns = [
      {
        title: locale.fieldName,
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: locale.labelName,
        dataIndex: 'label',
        key: 'label',
      },
      {
        title: locale.dataType,
        dataIndex: 'type',
        key: 'type',
        render: (text,row,id)=>{
          if(!text){
            text = row.type;
          }
          return text;
        }
      },
      {
        title: locale.required,
        dataIndex: 'required',
        key: 'required',
        render: (value)=>{
          var text = locale.requiredField;
          value = util.convertStringOfTrueAndFalseToBollean(value);
          if(value){
            text = locale.requiredField;
          }else {
            text = locale.couldEmpty;
          }
          return text;
        }
      },
    ]; 
    columns.push({
      title: locale.operation,
      key: 'operation',
      //width: 55,
      render: (data,record,id) => {
        var read_only = util.convertStringOfTrueAndFalseToBollean(currentData[id].read_only);
        //兼容处理
        if(read_only == "0"){
          read_only = false;
        }else if(read_only == "1") {
          read_only = true;
        }
        var can_not_delete = util.convertStringOfTrueAndFalseToBollean(currentData[id].can_not_delete); return (
          <div>
            {
              !read_only &&
              <a 
                href="javascript:void(0)" 
                className="mr10"
                onClick={
                  this.openAddFieldDialogEvent(currentData,id)
                }
              >
                <Icon 
                  type="edit" 
                />
              </a>
            }
            {
              !can_not_delete &&
              <a 
                href="javascript:void(0)" 
                className="mr10"
                onClick={ 
                  this.dataDeleteEvent(currentData,id) 
                }
              >
                <Icon 
                  type="delete"
                />
              </a>
            }
            {
              id !== 0 &&
              <a 
                href="javascript:void(0)" 
                className="mr10"
                onClick={
                  this.dataUpEvent(currentData,id)
                }
              >
                <Icon 
                  type="arrow-up" 
                />
              </a>
            }
            {
              id !== currentData.length - 1 &&
              <a 
                href="javascript:void(0)" 
                className="mr10"
                onClick={
                  this.dataDownEvent(currentData,id)
                }
              >
                <Icon 
                  type="arrow-down"
                />
              </a>
            }
            {
              hasNoneTableTitle && 
              currentData[id].children && 
              <a 
                href="javascript:void(0)" 
                className="mr10"
                onClick={
                  this.openAddFieldDialogEvent(currentData[id].children)
                }
              >
                {
                  this.props.fieldAddedOperation &&
                  this.props.fieldAddedOperation
                }
                {
                  !this.props.fieldAddedOperation &&
                  <Icon 
                    type="plus"
                  />
                }
              </a>
            }
          </div>
        ); 
      },
    })
    return columns;
  }

  /**
  * 获取Table title
  * @param { string } title 标题 
  * @param { object } currentData 当前列数据   
  * @param { boolean } first 是否是最外层table的标题 
  */
  getTitle(title,currentData,first){
    return ()=>{
      return (
        <div>
          <span>
            { title }
          </span> 
          <Icon 
            type="plus-circle" 
            className="configer-add"
            onClick={
              this.openAddFieldDialogEvent(currentData)
            }
          />
        </div>
      );
    }
  }
  /**
  * 获取Table组件 (已配置)
  * @param { string } title antd table标题设置
  * @param { array } columns antd table columns
  * @param { array } dataSource antd table dataSource 
  * @param { array } dataSource antd table dataSource 
  * @param { array } currentData 当前表格源数据 
  */
  getTableComponent(title,columns,dataSource,currentData){
    var obj = { }; 
    let {
      hasNoneTableTitle = true,
    } = this.props;
    if(!hasNoneTableTitle){
      obj.title = this.getTitle(title,currentData); 
    }
    return (
      <Table 
        { ...obj }
        bordered
        pagination={ false }
        size="middle"
        columns={ columns }
        defaultExpandAllRows={ true }
        expandedRowRender={
          record => {
            if(!record.description){
              return false;
            }
            return (
              <div>
                {record.description}
              </div>
            )
          }
        }
        dataSource={ dataSource }
      />
    )
  }

  dataSourceAdapter(data){
    var re_data = [];
    data.forEach((v,k)=>{
      //兼容处理
      if(v.data_type && !v.type){
        v.type = v.data_type;
      }
      if(v.type === "array"){
        v.type = "table";
      }
      var description = null;
      if(_.isArray(v.children) && (v.type === "object" || v.type === "table")){
        var dataSource = this.dataSourceAdapter(v.children);
        description = this.getTableComponent(
          //<span>&nbsp;</span>,
          v.name + "：" + v.label,
          this.getTableColumns(v.children),
          util.antdTableFieldBind(dataSource),
          v.children,
        );
      }
        //console.debug(description)
      re_data.push({
        key: v.key,
        name: v.name,
        label: v.label,
        type: v.type,
        required: v.required,
        description,
      }); 
    })
    return re_data;
  }

  addEvent = (currentData,index)=>{
  }
  //下上切换，上移
  dataUpEvent = (currentData,index)=>{
    return (e)=>{
      util.swapArrayItem(currentData,index,index - 1);
      this.setChangeState();
    }
  }
  //上下切换，下移
  dataDownEvent = (currentData,index)=>{
    return (e)=>{
      util.swapArrayItem(currentData,index,index + 1);
      this.setChangeState();
    }
  }

  //删除
  dataDeleteEvent = (currentData,index)=>{
    return (e)=>{
      currentData.splice(index, 1);
      this.setChangeState();
    }
  }


  openAddFieldDialogEvent = (currentData,index)=>{
    return (e)=>{
      //console.debug(currentData)
      this.setAddFieldDialogState(true)();
      this.setState({
        currentData,
        index,
      })
    }
  }

  render() {
    let {
      config,
      onChange,
      title,
      selectSourceDataMap,
      readOnlyFunction,
      canNotDeleteFunction,
    } = this.props;
    var locale = this.getLocale(localeText,"FormBuilderConfiger");
    //console.debug("render",config);
    var dataSource = this.dataSourceAdapter(this.config);
    //对外提供最外层添加窗口
    if(this.context.formBuilderConfiger){
      this.context.formBuilderConfiger.openAddFieldDialog = this.openAddFieldDialogEvent(this.config);
    }
    return (
      <div className="configer">
        { 
          this.getTableComponent(
            title || "字段管理",
            this.getTableColumns(this.config),
            util.antdTableFieldBind(dataSource),
            this.config,
          ) 
        }
        {
          this.state.addField &&
          <Modal 
            title={ 
              this.state.index !== undefined 
              ?  locale.edit : locale.add
            } 
            visible={ this.state.addField } 
            onCancel={ this.setAddFieldDialogState(false) }
            footer={ false }
          >
            <AddAndUpdateForm
              currentData={ this.state.currentData }
              index={ this.state.index }
              setChangeState={ this.setChangeState }
              setAddFieldDialogState={ this.setAddFieldDialogState.bind(this) }
              selectSourceDataMap={ selectSourceDataMap }
              canNotDeleteFunction={ canNotDeleteFunction }
              readOnlyFunction={ readOnlyFunction }
            />
          </Modal>
        }
      </div>
    )
  }
}

export default FormBuilderConfiger;


