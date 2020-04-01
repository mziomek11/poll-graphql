import React, {
  useState,
  useRef,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
  Fragment
} from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import LoadableButton from '../../buttons/Loadable';
import CustomTextField from '../../text-field/Custom';
import CreatorOptions from './Options';
import CreatorActions from './Actions';
import validateOption from '../../../validation/pollOption';
import validateCreatePoll from '../../../validation/createPoll';
import useQuery from '../../../hooks/useQuery';
import { createPoll } from '../../../graphql/mutations';
import { hasKeys } from '../../../utils/object';

const useStyles = makeStyles(theme => ({
  submitButton: {
    marginBottom: theme.spacing(2)
  }
}));

type ResponseData = {
  createPoll: { id: string };
};

type Errors = {
  option: string;
  question: string;
  options: string;
};

type State = {
  question: string;
  option: string;
  options: string[];
  errors: Errors;
  loading: boolean;
  optionCurrentlyBeingUpdated: string | null;
};

const emptyErrors: Errors = { option: '', question: '', options: '' };
const initialState: State = {
  question: '',
  option: '',
  loading: false,
  options: [],
  errors: emptyErrors,
  optionCurrentlyBeingUpdated: null
};

const PollCreator = () => {
  const history = useHistory();
  const query = useQuery<ResponseData>(createPoll);
  const classes = useStyles();
  const optionRef = useRef<HTMLInputElement>();
  const [state, setState] = useState<State>(initialState);

  const {
    question,
    option,
    options,
    errors,
    optionCurrentlyBeingUpdated,
    loading
  } = state;

  const setErrors = (newErrors: Partial<Errors>) => {
    setState({ ...state, errors: { ...emptyErrors, ...newErrors } });
  };

  const checkForOptionErrorAndUpdateState = () => {
    const validationErrors = validateOption({ option, options });
    const hasErrors = hasKeys(validationErrors);
    if (hasErrors) setErrors(validationErrors);

    return hasErrors;
  };

  const addOption = () => {
    if (checkForOptionErrorAndUpdateState()) return;
    setState({
      ...state,
      options: [...options, option],
      option: '',
      errors: emptyErrors
    });
  };

  const updateOption = () => {
    if (checkForOptionErrorAndUpdateState()) return;
    const newOptions = [...options];
    const optToUpdateIndex = newOptions.indexOf(optionCurrentlyBeingUpdated!);
    newOptions[optToUpdateIndex] = option;

    setState({
      ...state,
      options: newOptions,
      option: '',
      errors: emptyErrors,
      optionCurrentlyBeingUpdated: null
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleOptionKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    if (optionCurrentlyBeingUpdated) updateOption();
    else addOption();
  };

  const handleCreatePollClick = async () => {
    const validationErrors = validateCreatePoll({ question, options });
    if (hasKeys(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    setState({ ...state, loading: true });
    const res = await query({ options, question });

    if (hasKeys(res.errors)) {
      setErrors(res.errors);
      return;
    }

    if (res.data) history.push(`/poll/${res.data.createPoll.id}`);
  };

  const cancelUpdating = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      optionCurrentlyBeingUpdated: null,
      errors: emptyErrors,
      option: ''
    }));
  }, []);

  const startUpdatingOption = useCallback((option: string) => {
    if (optionRef.current) optionRef.current.focus();
    setState(prevState => ({
      ...prevState,
      optionCurrentlyBeingUpdated: option,
      errors: emptyErrors,
      option
    }));
  }, []);

  const deleteOption = useCallback((option: string) => {
    setState(prevState => ({
      ...prevState,
      options: prevState.options.filter(opt => opt !== option)
    }));
  }, []);

  return (
    <Fragment>
      <CustomTextField
        value={question}
        onChange={handleChange}
        errorText={errors.question}
        label="Question"
        id="question"
        name="question"
      />

      <CustomTextField
        value={option}
        onChange={handleChange}
        onKeyPress={handleOptionKeyPress}
        inputRef={optionRef}
        errorText={errors.option || errors.options}
        label="Option"
        id="option"
        name="option"
      />

      <CreatorActions
        isOptionCurrentlyBeingUpdated={!!optionCurrentlyBeingUpdated}
        onAddClick={addOption}
        onUpdateClick={updateOption}
        onCancelClick={cancelUpdating}
      />

      {options.length > 0 && (
        <CreatorOptions
          options={options}
          optionCurrentlyBeingUpdated={optionCurrentlyBeingUpdated}
          onDeleteClick={deleteOption}
          onUpdateClick={startUpdatingOption}
          onCancelClick={cancelUpdating}
        />
      )}

      <div>
        <LoadableButton
          className={classes.submitButton}
          loading={loading}
          onClick={handleCreatePollClick}
          color="primary"
          type="button"
        >
          Create poll
        </LoadableButton>
      </div>
    </Fragment>
  );
};

export default PollCreator;
