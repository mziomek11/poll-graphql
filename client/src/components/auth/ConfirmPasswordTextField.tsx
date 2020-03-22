import React from 'react';

import CustomTextField, { CustomTextFieldProps } from '../text-field/Custom';

const AuthConfirmPasswordTextField: React.FC<CustomTextFieldProps> = props => {
  return (
    <CustomTextField
      label="Confirm password"
      name="confirmPassword"
      id="confirmPassword"
      type="password"
      {...props}
    />
  );
};

export default AuthConfirmPasswordTextField;
