import React from 'react';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import ListPaper from './Paper';
import { ResponseListPoll } from '../../../graphql/types';

type Props = {
  data: ResponseListPoll;
};

const useStyles = makeStyles(() => ({
  longWordContainer: {
    overflowWrap: 'break-word',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
    hyphens: 'auto'
  },
  link: {
    '&:hover': {
      textDecoration: 'none'
    }
  }
}));

const ListItem: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  const { id, question, creationTime, options, user } = data;
  const totalVotes = options.reduce((prev, curr) => prev + curr.votes, 0);

  return (
    <Box component="li" textAlign="left" mb={2}>
      <Link component={RouterLink} to={`/poll/${id}`} className={classes.link}>
        <ListPaper>
          <Box display="flex" height="100%">
            <Box flexGrow={1} className={classes.longWordContainer}>
              <Typography variant="h6">{question}</Typography>
              <Typography variant="body2">
                by {user.username} {moment(creationTime).fromNow()}
              </Typography>
            </Box>
            <Box minWidth={40} textAlign="right">
              <Typography variant="subtitle1">{totalVotes}</Typography>
            </Box>
          </Box>
        </ListPaper>
      </Link>
    </Box>
  );
};

export default ListItem;
