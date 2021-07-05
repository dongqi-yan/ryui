import React from 'react';
import Form, { createFormType } from './components/Form';
import Button, { ButtonType } from './components/Button';

interface PropsType {
  form: createFormType
}

class UserForm extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }
  
  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { getFieldsValue } = this.props.form
    console.log('submit: ', getFieldsValue());
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item label='账号'>
          {
            getFieldDecorator('name', {
              rules: [
                {required: true, message: '用户名必填'},
                {min: 2, message: '用户名至少2位'},
                {max: 8, message: '用户名至多8位'},
              ]
            })(<input />)
          }
          
        </Form.Item>
        <Form.Item label='密码'>
          {
            getFieldDecorator('password')(<input />)
          }
        </Form.Item>
        <Button btnType={ButtonType.Primary}>提交</Button>
      </Form>
    );
  }
}
const myForm = Form.create()(UserForm);
export default myForm;