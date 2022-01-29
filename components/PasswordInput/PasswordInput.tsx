import { IconButton, TextField, TextFieldProps } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  ForwardedRef, forwardRef, useState,
} from 'react';
import styles from './PasswordInput.module.css';

const PasswordInput = (props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => { setVisible(true); };
  const handleInvisible = () => { setVisible(false); };

  const visibilityButton = (
    <IconButton
      onMouseDown={handleVisible}
      onMouseUp={handleInvisible}
    >
      <VisibilityIcon className={styles.visibilityIcon} />
    </IconButton>
  );

  return (
    <TextField
      {...props}
      ref={ref}
      type={visible ? 'test' : 'password'}
      InputProps={{ endAdornment: visibilityButton }}
    />
  );
};

export default forwardRef(PasswordInput);
