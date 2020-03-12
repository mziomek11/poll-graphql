import React from 'react';
import { useParams } from 'react-router-dom';

const PollPage = () => {
  const params = useParams<{ id: string }>();
  return <div>{params.id}</div>;
};

export default PollPage;
