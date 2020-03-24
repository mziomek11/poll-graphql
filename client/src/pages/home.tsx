import React, { useEffect, useState, useRef } from 'react';

import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import PollList from '../components/poll/list/List';
import TripleGrid from '../components/grid/Triple';
import useQuery from '../hooks/useQuery';
import { getPollsAndCount, GetPollsData } from '../graphql/queries';
import { ResponseListPoll } from '../graphql/types';

export type Response = { polls: ResponseListPoll[]; pollsCount: number };
type State = {
  polls: ResponseListPoll[];
  loading: boolean;
  page: number;
  pollsCount: number;
};

const useStyles = makeStyles(theme => ({
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  }
}));

export const pollsPerPage = 10;

const HomePage = () => {
  const mounted = useRef(true);
  const classes = useStyles();
  const query = useQuery<Response, any, GetPollsData>(getPollsAndCount);
  const [state, setState] = useState<State>({
    polls: [],
    loading: true,
    page: 1,
    pollsCount: 0
  });

  const { page, loading, polls, pollsCount } = state;

  const changePage = async (page: number) => {
    const res = await query({ page, perPage: pollsPerPage });
    if (mounted.current && res.data) {
      setState({ ...state, ...res.data, loading: false, page });
      window.scrollTo({ top: 0 });
    }
  };

  useEffect(() => {
    changePage(1);

    return () => {
      mounted.current = false;
    };

    // eslint-disable-next-line
  }, []);

  const handlePaginationChange = (_: any, val: number) => {
    if (!loading && val !== page) {
      setState({ ...state, loading: true });
      changePage(val);
    }
  };

  return (
    <TripleGrid>
      <Box component="main" textAlign="center">
        <PollList polls={polls} loading={loading} pollsPerPage={pollsPerPage} />

        <Pagination
          className={classes.pagination}
          count={Math.ceil(pollsCount / pollsPerPage)}
          page={page}
          onChange={handlePaginationChange}
        />
      </Box>
    </TripleGrid>
  );
};

export default HomePage;
