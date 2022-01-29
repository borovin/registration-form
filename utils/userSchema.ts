import * as yup from 'yup';
import dbConnect from './dbConnect';

const userSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().required().email().test('isUniqEmail', 'email is already registered', (async (email: string) => {
    const usersDb = await dbConnect('users');
    return !usersDb.data[email];
  }) as yup.TestFunction),
  password: yup.string().required(),
  phone: yup.string().required().matches(/^\+1\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/),
}).required();

export default userSchema;
