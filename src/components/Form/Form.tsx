import React from 'react';
import FormItem from './FormItem';
import create, { fieldOptions } from './create';

interface PropsType {
  onSubmit?: (e: React.FormEvent) => void
}

export interface createFormType {
  getFieldsValue: () => Record<string, any>,
  getFieldDecorator: (name: string, options?: fieldOptions) => (field: React.ReactElement) => React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

class Form extends React.Component<PropsType> {
  static Item = FormItem;
  static create = create;
  constructor(props: PropsType) {
    super(props);
  }

  render() {
    return (
      <form {...this.props}>
      </form>
    );
  }
}

export default Form;