import React from 'react';

import Box from '@material-ui/core/Box';

import AuthHeading from '../components/auth/Heading';
import AuthGrid from '../components/auth/Grid';
import AuthUsernameTextField from '../components/auth/UsernameTextField';
import AuthPasswordTextField from '../components/auth/PasswordTextField';
import AuthButton from '../components/auth/Button';
import AuthRedirectText from '../components/auth/RedirectText';
import AuthErrorText from '../components/auth/ErrorText';

import useGraphqlForm from '../hooks/useGraphqlForm';
import { login } from '../graphql/mutations';
import { AuthResponse } from '../graphql/types';
import validateLogin, { LoginData } from '../validation/complex/validateLogin';

type LoginErrors = { credentials: string } & LoginData;
type LoginResponse = { login: AuthResponse };

const initialValues: LoginData = {
  username: '',
  password: ''
};

const initialErrors: LoginErrors = {
  ...initialValues,
  credentials: ''
};

const LoginPage = () => {
  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    loading
  } = useGraphqlForm<LoginData, LoginErrors, LoginResponse>(
    initialValues,
    initialErrors,
    values => login(values.username, values.password),
    res => console.log(res.login.token),
    validateLogin
  );

  return (
    <Box component="main" textAlign="center">
      <AuthHeading>Login</AuthHeading>
      <AuthGrid>
        <form onSubmit={handleSubmit}>
          <AuthUsernameTextField
            onChange={handleChange}
            value={values.username}
            errorText={errors.username}
          />

          <AuthPasswordTextField
            onChange={handleChange}
            value={values.password}
            errorText={errors.password}
          />

          {errors.credentials && (
            <AuthErrorText>{errors.credentials}</AuthErrorText>
          )}

          <AuthButton loading={loading}>Login</AuthButton>
          <AuthRedirectText
            text="Don't have an account? Create"
            to="/register"
          />
        </form>
      </AuthGrid>
    </Box>
  );
};

export default LoginPage;
