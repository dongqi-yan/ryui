import React from 'react';
import { createFormType } from './Form';

interface PropsType {
}
interface ErrorItemType {
  field: string,
  message: string
}
interface ErrorType {
  [key: string]: {
    errors: ErrorItemType[]
  }
}

interface StateType {
  values: Record<string, any>,
  errors: ErrorType
}

type CB = (error: ErrorType | null, values: Record<string, any>) => void;

export interface fieldOptions extends Record<string, any> {
  rules?: Record<string, any>
}

const Create = () => (WrappedComponent: any) => {
  class ProxyComponent extends React.Component<PropsType, StateType> {
    state: StateType = {
      values: {},
      errors: {}
    }
    rules: Record<string, any> = {};

    getFieldsValue = (): Record<string, any> => {
      return this.state.values;
    }

    // 校验函数
    validateFields = (fields: string[] | CB, callback?: CB) => {
      if (typeof fields === 'function') {
        callback = fields;
        fields = Object.keys(this.rules);
      }
      let { errors } = this.state;
      fields.forEach((field: string) => {
        let fieldRules = this.rules[field];
        if (fieldRules && fieldRules.length) {
          const { values } = this.state;
          const value = values[field];
          const fieldErrors = fieldRules.map((rule: Record<string, any>) => {
            const { required, min, max } = rule;
            if ((required && !value) || (min && value?.length < min) || (max && value?.length > max)) {
              return { message: rule.message }
            }
          }).filter((item: any) => item);
          if (fieldErrors.length) {
            errors[field] = { errors: fieldErrors }
          } else {
            delete errors[field];
          }
        }
      });
      const error = Object.keys(errors).length ? errors : null;
      this.setState({ errors }, () => {
        callback && callback(error, this.state.values);
      })
      return Object.keys(errors).length ? errors : null;
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
      const value = event.target.value;
      this.setState({
        values: { ...this.state.values, [name]: value }
      }, () => {
        this.validateFields([name]);
      })
    }

    getFieldDecorator = (name: string, options?: fieldOptions) => {
      const values: Record<string, any> = this.state.values;
      if (options?.rules) {
        this.rules[name] = options.rules;
      }
      return (field: React.ReactElement) => {
        const inputElement = React.cloneElement(field, {
          value: values[name] || '',
          onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
            return this.handleChange(event, name);
          }
        });
        const fieldErrors = this.state.errors[name];
        let messages: React.ReactElement[] = [];
        if (fieldErrors && fieldErrors.errors) {
          messages = fieldErrors.errors.map((item, index) => {
            return (
              <p key={item.field + index + item.message} style={{color: 'red'}}>{item.message}</p>
            )
          })
        }
        return (
          <div>
            {inputElement}
            {!!messages.length && messages}
          </div>
        );
      }
    }

    render() {
      const form: createFormType = {
        getFieldsValue: this.getFieldsValue,
        getFieldDecorator: this.getFieldDecorator
      }
      return <WrappedComponent form={form}/>
    }
  }
  return ProxyComponent;
};

export default Create;