import { useContext } from 'react';

import { AlertContext } from '../context/alert';

export default function() {
  const openAlert = useContext(AlertContext);

  return openAlert;
}
