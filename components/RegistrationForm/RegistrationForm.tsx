import {
  Checkbox, TextField, Typography, Link, Button, Alert, Snackbar, LinearProgress,
} from '@mui/material';
import Form from 'components/Form';
import { ReactElement, useState } from 'react';
import PasswordInput from 'components/PasswordInput';
import {
  useForm, Controller, SubmitHandler, FieldPath,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import registrationFormSchema from 'utils/registrationFormSchema';
import { ValidationError } from 'yup';
import styles from './RegistrationForm.module.css';

export type RegistrationFormType = () => ReactElement;

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phone: '',
  agreed: false,
};

export type FiledValues = typeof defaultValues;

const RegistrationForm: RegistrationFormType = () => {
  const {
    control, handleSubmit, formState: { errors, isSubmitting }, setError,
  } = useForm<FiledValues>({
    defaultValues,
    resolver: yupResolver(registrationFormSchema),
  });
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false);
  const [openErrorMessage, setOpenErrorMessage] = useState(false);

  const onSubmit: SubmitHandler<FiledValues> = async (data) => {
    setOpenErrorMessage(false);

    try {
      const res = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const { status } = res;
      const json = await res.json();

      if (status >= 500) {
        setOpenErrorMessage(true);
      } else if (status >= 400) {
        (json as ValidationError[]).forEach((error) => {
          setError((error.path as FieldPath<FiledValues>), {
            type: 'serverError',
            message: error.message,
          });
        });
      } else {
        setOpenSuccessMessage(true);
      }
    } catch (error) {
      setOpenErrorMessage(true);
    }
  };

  const handleCloseSuccessMessage = () => {
    setOpenSuccessMessage(false);
  };

  const handleCloseErrorMessage = () => {
    setOpenErrorMessage(false);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="subtitle1">Become a farmland investor</Typography>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="First Name"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last Name"
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            label="Email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <PasswordInput
            {...field}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            label="Password"
          />
        )}
      />
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Phone"
            type="phone"
            placeholder="+1(XXX)XXX-XXXX"
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
          />
        )}
      />
      <div className={styles.agreements}>
        <Controller
          name="agreed"
          control={control}
          render={({ field }) => (
            <Checkbox
              {...field}
              className={styles.agreementsCheckbox}
            />
          )}
        />
        <Typography>
          I agree to the
          {' '}
          <Link href="#terms_of_service">terms of service</Link>
          ,
          {' '}
          <Link href="privacy_policy">privacy policy</Link>
          ,
          {' '}
          <Link href="electronic_communications_disclosure">electronic communications disclosure</Link>
          , and
          {' '}
          <Link href="electronic_funds_transfer_disclosure">electronic funds transfer disclosure</Link>
        </Typography>
      </div>
      {Boolean(errors.agreed) && (
      <Alert severity="error">{errors.agreed?.message}</Alert>
      )}
      <Button disabled={isSubmitting} className={styles.registrationButton} color="primary" variant="contained" type="submit">
        Continue
        {isSubmitting && <LinearProgress className={styles.progress} />}
      </Button>
      <Snackbar
        open={openSuccessMessage}
        autoHideDuration={6000}
        onClose={handleCloseSuccessMessage}
        message="You have been successfully registered"
      />
      <Snackbar open={openErrorMessage}>
        <Alert severity="error" onClose={handleCloseErrorMessage}>Unexpected error. Please try again later.</Alert>
      </Snackbar>
    </Form>
  );
};

export default RegistrationForm;
