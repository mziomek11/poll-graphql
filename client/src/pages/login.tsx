import React from 'react';

import Box from '@material-ui/core/Box';

import PageHeading from '../components/heading/Page';
import FormPageGrid from '../components/grid/FormPage';
import AuthUsernameTextField from '../components/auth/UsernameTextField';
import AuthPasswordTextField from '../components/auth/PasswordTextField';
import AuthButton from '../components/auth/Button';
import AuthRedirectText from '../components/auth/RedirectText';
import AuthErrorText from '../components/auth/ErrorText';

import useToken from '../hooks/useToken';
import useGraphqlForm from '../hooks/useGraphqlForm';
import { login } from '../graphql/mutations';
import { AuthResponse } from '../graphql/types';
import validateLogin, { LoginData } from '../validation/login';

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
  const { setToken } = useToken();
  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    loading
  } = useGraphqlForm<LoginData, LoginErrors, LoginResponse>(
    initialValues,
    initialErrors,
    values => login(values),
    res => setToken(res.login.token),
    validateLogin
  );

  return (
    <Box component="main" textAlign="center">
      <PageHeading>Login</PageHeading>
      <FormPageGrid>
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
      </FormPageGrid>
    </Box>
  );
};

export default LoginPage;
