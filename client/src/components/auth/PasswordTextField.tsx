import React from 'react';

import AuthTextField, { AuthTextFieldProps } from './TextField';

const AuthPasswordTextField: React.FC<AuthTextFieldProps> = props => {
  return (
    <AuthTextField
      label="Password"
      name="password"
      id="password"
      type="password"
      {...props}
    />
  );
};

export default AuthPasswordTextField;
