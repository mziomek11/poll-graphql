import React, { useEffect, useState, useRef } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { isNumber } from 'util';

import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/core/styles';

import PollList from '../components/poll/list/List';
import PageGrid from '../components/grid/Page';
import useQuery from '../hooks/useQuery';
import { getPollsAndCount, GetPollsData } from '../graphql/queries';
import { ResponseListPoll } from '../graphql/types';

type Params = { page?: string };
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
  const params = useParams<Params>();
  const history = useHistory();
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

  useEffect(() => {
    return () => {
      mounted.current = false;
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    let pageToFetch = 1;
    const paramsPage = params.page;

    if (paramsPage) {
      const parsedParamsPage = parseInt(paramsPage);
      if (isNumber(parsedParamsPage) && parsedParamsPage > 0) {
        pageToFetch = parsedParamsPage;
      }
    }

    setState(prevState => ({ ...prevState, loading: true, page: pageToFetch }));
    query({ page: pageToFetch, perPage: pollsPerPage }).then(res => {
      if (mounted.current && res.data) {
        setState(prevState => ({
          ...prevState,
          ...res.data,
          loading: false
        }));
        window.scrollTo({ top: 0 });
      }
    });

    // eslint-disable-next-line
  }, [params.page]);

  const handlePaginationChange = (_: any, val: number) => {
    if (!loading && val !== page) history.push(`/page/${val}`);
  };

  return (
    <PageGrid>
      <Box component="main" textAlign="center">
        <PollList polls={polls} loading={loading} pollsPerPage={pollsPerPage} />

        <Pagination
          className={classes.pagination}
          count={Math.ceil(pollsCount / pollsPerPage)}
          page={page}
          onChange={handlePaginationChange}
        />
      </Box>
    </PageGrid>
  );
};

export default HomePage;
