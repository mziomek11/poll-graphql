import React from 'react';

import CustomTextField, { CustomTextFieldProps } from '../text-field/Custom';

const AuthUsernameTextField: React.FC<CustomTextFieldProps> = props => {
  return (
    <CustomTextField
      label="Username"
      name="username"
      id="username"
      {...props}
    />
  );
};

export default AuthUsernameTextField;
