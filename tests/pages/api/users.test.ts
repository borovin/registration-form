import userApi from 'pages/api/users';
import apiRequest from 'test-utils/apiRequest';
import store from 'test-utils/store';

it('should return 404 for get request', async () => {
  const res = await apiRequest(userApi, {
    method: 'get',
  });

  expect(res.status).toBe(404);
});

it('should return 400 for invalid request', async () => {
  const res = await apiRequest(userApi, {
    method: 'POST',
    body: {},
  });

  expect(res.status).toBe(400);
  expect(res.json).toMatchInlineSnapshot(`
Array [
  Object {
    "errors": Array [
      "firstName is a required field",
    ],
    "inner": Array [],
    "message": "firstName is a required field",
    "name": "ValidationError",
    "params": Object {
      "path": "firstName",
    },
    "path": "firstName",
    "type": "required",
  },
  Object {
    "errors": Array [
      "lastName is a required field",
    ],
    "inner": Array [],
    "message": "lastName is a required field",
    "name": "ValidationError",
    "params": Object {
      "path": "lastName",
    },
    "path": "lastName",
    "type": "required",
  },
  Object {
    "errors": Array [
      "email is a required field",
    ],
    "inner": Array [],
    "message": "email is a required field",
    "name": "ValidationError",
    "params": Object {
      "path": "email",
    },
    "path": "email",
    "type": "required",
  },
  Object {
    "errors": Array [
      "password is a required field",
    ],
    "inner": Array [],
    "message": "password is a required field",
    "name": "ValidationError",
    "params": Object {
      "path": "password",
    },
    "path": "password",
    "type": "required",
  },
  Object {
    "errors": Array [
      "phone is a required field",
    ],
    "inner": Array [],
    "message": "phone is a required field",
    "name": "ValidationError",
    "params": Object {
      "path": "phone",
    },
    "path": "phone",
    "type": "required",
  },
]
`);
});

it('should return 400 for existing user', async () => {
  store.users = {
    data: {
      'test@user.com': {},
    },
  };
  const res = await apiRequest(userApi, {
    method: 'POST',
    body: {
      firstName: 'test_firstName',
      lastName: 'test_lastName',
      email: 'test@user.com',
      password: 'test_password',
      phone: '+1(111)111-1111',
    },
  });

  expect(res.status).toBe(400);
  expect(res.json).toMatchInlineSnapshot(`
Array [
  Object {
    "errors": Array [
      "email is already registered",
    ],
    "inner": Array [],
    "message": "email is already registered",
    "name": "ValidationError",
    "params": Object {
      "originalValue": "test@user.com",
      "path": "email",
      "value": "test@user.com",
    },
    "path": "email",
    "type": "isUniqEmail",
    "value": "test@user.com",
  },
]
`);
});

it('should return 201 for new user', async () => {
  const res = await apiRequest(userApi, {
    method: 'POST',
    body: {
      firstName: 'test_firstName',
      lastName: 'test_lastName',
      email: 'test@user.com',
      password: 'test_password',
      phone: '+1(111)111-1111',
    },
  });

  expect(res.status).toBe(201);
  expect(res.json).toMatchInlineSnapshot(`
Object {
  "email": "test@user.com",
  "firstName": "test_firstName",
  "lastName": "test_lastName",
  "phone": "+1(111)111-1111",
}
`);
});
