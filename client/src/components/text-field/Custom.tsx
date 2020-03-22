import React from 'react';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';

type OwnProps = { errorText?: string };
export type CustomTextFieldProps = OwnProps & TextFieldProps;

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  errorText,
  ...textFieldProps
}) => {
  return (
    <TextField
      error={!!errorText}
      helperText={errorText}
      fullWidth
      autoComplete="off"
      margin="dense"
      InputProps={{
        autoCorrect: 'off',
        autoCapitalize: 'off',
        spellCheck: 'false'
      }}
      inputProps={{
        maxLength: 255
      }}
      {...textFieldProps}
    />
  );
};

export default CustomTextField;
