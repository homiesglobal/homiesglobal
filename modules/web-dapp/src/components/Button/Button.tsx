import React from "react";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";
import classnames from "classnames";
import styles from "./Button.module.css";

export const Button: React.FC<AntButtonProps> = ({
  children,
  className,
  ...props
}) => {
  const classNames = classnames(styles.defaultButton, className);
  return (
    <AntButton className={classNames} {...props}>
      {children}
    </AntButton>
  );
};
