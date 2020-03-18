import React from 'react';

import AuthTextField, { AuthTextFieldProps } from './TextField';

const AuthUsernameTextField: React.FC<AuthTextFieldProps> = props => {
  return (
    <AuthTextField label="Username" name="username" id="username" {...props} />
  );
};

export default AuthUsernameTextField;
