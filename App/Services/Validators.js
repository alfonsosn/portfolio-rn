import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  username: yup.string()
    .email('Please enter a valid email')
    .required('Please enter an email'),
  password: yup.string()
    .required('Please enter your password'),
  // .required('Routing number is required'),
})
