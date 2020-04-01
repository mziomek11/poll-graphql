import React from 'react';
import moment from 'moment';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

type Props = {
  username: string;
  creationTime: string;
  question: string;
  totalVotes: number;
};

const PollDetails: React.FC<Props> = ({
  question,
  username,
  creationTime,
  totalVotes
}) => {
  return (
    <Box display="flex" height="100%">
      <Box flexGrow={1}>
        <Typography variant="h6">{question}</Typography>
        <Typography variant="body2">
          by {username} {moment(creationTime).fromNow()}
        </Typography>
      </Box>
      <Box minWidth={40} textAlign="right">
        <Typography variant="subtitle1">{totalVotes}</Typography>
      </Box>
    </Box>
  );
};

export default PollDetails;
