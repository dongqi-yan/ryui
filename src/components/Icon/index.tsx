import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'light' | 'danger' | 'dark';
export interface IconProps extends FontAwesomeIconProps {
  theme? : ThemeProps
}
const Icon: React.FC<IconProps> = (props: IconProps) => {
  const { className, theme, ...restProps } = props;
  const classes = classNames('ry-icon', className, {
    [`ry-icon-${theme}`]: theme,
    [`${theme}`]: theme
  })
  return (
    <FontAwesomeIcon className={classes} {...restProps} />
  );
};

export default Icon;