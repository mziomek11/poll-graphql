import React from 'react';

import Box from '@material-ui/core/Box';

import PageHeading from '../components/heading/Page';
import FormPageGrid from '../components/grid/FormPage';
import AuthUsernameTextField from '../components/auth/UsernameTextField';
import AuthEmailTextField from '../components/auth/EmailTextField';
import AuthPasswordTextField from '../components/auth/PasswordTextField';
import AuthConfirmPasswordTextField from '../components/auth/ConfirmPasswordTextField';
import AuthButton from '../components/auth/Button';
import AuthRedirectText from '../components/auth/RedirectText';

import useToken from '../hooks/useToken';
import useOpenAlert from '../hooks/useOpenAlert';
import useGraphqlForm from '../hooks/useGraphqlForm';
import { register } from '../graphql/mutations';
import { AuthResponse } from '../graphql/types';
import validateRegister, { RegisterData } from '../validation/register';

type RegisterResponse = { register: AuthResponse };

const initialValues: RegisterData = {
  email: '',
  username: '',
  password: '',
  confirmPassword: ''
};

const RegisterPage = () => {
  const openAlert = useOpenAlert();
  const { setToken } = useToken();
  const {
    errors,
    handleChange,
    handleSubmit,
    values,
    loading
  } = useGraphqlForm<RegisterData, RegisterData, RegisterResponse>(
    initialValues,
    initialValues,
    ({ confirmPassword, ...rest }) => register(rest),
    res => {
      setToken(res.register.token);
      openAlert('Your account has been created!', 'success');
    },
    validateRegister
  );

  return (
    <Box component="main" textAlign="center">
      <PageHeading>Create account</PageHeading>
      <FormPageGrid>
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
      </FormPageGrid>
    </Box>
  );
};

export default RegisterPage;
