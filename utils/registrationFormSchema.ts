import * as yup from 'yup';

const registrationFormSchema = yup.object({
  firstName: yup.string().required('first name is required'),
  lastName: yup.string().required('last name is required'),
  email: yup.string().required('email is required').email('please use valid email format'),
  password: yup.string().required('password is required'),
  phone: yup.string().required('phone is required').matches(/^\+1\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/, 'phone must be in format +1(XXX)XXX-XXXX'),
  agreed: yup.bool().oneOf([true], 'please accept all agreements'),
}).required();

export default registrationFormSchema;
