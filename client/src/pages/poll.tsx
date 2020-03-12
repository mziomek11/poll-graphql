import React from 'react';
import { useParams } from 'react-router-dom';

const PollPage = () => {
  const params = useParams<{ id: string }>();
  return <main>{params.id}</main>;
};

export default PollPage;
