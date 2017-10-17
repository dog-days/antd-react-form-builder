import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import BasicItem from '../BasicItem';
import Input from 'antd/lib/input';
import FormItemComponentDecorator from '../../decorator/FormItemComponent';
import localeDecorator from '../../decorator/Locale';
import localeText from './zh_CN';

function component(BasicItemComponent) {
  @FormItemComponentDecorator
  @localeDecorator
  class Password extends React.Component {
    static propTypes = {
      min: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]),
      max: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number,
      ]),
      rePassword: React.PropTypes.bool,
      onlyLetterAndNumber: React.PropTypes.bool,
    };

    render() {
      let {
        locale,
        key,
        rePassword,
        onlyLetterAndNumber = true,
        ...other
      } = this.props;
      //console.debug(this.context)
      locale = this.getLocale(localeText, 'FormBuilderPassword');

      other.targetComponent = Input;
      other.type = 'password';
      this.propsAdapter(other);
      if (onlyLetterAndNumber) {
        other.rules.push({
          validator(rule, value, callback, source, options) {
            var errors = [];
            var pass = new RegExp(
              '^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$'
            ).test(value);
            if (!pass && value != '') {
              errors.push({
                message: locale.formatErrorMsg,
              });
            }
            callback(errors);
          },
        });
      }
      if (rePassword) {
        var reProps = {};
        reProps.type = other.type;
        reProps.required = other.required;
        reProps.targetComponent = other.targetComponent;
        reProps.rules = [];
        reProps.min = undefined;
        reProps.max = undefined;
        reProps.value = undefined;
        reProps.storage = { value: undefined };
        reProps.formItemProps = _.cloneDeep(other.formItemProps);
        reProps.formItemProps.label = locale.reLabel;
        reProps.name = 're-' + reProps.name;
        reProps.rules.push({
          validator(rule, value, callback, source, options) {
            var errors = [];
            var passwordDom = document.getElementsByName(other.name);
            var password_value = passwordDom[0] && passwordDom[0].value;
            if (password_value !== value) {
              errors.push({
                message: locale.checkErrorMsg,
              });
            }
            callback(errors);
          },
        });
      }
      return (
        <span key={key} className="password-con">
          <BasicItemComponent {...other} />
          {rePassword && <BasicItemComponent {...reProps} />}
        </span>
      );
    }
  }
  return Password;
}

export default component(BasicItem);
