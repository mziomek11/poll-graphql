import React from 'react';

import CustomTextField, { CustomTextFieldProps } from '../text-field/Custom';

const AuthEmailTextField: React.FC<CustomTextFieldProps> = props => {
  return <CustomTextField label="Email" name="email" id="email" {...props} />;
};

export default AuthEmailTextField;
