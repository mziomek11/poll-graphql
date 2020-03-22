import React from 'react';

import CustomTextField, { CustomTextFieldProps } from '../text-field/Custom';

const AuthPasswordTextField: React.FC<CustomTextFieldProps> = props => {
  return (
    <CustomTextField
      label="Password"
      name="password"
      id="password"
      type="password"
      {...props}
    />
  );
};

export default AuthPasswordTextField;
