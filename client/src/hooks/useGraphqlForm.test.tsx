import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';

import useGraphqlForm from './useGraphqlForm';

const initialValues = {
  firstField: '',
  secondField: ''
};

type Props = {
  qglStringFn: (values: any) => string;
  onSuccess: (res: any) => void;
  validationFn?: (values: any) => any;
};

const TestComponent: React.FC<Props> = ({
  validationFn,
  qglStringFn,
  onSuccess
}) => {
  const { errors, handleSubmit, handleChange, values } = useGraphqlForm(
    initialValues,
    initialValues,
    qglStringFn,
    onSuccess,
    validationFn
  );

  return (
    <form onSubmit={handleSubmit} data-testid="form">
      <input
        data-testid="firstField"
        name="firstField"
        value={values.firstField}
        onChange={handleChange}
      />
      <input
        data-testid="secondField"
        name="secondField"
        value={values.secondField}
        onChange={handleChange}
      />
      <p data-testid="firstError">{errors.firstField}</p>
      <p data-testid="secondError">{errors.secondField}</p>
    </form>
  );
};

const noErrrorsValidatonFn = () => ({});
const gqlString = () => 'something';

afterEach(() => {
  jest.clearAllMocks();
});

describe('Hook useGraphqlForm', () => {
  test('call onSuccess with response data and not update errors when values are valid', async () => {
    const responseData = { something: true };
    const onSuccess = jest.fn();
    const comp = (
      <TestComponent
        validationFn={noErrrorsValidatonFn}
        onSuccess={onSuccess}
        qglStringFn={gqlString}
      />
    );

    jest
      .spyOn(global, 'fetch' as any)
      .mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve({ data: responseData }) })
      );

    const { getByTestId } = render(comp);
    const form = getByTestId('form');
    await act(async () => {
      fireEvent.submit(form);
    });

    expect(onSuccess.mock.calls.length).toBe(1);
    expect(onSuccess.mock.calls[0][0]).toEqual(responseData);

    const firstError = getByTestId('firstError');
    expect(firstError.innerHTML).toBe('');

    const secondError = getByTestId('secondError');
    expect(secondError.innerHTML).toBe('');
  });

  test('not call onSucces and fetch, update errors when client validation fails', async () => {
    const onSuccessFn = jest.fn();
    const firstFieldErrorText = 'this is first field error';
    const validationFn = () => ({ firstField: firstFieldErrorText });
    const comp = (
      <TestComponent
        validationFn={validationFn}
        onSuccess={onSuccessFn}
        qglStringFn={gqlString}
      />
    );

    const fetchFn = jest.fn();
    jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchFn);

    const { getByTestId } = render(comp);
    const form = getByTestId('form');
    await act(async () => {
      fireEvent.submit(form);
    });

    const firstError = getByTestId('firstError');
    expect(firstError.innerHTML).toBe(firstFieldErrorText);

    const secondError = getByTestId('secondError');
    expect(secondError.innerHTML).toBe('');

    expect(onSuccessFn.mock.calls.length).toBe(0);
    expect(fetchFn.mock.calls.length).toBe(0);
  });
});
