import { Paper } from '@mui/material';
import type { NextPage } from 'next';
import Head from 'next/head';
import RegistrationForm from 'components/RegistrationForm';
import styles from './index.module.css';

const Home: NextPage = () => (
  <>
    <Head>
      <title>Registration</title>
    </Head>
    <div className={styles.root}>
      <Paper elevation={10} className={styles.registrationFormPaper}>
        <RegistrationForm />
      </Paper>
    </div>
  </>
);

export default Home;
