import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent, act } from '@testing-library/react';

import Creator from './Creator';
import {
  optionExists,
  atLeast2Options,
  questionRequired
} from '../../../validation/messages';
import {
  createArgumentError,
  createFetchImplementation
} from '../../../testUtils/api';

const renderCreator = () =>
  render(
    <BrowserRouter>
      <Creator />
    </BrowserRouter>
  );

const renderCreatorAndAddOption = () => {
  const utils = renderCreator();
  const optionInput = utils.getByLabelText('Option');
  const addButton = utils.getByText('Add option');

  fireEvent.change(optionInput, { target: { value: optionText } });
  fireEvent.click(addButton);

  return { utils, optionInput, addButton };
};

const renderCreatorAndAddAndClickOption = () => {
  const renderData = renderCreatorAndAddOption();

  const option = renderData.utils.getByText(optionText);
  fireEvent.click(option);

  return renderData;
};

const optionText = 'option 1';

describe('Component PollCreator', () => {
  test('input content changes after change event', () => {
    const { getByLabelText } = renderCreator();
    const questionText = 'this is question text';
    const optionText = 'this is option text';
    const questionInput = getByLabelText('Question');
    const optionInput = getByLabelText('Option');

    fireEvent.change(questionInput, { target: { value: questionText } });
    fireEvent.change(optionInput, { target: { value: optionText } });

    expect((questionInput as any).value).toBe(questionText);
    expect((optionInput as any).value).toBe(optionText);
  });

  test('not render options when there is not any', () => {
    const { queryByText } = renderCreator();

    expect(queryByText('Options')).toBeNull();
  });

  describe('adding', () => {
    test('reset option input value after add', () => {
      const { optionInput } = renderCreatorAndAddOption();

      expect((optionInput as any).value).toBe('');
    });

    test('add option, render options and option', () => {
      const { utils } = renderCreatorAndAddOption();

      expect(utils.getByText('Options')).toBeTruthy();
      expect(utils.getByText(optionText)).toBeTruthy();
    });

    test('added option has delete button', () => {
      const { utils } = renderCreatorAndAddOption();

      expect(utils.getByTitle('Delete')).toBeTruthy();
    });

    test('add multiple options', () => {
      const { utils, optionInput, addButton } = renderCreatorAndAddOption();
      const secondOptionText = 'option 2';
      fireEvent.change(optionInput, { target: { value: secondOptionText } });
      fireEvent.click(addButton);

      expect(utils.getByText(optionText)).toBeTruthy();
      expect(utils.getByText(secondOptionText)).toBeTruthy();
    });
  });

  describe('deleting', () => {
    test('deletes proper option on delete click', () => {
      const { addButton, utils, optionInput } = renderCreatorAndAddOption();
      const secondOptionText = 'option 2';

      fireEvent.change(optionInput, { target: { value: secondOptionText } });
      fireEvent.click(addButton);

      const firstDeleteButton = utils.getAllByTitle('Delete')[0];
      fireEvent.click(firstDeleteButton);

      expect(utils.queryByText(optionText)).toBeNull();
      expect(utils.getByText(secondOptionText)).toBeTruthy();
    });
  });

  describe('updating', () => {
    test('render update buttons and not render Add option', () => {
      const { utils } = renderCreatorAndAddAndClickOption();

      expect(utils.queryByText('Add option')).toBeNull();
      expect(utils.getByText('Update')).toBeTruthy();
      expect(utils.getByText('Cancel')).toBeTruthy();
    });

    test('not render delete button', () => {
      const { utils } = renderCreatorAndAddAndClickOption();

      expect(utils.queryByTitle('Delete')).toBeNull();
    });

    test('input content changes to option content', () => {
      const { optionInput } = renderCreatorAndAddAndClickOption();

      expect((optionInput as any).value).toBe(optionText);
    });

    describe('cancel click', () => {
      test('render update Add option and not render update buttons', () => {
        const { utils } = renderCreatorAndAddAndClickOption();
        fireEvent.click(utils.getByText('Cancel'));

        expect(utils.getByText('Add option')).toBeTruthy();
        expect(utils.queryByText('Update')).toBeNull();
        expect(utils.queryByText('Cancel')).toBeNull();
      });

      test('input content is cleared', () => {
        const { utils, optionInput } = renderCreatorAndAddAndClickOption();
        fireEvent.click(utils.getByText('Cancel'));

        expect((optionInput as any).value).toBe('');
      });

      test('render option in options with the same content', () => {
        const { utils } = renderCreatorAndAddAndClickOption();
        fireEvent.click(utils.getByText('Cancel'));

        expect(utils.getByText(optionText)).toBeTruthy();
      });

      test('render delete button', () => {
        const { utils } = renderCreatorAndAddAndClickOption();
        fireEvent.click(utils.getByText('Cancel'));

        expect(utils.getByTitle('Delete')).toBeTruthy();
      });
    });

    describe('second option click', () => {
      test('render update Add option and not render update buttons', () => {
        const { utils } = renderCreatorAndAddAndClickOption();
        fireEvent.click(utils.getByText(optionText));

        expect(utils.getByText('Add option')).toBeTruthy();
        expect(utils.queryByText('Update')).toBeNull();
        expect(utils.queryByText('Cancel')).toBeNull();
      });

      test('input content is cleared', () => {
        const { utils, optionInput } = renderCreatorAndAddAndClickOption();
        fireEvent.click(utils.getByText(optionText));

        expect((optionInput as any).value).toBe('');
      });

      test('render option in options with the same content', () => {
        const { utils } = renderCreatorAndAddAndClickOption();
        fireEvent.click(utils.getByText(optionText));

        expect(utils.getByText(optionText)).toBeTruthy();
      });

      test('render delete button', () => {
        const { utils } = renderCreatorAndAddAndClickOption();
        fireEvent.click(utils.getByText(optionText));

        expect(utils.getByTitle('Delete')).toBeTruthy();
      });
    });

    describe('update click', () => {
      const newValue = 'another value';
      test('input content is cleared', () => {
        const { utils, optionInput } = renderCreatorAndAddAndClickOption();
        fireEvent.change(optionInput, { target: { value: newValue } });
        fireEvent.click(utils.getByText('Update'));

        expect((optionInput as any).value).toBe('');
      });

      test('render option in option with changed content', () => {
        const { utils, optionInput } = renderCreatorAndAddAndClickOption();
        fireEvent.change(optionInput, { target: { value: newValue } });
        fireEvent.click(utils.getByText('Update'));

        expect(utils.getByText(newValue)).toBeTruthy();
      });

      test('render update Add option and not render update buttons', () => {
        const { utils, optionInput } = renderCreatorAndAddAndClickOption();
        fireEvent.change(optionInput, { target: { value: newValue } });
        fireEvent.click(utils.getByText('Update'));

        expect(utils.getByText('Add option')).toBeTruthy();
        expect(utils.queryByText('Update')).toBeNull();
        expect(utils.queryByText('Cancel')).toBeNull();
      });

      test('render error when validation fails', () => {
        const { utils } = renderCreatorAndAddAndClickOption();
        fireEvent.click(utils.getByText('Update'));

        expect(utils.getByText(optionExists)).toBeTruthy();
      });
    });
  });

  describe('submitting', () => {
    test('update errors when client validation errors occurred', () => {
      const { getByText } = renderCreator();
      const createPollButton = getByText('Create poll');

      fireEvent.click(createPollButton);

      expect(getByText(questionRequired)).toBeTruthy();
      expect(getByText(atLeast2Options)).toBeTruthy();
    });

    test('update errors when server validation errors occurred', async () => {
      const questionError = 'Some server question error';
      const optionsError = 'Some server options errror';
      const errors = [
        createArgumentError([
          { property: 'question', constraints: [questionError] },
          { property: 'options', constraints: [optionsError] }
        ])
      ];

      const fetchImp = createFetchImplementation({ data: null, errors });
      jest.spyOn(global, 'fetch' as any).mockImplementationOnce(fetchImp);

      const { getByText, getByLabelText } = renderCreator();
      const questionInput = getByLabelText('Question');
      const optionInput = getByLabelText('Option');
      const addButton = getByText('Add option');
      const createPollButton = getByText('Create poll');

      fireEvent.change(questionInput, { target: { value: 'some question' } });
      fireEvent.change(optionInput, { target: { value: 'op1' } });
      fireEvent.click(addButton);
      fireEvent.change(optionInput, { target: { value: 'op2' } });
      fireEvent.click(addButton);

      await act(async () => {
        fireEvent.click(createPollButton);
      });

      expect(getByText(questionError)).toBeTruthy();
      expect(getByText(optionsError)).toBeTruthy();
    });
  });
});
