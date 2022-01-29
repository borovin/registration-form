import ThemeProvider from 'components/ThemeProvider';
import type { AppProps } from 'next/app';
import 'styles.css';

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
