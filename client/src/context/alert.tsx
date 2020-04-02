import React, { createContext, useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert, { AlertProps } from '@material-ui/lab/Alert';

type Severity = AlertProps['severity'];
type OpenAlertFn = (message: string, severity: Severity) => void;

export const AlertContext = createContext<OpenAlertFn>(
  () => new Error('Must be inside provider')
);

type State = {
  isOpen: boolean;
  message: string;
  severity: Severity;
};

export const AlertProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<State>({
    isOpen: false,
    message: '',
    severity: 'success'
  });

  const openAlert: OpenAlertFn = (message: string, severity: Severity) => {
    setState({ isOpen: true, message, severity });
  };

  const handleClose = (
    e: React.SyntheticEvent<any, Event>,
    reason?: string
  ) => {
    if (!reason || reason !== 'clickaway') {
      setState({ ...state, isOpen: false });
    }
  };

  return (
    <AlertContext.Provider value={openAlert}>
      {children}
      <Snackbar
        open={state.isOpen}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          severity={state.severity}
          elevation={6}
          variant="filled"
          onClose={handleClose}
        >
          {state.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};
