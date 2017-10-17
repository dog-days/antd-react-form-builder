import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import schema from 'async-validator';
import _ from 'lodash';
import serialize from 'form-serialize';
import Form from 'antd/lib/form';
import BuilderDecorator from '../../decorator/Builder';
import util from '../../util';
import FormBuilderWidthConfig from './FormBuilderWidthConfig';
/**
 * SimpleFormBuilder 
 * @prop {String} size size 设置表单子项（包括antd Input、Select等和FormItem）size，表单子项size优先级更高。
 * @prop {Boolean} hasFeedback 表单验证在antd的FormItem验证是否反馈，单个针对设置优先级更高。 
 * @prop {object} labelCol 跟antd的Form.Item prop.labelCol完全一致，这里是统一设置，单个针对设置优先级更高。 
 * @prop {object} wrapperCol 跟antd的Form.Item prop.wrapperCol完全一致，这里是统一设置，单个针对设置优先级更高。 
 * @prop {Object} config FormBuilder 配置项，表单就是从这些配置中渲染出来的 （可选） 
 * @prop {array} selectSourceData 下拉数据源 
 * @inherit props继承所有的Antd.Form的props 
 */
@BuilderDecorator
class FormBuilder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    //存放各个表单项设置value的方法
    this.setFieldValueFunc = {};
    //表单各个输入组件验证方法存储
    this.itemsValidateFunc = {};
    //表单错误信息存放
    this.errors = [];
    //是否验证全部表单（提交表单时用到）
    this.validateAll = false;
  }

  componentDidMount() {
    var formDom = ReactDOM.findDOMNode(this.refs.formBuilder);
    if (!this.context.formBuilder) {
      return;
    }
    this.context.formBuilder.setFieldsValue = values => {
      for (var k in values) {
        this.setFieldValueFunc[k] && this.setFieldValueFunc[k](values[k]);
      }
    };
    this.context.formBuilder.getFieldsValue = target => {
      if (!target) {
        return false;
      }
      let tempTarget;
      if (_.isString(target)) {
        tempTarget = target;
        target = [target];
      }
      const values = this.context.formBuilder.validateFields(
        function() {},
        target
      );
      if (tempTarget) {
        return values[tempTarget];
      } else {
        return values;
      }
    };
    this.context.formBuilder.validateFields = (callback, target) => {
      this.errors = [];
      //表单验证
      for (var k in this.itemsValidateFunc) {
        let hasError = false;
        //原来的name命名
        let originName = k.split('[')[0];
        if (_.isArray(target)) {
          if (~target.indexOf(originName)) {
            hasError = true;
          }
        } else {
          hasError = true;
        }
        hasError &&
          this.itemsValidateFunc[k]((errors, currentFormItem) => {
            this.errors.push(errors);
            //使用jsx style组件，特殊处理
            if (!this.props.config) {
              var message = '';
              errors.forEach((v, k) => {
                if (k !== 0) {
                  message += '，' + v.message;
                } else {
                  message += v.message;
                }
              });
              var obj = {
                errors_type: 'error',
                errors_message: message,
              };
              currentFormItem.setState(obj);
            }
          });
      }
      let values = serialize(formDom, { hash: true });
      let lastValues = {};
      if (target) {
        target.forEach(v => {
          lastValues[v] = values[v];
        });
      } else {
        lastValues = values;
      }
      if (this.errors[0]) {
        this.setState({
          random: util.getUniqueKey(),
          validateAll: true,
        });
        callback && callback(this.errors, {});
      } else {
        callback && callback(null, lastValues);
      }
      if (this.errors[0]) {
        return false;
      }
      return lastValues;
    };
  }

  render() {
    let {
      form,
      size,
      config,
      hasFeedback,
      labelCol,
      wrapperCol,
      className,
      selectSourceData,
      ...other
    } = this.props;
    other.className = className + ' builder-con';
    return (
      <Form {...other} ref="formBuilder">
        {config && (
          <FormBuilderWidthConfig
            config={config}
            random={this.state.random}
            validateAll={this.state.validateAll}
          />
        )}
        {this.props.children}
      </Form>
    );
  }
}

export default FormBuilder;
