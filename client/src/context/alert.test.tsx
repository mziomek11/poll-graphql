import React, { useContext } from 'react';
import { render, fireEvent } from '@testing-library/react';

import { AlertContext, AlertProvider } from './alert';

const alertMessage = 'alert_message';
const renderTestComponent = () => {
  const TestComponent = () => {
    const openAlert = useContext(AlertContext);
    const handleClick = () => {
      openAlert(alertMessage, 'success');
    };

    return <button data-testid="btn" onClick={handleClick} />;
  };

  return render(
    <AlertProvider>
      <TestComponent />
    </AlertProvider>
  );
};

describe('Alert token', () => {
  test('should not render alert after initial render', () => {
    const { queryByRole } = renderTestComponent();

    expect(queryByRole('alert')).toBeNull();
  });

  test('should render aler after openAlert call', () => {
    const { getByRole, getByText, getByTestId } = renderTestComponent();
    fireEvent.click(getByTestId('btn'));

    expect(getByRole('alert')).toBeTruthy();
    expect(getByText(alertMessage)).toBeTruthy();
  });
});
