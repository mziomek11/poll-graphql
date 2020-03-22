import React, { Fragment } from 'react';

import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';

import DeleteIcon from '@material-ui/icons/Delete';

import { OnClickProps } from './Options';

type Props = {
  content: string;
  isCurrentlyBeingUpdated: boolean;
} & OnClickProps;

const CreatorOption: React.FC<Props> = ({
  content,
  isCurrentlyBeingUpdated,
  onDeleteClick,
  onUpdateClick,
  onCancelClick
}) => {
  const handleDeleteClick = () => onDeleteClick(content);
  const handleUpdateClick = () => onUpdateClick(content);

  return (
    <Fragment>
      <Divider />
      <Tooltip title={isCurrentlyBeingUpdated ? 'Cancel editing' : 'Edit'}>
        <ListItem
          button
          onClick={isCurrentlyBeingUpdated ? onCancelClick : handleUpdateClick}
        >
          <ListItemText primary={content} />
          <ListItemSecondaryAction>
            {!isCurrentlyBeingUpdated && (
              <Tooltip title="Delete">
                <IconButton onClick={handleDeleteClick} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            )}
          </ListItemSecondaryAction>
        </ListItem>
      </Tooltip>
    </Fragment>
  );
};

export default CreatorOption;
