import React from 'react';

import Action from './Action';

export type Props = {
  isOptionCurrentlyBeingUpdated: boolean;
  onCancelClick: VoidFunction;
  onUpdateClick: VoidFunction;
  onAddClick: VoidFunction;
};

const PollCreatorActions: React.FC<Props> = ({
  isOptionCurrentlyBeingUpdated,
  onCancelClick,
  onAddClick,
  onUpdateClick
}) => {
  return isOptionCurrentlyBeingUpdated ? (
    <>
      <Action onClick={onCancelClick}>Cancel</Action>
      <Action onClick={onUpdateClick}>Update</Action>
    </>
  ) : (
    <Action onClick={onAddClick}>Add option</Action>
  );
};

export default PollCreatorActions;
