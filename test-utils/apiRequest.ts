import { NextApiRequest } from 'next';

const apiRequest = async (apiHandler: any, req: NextApiRequest) => {
  const apiResponse = {
    status: 0,
    json: {},
  };

  const res = {
    status(statusCode: number) {
      apiResponse.status = statusCode;
      return this;
    },
    json(body: any) {
      apiResponse.json = JSON.parse(JSON.stringify(body));
      return this;
    },
  };

  await apiHandler(req, res);

  return apiResponse;
};

export default apiRequest;
