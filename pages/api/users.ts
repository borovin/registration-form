import type { NextApiRequest, NextApiResponse } from 'next';
import { ValidationError } from 'yup';
import userSchema from 'utils/userSchema';
import createUser from 'utils/createUser';

type ResponseJson = {
  name: string
} | ValidationError[] | { error: any };

const handleUsers = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseJson>,
) => {
  if (req.method === 'POST') {
    try {
      await userSchema.validate(req.body, { abortEarly: false });
    } catch (error) {
      if (error instanceof ValidationError) {
        return res.status(400).json(error.inner);
      }

      return res.status(500).json({ error });
    }

    const newUser = await createUser(req.body);

    return res.status(201).json(newUser);
  }

  return res.status(404).json({ error: 'Method not found' });
};

export default handleUsers;
