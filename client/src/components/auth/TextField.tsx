import React from 'react';

import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

type OwnProps = { errorText: string };
export type AuthTextFieldProps = OwnProps & TextFieldProps;

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(0.75)
  }
}));

const AuthTextField: React.FC<AuthTextFieldProps> = ({
  errorText,
  ...textFieldProps
}) => {
  const classes = useStyles();

  return (
    <TextField
      className={classes.root}
      error={!!errorText}
      helperText={errorText}
      fullWidth
      autoComplete="off"
      InputProps={{
        autoCorrect: 'off',
        autoCapitalize: 'off',
        spellCheck: 'false'
      }}
      {...textFieldProps}
    />
  );
};

export default AuthTextField;
