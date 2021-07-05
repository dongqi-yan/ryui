import React from 'react';

interface PropsType {
  label?: string;

}

class FormItem extends React.Component<PropsType> {
  constructor(props: PropsType) {
    super(props);
  }
  
  render() {
    const { label, children } = this.props;
    return (
      <div>
        {label && <label>{label}</label>}
        {children}
      </div>
    );
  }
}

export default FormItem;