import clsx from 'clsx';
import { ReactElement, HTMLProps, ReactNode } from 'react';
import styles from './Form.module.css';

export type FormPropsType = {
  children: ReactNode
} & HTMLProps<HTMLFormElement>;

export type FormType = (props: FormPropsType) => ReactElement;

const Form: FormType = ({ className, children, ...props }) => (
  <form {...props} className={clsx(styles.root, className)}>{children}</form>
);

export default Form;
