import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import CreatorOption, { Props } from './Option';

const optionName = 'this is option name';
const renderActions = (overrideProps: Partial<Props> = {}) => {
  const defualtProps: Props = {
    content: optionName,
    isCurrentlyBeingUpdated: true,
    onDeleteClick: jest.fn(),
    onCancelClick: jest.fn(),
    onUpdateClick: jest.fn()
  };

  const props: Props = { ...defualtProps, ...overrideProps };

  return render(<CreatorOption {...props} />);
};

describe('Component PollCreatorOption', () => {
  describe('is being updated', () => {
    test('calls onCancel click after click', () => {
      const mockOnCancelClickFn = jest.fn();
      const { getByText } = renderActions({
        isCurrentlyBeingUpdated: true,
        onCancelClick: mockOnCancelClickFn
      });

      fireEvent.click(getByText(optionName));

      expect(mockOnCancelClickFn.mock.calls.length).toBe(1);
    });

    test('not renders delete button', () => {
      const { queryByTitle } = renderActions({ isCurrentlyBeingUpdated: true });

      expect(queryByTitle('Delete')).toBeNull();
    });
  });

  describe('is not being updated', () => {
    test('calls onUpdate click after click', () => {
      const mockOnUpdateClickFn = jest.fn();
      const { getByText } = renderActions({
        isCurrentlyBeingUpdated: false,
        onUpdateClick: mockOnUpdateClickFn
      });

      fireEvent.click(getByText(optionName));

      expect(mockOnUpdateClickFn.mock.calls.length).toBe(1);
    });

    test('renders delete button', () => {
      const { getByTitle } = renderActions({ isCurrentlyBeingUpdated: false });

      expect(getByTitle('Delete')).toBeTruthy();
    });

    test('calls onDelete after delete button click', () => {
      const mockOnDeleteClickFn = jest.fn();
      const { getByTitle } = renderActions({
        isCurrentlyBeingUpdated: false,
        onDeleteClick: mockOnDeleteClickFn
      });

      fireEvent.click(getByTitle('Delete'));

      expect(mockOnDeleteClickFn.mock.calls.length).toBe(1);
    });
  });
});
