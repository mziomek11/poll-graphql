import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import CreatorActions, { Props } from './Actions';

const renderActions = (overrideProps: Partial<Props> = {}) => {
  const defualtProps: Props = {
    isOptionCurrentlyBeingUpdated: true,
    onAddClick: jest.fn(),
    onCancelClick: jest.fn(),
    onUpdateClick: jest.fn()
  };

  const props: Props = { ...defualtProps, ...overrideProps };

  return render(<CreatorActions {...props} />);
};

describe('Component PollCreatorActions', () => {
  test('render Update and Cancel button when isOptionCurrentlyBeingUpdated is true', () => {
    const { getByText, queryByText } = renderActions({
      isOptionCurrentlyBeingUpdated: true
    });

    expect(getByText('Update')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
    expect(queryByText('Add option')).toBeNull();
  });

  test('render Add option button when isOptionCurrentlyBeingUpdated is false', () => {
    const { getByText, queryByText } = renderActions({
      isOptionCurrentlyBeingUpdated: false
    });

    expect(getByText('Add option')).toBeTruthy();
    expect(queryByText('Update')).toBeNull();
    expect(queryByText('Cancel')).toBeNull();
  });

  test('calls onCancelClick after Cancel button click', () => {
    const mockOnCancelClickFn = jest.fn();
    const { getByText } = renderActions({
      isOptionCurrentlyBeingUpdated: true,
      onCancelClick: mockOnCancelClickFn
    });

    fireEvent.click(getByText('Cancel'));

    expect(mockOnCancelClickFn.mock.calls.length).toBe(1);
  });

  test('calls onUpdateClick after Update button click', () => {
    const mockOnUpdateClickFn = jest.fn();
    const { getByText } = renderActions({
      isOptionCurrentlyBeingUpdated: true,
      onUpdateClick: mockOnUpdateClickFn
    });

    fireEvent.click(getByText('Update'));

    expect(mockOnUpdateClickFn.mock.calls.length).toBe(1);
  });

  test('calls onAddClick after Add button click', () => {
    const mockOnAddClickFn = jest.fn();
    const { getByText } = renderActions({
      isOptionCurrentlyBeingUpdated: false,
      onAddClick: mockOnAddClickFn
    });

    fireEvent.click(getByText('Add option'));

    expect(mockOnAddClickFn.mock.calls.length).toBe(1);
  });
});
