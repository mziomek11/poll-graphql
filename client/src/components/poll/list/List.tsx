import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import ListItem from './Item';
import ListLoadingItem from './LoadingItem';
import { ResponseListPoll } from '../../../graphql/types';

export type Props = {
  polls: ResponseListPoll[];
  loading: boolean;
  pollsPerPage: number;
};

const useStyles = makeStyles(() => ({
  root: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  }
}));

const List: React.FC<Props> = ({ polls, loading, pollsPerPage }) => {
  const classes = useStyles();

  return (
    <ul className={classes.root}>
      {loading
        ? new Array(pollsPerPage)
            .fill(0)
            .map((_, i) => <ListLoadingItem key={i} />)
        : polls.map(poll => <ListItem data={poll} key={poll.id} />)}
    </ul>
  );
};

export default List;
