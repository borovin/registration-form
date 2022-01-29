import dbConnect from './dbConnect';

const createUser = async (userData: any) => {
  const usersDb = await dbConnect('users');
  const {
    email, firstName, lastName, phone,
  } = userData;

  usersDb.data[email] = {
    email,
    firstName,
    lastName,
    phone,
  };

  await usersDb.write();

  return usersDb.data[email];
};

export default createUser;
