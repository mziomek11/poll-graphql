import React from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import usePoll from '../../../hooks/usePoll';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%'
  },
  formControlLabel: {
    marginRight: 0
  }
}));

type Props = {
  selectedOption: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
};

const SinglePollVoteOptions: React.FC<Props> = ({
  selectedOption,
  onChange
}) => {
  const classes = useStyles();
  const { poll } = usePoll();
  const { question, options } = poll!;
  const optionsTextes = options.map(({ text }) => text);

  return (
    <FormControl className={classes.root} component="fieldset">
      <RadioGroup
        aria-label={question}
        name={question}
        value={selectedOption}
        onChange={onChange}
      >
        {optionsTextes.map(text => (
          <FormControlLabel
            className={classes.formControlLabel}
            control={<Radio color="primary" />}
            key={text}
            value={text}
            label={text}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default SinglePollVoteOptions;
