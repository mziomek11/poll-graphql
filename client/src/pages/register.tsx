import React from 'react';

import Box from '@material-ui/core/Box';

import AuthHeading from '../components/auth/Heading';
import AuthGrid from '../components/auth/Grid';
import AuthUsernameTextField from '../components/auth/UsernameTextField';
import AuthEmailTextField from '../components/auth/EmailTextField';
import AuthPasswordTextField from '../components/auth/PasswordTextField';
import AuthConfirmPasswordTextField from '../components/auth/ConfirmPasswordTextField';
import AuthButton from '../components/auth/Button';
import AuthRedirectText from '../components/auth/RedirectText';

import useGraphqlForm from '../hooks/useGraphqlForm';
import { register } from '../graphql/mutations';
import { AuthResponse } from '../graphql/types';
import validateRegister, {
  RegisterData
} from '../validation/complex/validateRegister';

type RegisterResponse = { register: AuthResponse };

const initialValues: RegisterData = {
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
};

const RegisterPage = () => {
  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    loading
  } = useGraphqlForm<RegisterData, RegisterData, RegisterResponse>(
    initialValues,
    initialValues,
    values => register(values.username, values.email, values.password),
    res => console.log(res.register.token),
    validateRegister
  );

  return (
    <Box component="main" textAlign="center">
      <AuthHeading>Create account</AuthHeading>
      <AuthGrid>
        <form onSubmit={handleSubmit}>
          <AuthUsernameTextField
            onChange={handleChange}
            value={values.username}
            errorText={errors.username}
          />

          <AuthEmailTextField
            onChange={handleChange}
            value={values.email}
            errorText={errors.email}
          />

          <AuthPasswordTextField
            onChange={handleChange}
            value={values.password}
            errorText={errors.password}
          />

          <AuthConfirmPasswordTextField
            onChange={handleChange}
            value={values.confirmPassword}
            errorText={errors.confirmPassword}
          />

          <AuthButton loading={loading}>Create</AuthButton>
          <AuthRedirectText text="Already have an account? Login" to="/login" />
        </form>
      </AuthGrid>
    </Box>
  );
};

export default RegisterPage;
