import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import PollPaper from '../Paper';
import PollDetails from '../Details';
import { ResponseListPoll } from '../../../graphql/types';

type Props = {
  data: ResponseListPoll;
};

const useStyles = makeStyles(() => ({
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

const PollListItem: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  const { id, question, creationTime, totalVotes, user } = data;

  const pollDetailsProps = {
    username: user.username,
    question,
    creationTime,
    totalVotes
  };

  return (
    <Box component="li" textAlign="left">
      <Link component={RouterLink} to={`/poll/${id}`} className={classes.link}>
        <PollPaper>
          <PollDetails {...pollDetailsProps} />
        </PollPaper>
      </Link>
    </Box>
  );
};

export default PollListItem;
