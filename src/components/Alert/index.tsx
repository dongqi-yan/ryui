import React, { FC, useState } from 'react';
import classNames from 'classnames';
import { CloseOutlined } from '@ant-design/icons';
import Transition from '../Transition';


export interface AlertProps {
  type?: 'success' | 'info' | 'warning' | 'error';
  // type?: AlertType;
  closable?: boolean;
  closeText?: React.ReactNode;
  message: React.ReactNode;
  description?: React.ReactNode;
  onClose?: React.MouseEventHandler<HTMLDivElement>;
  afterClose?: () => void;
  showIcon?: boolean;
  role?: string;
  style?: React.CSSProperties;
  className?: string;
  banner?: boolean;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const duration = 300;

const Alert: FC<AlertProps> = ({
  type = 'info',
  description,
  message,
  className,
  style,
  showIcon,
  closable,
  ...props
}) => {
  const [closed, setClosed] = useState<boolean>(false);
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    setClosed(true);
    props.onClose?.(e)
  }
  const classes = classNames('ry-alert', {
    [`ry-alert-${type}`]: type,
    'ry-alert-closable': closable,
    'ry-alert-icon': showIcon,
    className
  })
  return (
    <div>
    <Transition
      in={!closed}
      timeout={500}
      animation='zoom-in-top'
    >
      <div
        style={{
          position: 'relative',
          padding: '8px 15px',
        }}
        className={classes}
      >
        <div>
          {!!message && <div>{message}</div>}
          {!!description && <div>{description}</div>}
        </div>
        <div className='ry-alert-close' onClick={handleClose}>
          {closable && <CloseOutlined style={{fontSize: 12}} />}
        </div>
      </div>
    </Transition>
    <button onClick={() => setClosed(!closed)}>dddd</button>
    </div>
  );
}

export default Alert;