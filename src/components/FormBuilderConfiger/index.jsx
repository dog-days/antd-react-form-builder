import React from 'react'
import _ from 'lodash'
import {
  Button as AntdButton,
  Icon,
  Table,
  Tooltip,
  Modal,
} from 'antd'
import util from "../../util"
import PureRender,{ shallowCompare } from "../../decorator/PureRender"
import AddAndUpdateForm from "./components/AddAndUpdateForm"
/**
 * FormBuilder config 配置器 
 *@prop { title } 第一级table的title
 *@prop { config } 配置数据，只要config改变了都会以新的config重新渲染（父组件传进来） 
 *@prop { onChange } 配置数据变化时触发的回调函数（这里的配置数据与父组件传进来的是相互独立的） 
 */
class FormBuilderConfiger extends React.Component {

  constructor(props){
    super(props);
    this.state = {};
    this.config = _.cloneDeep(this.props.config);
  }

  static formBuilderConfigAdapter(data){
    var re = [];
    data && data[0] && data.forEach((v,k)=>{
      if((v.data_type === "array" || v.data_type === "object") && v.children && v.children){
        if(v.data_type === "array"){
          v.children = [v.children];
          v.children.forEach((v2,k2)=>{
            FormBuilderConfiger.formBuilderConfigAdapter(v2);
          })
        }
        if(v.data_type !== "array"){
          FormBuilderConfiger.formBuilderConfigAdapter(v.children);
        }
      }
      re.push(v);
    })
    return re;
  }

  componentWillReceiveProps(nextProps){
    //console.debug("wiill",nextProps);
    this.temp_config = _.cloneDeep(nextProps.config);
    //是否是父级组件更新
    this.outerUpdate = true;
  }

  shouldComponentUpdate(nextProps, nextState) {
    var flag = shallowCompare(this, nextProps, nextState);
    if(flag && this.outerUpdate){
      this.config = this.temp_config;
    }
    //console.debug(flag)
    return flag;
  }

  componentDidUpdate(){
    let {
      onChange,
    } = this.props;
    if(this.random !== this.state.random){
      onChange && onChange(this.config);
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
    var columns = [
      {
        title: "字段名",
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: "说明",
        dataIndex: 'label',
        key: 'label',
      },
      {
        title: "数据类型",
        dataIndex: 'data_type',
        key: 'data_type',
      },
      {
        title: "是否必填",
        dataIndex: 'required',
        key: 'required',
        render: (value)=>{
          var text = "可空";
          if(value == "0"){
            text = "可空";
          }else if(value == "1") {
            text = "必填";
          }
          return text;
        }
      },
    ]; 
    columns.push({
      title: '操作',
      key: 'operation',
      //width: 55,
      render: (data,record,id) => {
        return (
          <div>
            {
              id !== 0 &&
              <a href="javascript:void(0)" className="mr10">
                <Icon 
                  type="arrow-up" 
                  onClick={
                    this.dataUpEvent(currentData,id)
                  }
                />
              </a>
            }
            {
              id !== currentData.length - 1 &&
              <a href="javascript:void(0)" className="mr10">
                <Icon 
                  type="arrow-down"
                  onClick={
                    this.dataDownEvent(currentData,id)
                  }
                />
              </a>
            }
            {
              currentData[id].read_only != "1" &&
              <a href="javascript:void(0)" className="mr10">
                <Icon 
                  type="edit" 
                  onClick={
                    this.openAddFieldDialogEvent(currentData,id)
                  }
                />
              </a>
            }
            {
              currentData[id].can_not_delete != "1" &&
              <a href="javascript:void(0)" >
                <Icon 
                  type="delete"
                  onClick={ 
                    this.dataDeleteEvent(currentData,id) 
                  }
                />
              </a>
            }
          </div>
        ); 
      },
    })
    return columns;
  }

  getTitle(title,currentData){
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
    return (
      <Table 
        bordered
        pagination={ false }
        size="middle"
        title={ this.getTitle(title,currentData) }
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
      var description = null;
      if(_.isArray(v.children) && (v.data_type === "object" || v.data_type === "array")){
        var dataSource = this.dataSourceAdapter(v.children);
        description = this.getTableComponent(
          <span>&nbsp;</span>,
          //v.name + "：" + v.label,
          this.getTableColumns(v.children),
          dataSource,
          v.children,
        );
      }
        //console.debug(description)
      re_data.push({
        key: v.key,
        name: v.name,
        label: v.label,
        data_type: v.data_type,
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
    } = this.props;
    //console.debug("render",config);
    var dataSource = this.dataSourceAdapter(this.config);
    return (
      <div className="configer">
        { 
          this.getTableComponent(
            title || "字段管理",
            this.getTableColumns(this.config),
            dataSource,
            this.config,
          ) 
        }
        <Modal 
          title={this.state.index !== undefined ? "修改":"添加"} 
          visible={this.state.addField} 
          onCancel={this.setAddFieldDialogState(false)}
          footer={ false }
        >
          {
            this.state.addField &&
            <AddAndUpdateForm
              currentData={ this.state.currentData }
              index={ this.state.index }
              setChangeState={ this.setChangeState }
              setAddFieldDialogState={ this.setAddFieldDialogState }
            />
          }
        </Modal>
      </div>
    )
  }
}

export default FormBuilderConfiger;


