import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import ResultsBar from './ResultsBar';

type Props = {
  text: string;
  votesPercent: number;
};

const useStyles = makeStyles(theme => ({
  root: {
    margin: `${theme.spacing(1)}px 0`
  }
}));

const SinglePollResultsOption: React.FC<Props> = ({ text, votesPercent }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Divider />
      <Box pt={1} pr={1}>
        <Typography variant="body1">{text}</Typography>
      </Box>

      <Box display="flex" py={1}>
        <Box flexGrow={1} pr={1}>
          <ResultsBar fillPercentage={votesPercent} />
        </Box>
        <Box width={40} textAlign="right">
          <Typography variant="body1">{votesPercent}%</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default SinglePollResultsOption;
