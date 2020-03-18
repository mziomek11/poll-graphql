import React, { Fragment } from 'react';
import { render, fireEvent } from '@testing-library/react';

import useFormValues from './useFormValues';

const initialValues = {
  first: 'init first',
  second: 'init second'
};

const TestComponent = () => {
  const { values, handleChange } = useFormValues(initialValues);

  return (
    <Fragment>
      <input
        data-testid="1"
        name="first"
        value={values.first}
        onChange={handleChange}
      />
      <input
        data-testid="2"
        name="second"
        value={values.second}
        onChange={handleChange}
      />
    </Fragment>
  );
};

describe('Hook useFormValues', () => {
  test('inputs have initial values', () => {
    const { getByTestId } = render(<TestComponent />) as any;

    expect(getByTestId('1').value).toBe(initialValues.first);
    expect(getByTestId('2').value).toBe(initialValues.second);
  });

  test('handleChange changes value of proper input', () => {
    const { getByTestId } = render(<TestComponent />) as any;
    const firstInput = getByTestId('1');
    const newValue = 'new value';
    fireEvent.change(firstInput, { target: { value: newValue } });

    expect(firstInput.value).toBe(newValue);
    expect(getByTestId('2').value).toBe(initialValues.second);
  });
});
