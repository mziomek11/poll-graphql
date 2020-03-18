import React from 'react';

import AuthTextField, { AuthTextFieldProps } from './TextField';

const AuthConfirmPasswordTextField: React.FC<AuthTextFieldProps> = props => {
  return (
    <AuthTextField
      label="Confirm password"
      name="confirmPassword"
      id="confirmPassword"
      type="password"
      {...props}
    />
  );
};

export default AuthConfirmPasswordTextField;
