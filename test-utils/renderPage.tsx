import { ReactElement } from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from 'pages/_app';
import { Router } from 'next/dist/client/router';

const defaultRouter = ({} as Router);

const renderPage = (component: ReactElement, router = defaultRouter): RenderResult => render(
  <App
    Component={() => component}
    pageProps={{}}
    router={router}
  />,
);

export default renderPage;
