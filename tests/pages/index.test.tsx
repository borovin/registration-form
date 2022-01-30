import {
  renderPage, screen, rest, server,
} from 'test-utils';
import IndexPage from 'pages/index';
import userEvent from '@testing-library/user-event';

it('should render title', async () => {
  renderPage(<IndexPage />);

  const title = await screen.findByText('Become a farmland investor');
  expect(title).toBeVisible();
});

it('should render inputs', async () => {
  const { container } = renderPage(<IndexPage />);

  const firstNameInput = await screen.findByLabelText('First Name');
  const lastNameInput = await screen.findByLabelText('Last Name');
  const emailInput = await screen.findByLabelText('Email');
  const passwordInput = await screen.findByLabelText('Password');
  const phoneInput = await screen.findByLabelText('Phone');
  const agreementsInput = await container.querySelector('[name="agreed"]');

  expect(firstNameInput).toBeEnabled();
  expect(lastNameInput).toBeEnabled();
  expect(emailInput).toBeEnabled();
  expect(passwordInput).toBeEnabled();
  expect(phoneInput).toBeEnabled();
  expect(agreementsInput).toBeEnabled();
});

it('should render client errors', async () => {
  renderPage(<IndexPage />);

  const submitButton = await screen.findByText('Continue');

  userEvent.click(submitButton);

  const firstNameInputError = await screen.findByText('first name is required');
  const lastNameInputError = await screen.findByText('last name is required');
  const emailInputError = await screen.findByText('email is required');
  const passwordInputError = await screen.findByText('password is required');
  const phoneInputError = await screen.findByText('phone is required');
  const agreedInputError = await screen.findByText('please accept all agreements');

  expect(firstNameInputError).toBeVisible();
  expect(lastNameInputError).toBeVisible();
  expect(emailInputError).toBeVisible();
  expect(passwordInputError).toBeVisible();
  expect(phoneInputError).toBeVisible();
  expect(agreedInputError).toBeVisible();
});

it('should render server validation errors', async () => {
  const usersApiMock = rest.post('http://localhost/api/users', (req, res, ctx) => res(
    ctx.status(400),
    ctx.json([{
      path: 'firstName',
      message: 'test firstName error',
    }, {
      path: 'lastName',
      message: 'test lastName error',
    }, {
      path: 'email',
      message: 'test email error',
    }, {
      path: 'password',
      message: 'test password error',
    }, {
      path: 'phone',
      message: 'test phone error',
    }]),
  ));

  server.use(usersApiMock);

  const { container } = renderPage(<IndexPage />);

  const submitButton = await screen.findByText('Continue');
  const firstNameInput = await screen.findByLabelText('First Name');
  const lastNameInput = await screen.findByLabelText('Last Name');
  const emailInput = await screen.findByLabelText('Email');
  const passwordInput = await screen.findByLabelText('Password');
  const phoneInput = await screen.findByLabelText('Phone');
  const agreementsInput = await container.querySelector('[name="agreed"]');

  userEvent.type(firstNameInput, 'test_firstNameInput');
  userEvent.type(lastNameInput, 'test_lastNameInput');
  userEvent.type(emailInput, 'test@email.com');
  userEvent.type(passwordInput, 'test_passwordInput');
  userEvent.type(phoneInput, '+1(111)111-1111');
  if (agreementsInput) {
    userEvent.click(agreementsInput);
  }
  userEvent.click(submitButton);

  const firstNameInputError = await screen.findByText('test firstName error');
  const lastNameInputError = await screen.findByText('test lastName error');
  const emailInputError = await screen.findByText('test email error');
  const passwordInputError = await screen.findByText('test password error');
  const phoneInputError = await screen.findByText('test phone error');

  expect(firstNameInputError).toBeVisible();
  expect(lastNameInputError).toBeVisible();
  expect(emailInputError).toBeVisible();
  expect(passwordInputError).toBeVisible();
  expect(phoneInputError).toBeVisible();
});

it('should render success message', async () => {
  const usersApiMock = rest.post('http://localhost/api/users', (req, res, ctx) => res(
    ctx.status(201),
    ctx.json({}),
  ));

  server.use(usersApiMock);

  const { container } = renderPage(<IndexPage />);

  const submitButton = await screen.findByText('Continue');
  const firstNameInput = await screen.findByLabelText('First Name');
  const lastNameInput = await screen.findByLabelText('Last Name');
  const emailInput = await screen.findByLabelText('Email');
  const passwordInput = await screen.findByLabelText('Password');
  const phoneInput = await screen.findByLabelText('Phone');
  const agreementsInput = await container.querySelector('[name="agreed"]');

  userEvent.type(firstNameInput, 'test_firstNameInput');
  userEvent.type(lastNameInput, 'test_lastNameInput');
  userEvent.type(emailInput, 'test@email.com');
  userEvent.type(passwordInput, 'test_passwordInput');
  userEvent.type(phoneInput, '+1(111)111-1111');
  if (agreementsInput) {
    userEvent.click(agreementsInput);
  }
  userEvent.click(submitButton);

  const successMessage = await screen.findByText('You have been successfully registered');

  expect(successMessage).toBeVisible();
});

it('should render error message', async () => {
  const usersApiMock = rest.post('http://localhost/api/users', (req, res, ctx) => res(
    ctx.status(500),
    ctx.json({}),
  ));

  server.use(usersApiMock);

  const { container } = renderPage(<IndexPage />);

  const submitButton = await screen.findByText('Continue');
  const firstNameInput = await screen.findByLabelText('First Name');
  const lastNameInput = await screen.findByLabelText('Last Name');
  const emailInput = await screen.findByLabelText('Email');
  const passwordInput = await screen.findByLabelText('Password');
  const phoneInput = await screen.findByLabelText('Phone');
  const agreementsInput = await container.querySelector('[name="agreed"]');

  userEvent.type(firstNameInput, 'test_firstNameInput');
  userEvent.type(lastNameInput, 'test_lastNameInput');
  userEvent.type(emailInput, 'test@email.com');
  userEvent.type(passwordInput, 'test_passwordInput');
  userEvent.type(phoneInput, '+1(111)111-1111');
  if (agreementsInput) {
    userEvent.click(agreementsInput);
  }
  userEvent.click(submitButton);

  const errorMessage = await screen.findByText('Unexpected error. Please try again later.');

  expect(errorMessage).toBeVisible();
});
