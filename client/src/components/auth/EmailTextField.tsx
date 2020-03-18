import React from 'react';

import AuthTextField, { AuthTextFieldProps } from './TextField';

const AuthEmailTextField: React.FC<AuthTextFieldProps> = props => {
  return <AuthTextField label="Email" name="email" id="email" {...props} />;
};

export default AuthEmailTextField;
