import React from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import LoadableButon from '../components/buttons/Loadable';
import useGraphqlForm from '../hooks/useGraphqlForm';
import { register } from '../graphql/mutations';
import { AuthResponse } from '../graphql/types';
import validateRegister, {
  RegisterData
} from '../validation/complex/validateRegister';

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
  } = useGraphqlForm(
    initialValues,
    initialValues,
    ({ username, email, password }) => register(username, email, password),
    (res: { register: AuthResponse }) => console.log(res.register.token),
    validateRegister
  );

  return (
    <main>
      <Typography>Register</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          name="username"
          id="username"
          data-testid="username"
          onChange={handleChange}
          value={values.username}
          error={!!errors.username}
          helperText={errors.username}
        />

        <TextField
          label="Email"
          name="email"
          id="email"
          data-testid="email"
          onChange={handleChange}
          value={values.email}
          error={!!errors.email}
          helperText={errors.email}
        />

        <TextField
          label="Password"
          name="password"
          id="password"
          data-testid="password"
          type="password"
          onChange={handleChange}
          value={values.password}
          error={!!errors.password}
          helperText={errors.password}
        />

        <TextField
          label="Confirm password"
          name="confirmPassword"
          id="confirmPassword"
          data-testid="confirmPassword"
          type="password"
          onChange={handleChange}
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
        />

        <LoadableButon type="submit" loading={loading}>
          Register
        </LoadableButon>
      </form>
    </main>
  );
};

export default RegisterPage;
