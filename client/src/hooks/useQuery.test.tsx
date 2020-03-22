import React, { useState } from 'react';
import { render, act, fireEvent } from '@testing-library/react';

import useQuery, { authErrMessage } from './useQuery';
import { TokenContext } from '../context/token';
import {
  createFetchImplementation,
  createArgumentError
} from '../testUtils/api';

type TestCompoenentProps = {
  gqlString: string | ((data: any) => string);
};

const TestComponent: React.FC<TestCompoenentProps> = ({ gqlString }) => {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<any>(null);
  const query = useQuery(gqlString);

  const handleClick = async () => {
    const res = await query();
    if (res.data) setData(res.data);
    if (res.errors) setErrors(res.errors);
  };

  return (
    <div>
      <p data-testid="data">{JSON.stringify(data)}</p>
      <p data-testid="errors">{JSON.stringify(errors)}</p>
      <button data-testid="button" onClick={handleClick} />
    </div>
  );
};

describe('Hook useQuery', () => {
  test('calls fetch with given string', async () => {
    const fetchImplementation = createFetchImplementation({ data: null });
    const fetchFn = jest.fn(fetchImplementation);
    jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchFn);
    const gqlString = 'this is graphql string';

    const { getByTestId } = render(<TestComponent gqlString={gqlString} />);
    const button = getByTestId('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(fetchFn.mock.calls.length).toBe(1);
    expect((fetchFn.mock.calls[0] as any)[1].body).toEqual(
      `{"query":"${gqlString}"}`
    );
  });

  test('calls fetch with string returned by function', async () => {
    const fetchImplementation = createFetchImplementation({ data: null });
    const fetchFn = jest.fn(fetchImplementation);
    jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchFn);
    const gqlString = () => 'this is graphql string from function';

    const { getByTestId } = render(<TestComponent gqlString={gqlString} />);
    const button = getByTestId('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(fetchFn.mock.calls.length).toBe(1);
    expect((fetchFn.mock.calls[0] as any)[1].body).toEqual(
      `{"query":"${gqlString()}"}`
    );
  });

  test('returns fetched data and empty error object', async () => {
    const jsonResponse = { data: 'GQL_DATA' };
    const fetchImpl = createFetchImplementation(jsonResponse);
    jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImpl);

    const { getByTestId } = render(<TestComponent gqlString="anything" />);
    const button = getByTestId('button');
    await act(async () => {
      fireEvent.click(button);
    });

    const dataParagraph = getByTestId('data');
    expect(dataParagraph.innerHTML).toBe(JSON.stringify(jsonResponse.data));

    const errorsParagraph = getByTestId('errors');
    expect(errorsParagraph.innerHTML).toBe(JSON.stringify({}));
  });

  test('returns data as null and properly formatted errors', async () => {
    const errors = [
      { message: 'Another Errore' },
      createArgumentError([
        { property: 'Err1', constraints: ['Err1Con1', 'Err1Con2'] },
        { property: 'Err2', constraints: ['Err2Con1'] }
      ])
    ];

    const jsonResponse = { data: null, errors };
    const fetchImpl = createFetchImplementation(jsonResponse);
    jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImpl);

    const { getByTestId } = render(<TestComponent gqlString="anything" />);
    const button = getByTestId('button');
    await act(async () => {
      fireEvent.click(button);
    });

    const dataParagraph = getByTestId('data');
    expect(dataParagraph.innerHTML).toBe(JSON.stringify(jsonResponse.data));

    const errorsParagraph = getByTestId('errors');
    expect(errorsParagraph.innerHTML).toBe(
      JSON.stringify({ Err1: 'Err1Con1', Err2: 'Err2Con1' })
    );
  });

  test('sets token to null when auth error occurs', async () => {
    const jsonResponse = { data: null, errors: [{ message: authErrMessage }] };
    const fetchImpl = createFetchImplementation(jsonResponse);
    jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImpl);

    const mockSetTokenFn = jest.fn();
    const { getByTestId } = render(
      <TokenContext.Provider
        value={{ setToken: mockSetTokenFn, token: 'token' }}
      >
        <TestComponent gqlString="anything" />
      </TokenContext.Provider>
    );

    const button = getByTestId('button');
    await act(async () => {
      fireEvent.click(button);
    });

    expect(mockSetTokenFn.mock.calls.length).toBe(1);
    expect(mockSetTokenFn.mock.calls[0]).toEqual([null]);
  });
});
