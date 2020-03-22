import React, { memo } from 'react';

import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { makeStyles } from '@material-ui/core/styles';

import Option from './Option';

export type OnClickProps = {
  onDeleteClick: (content: string) => void;
  onUpdateClick: (content: string) => void;
  onCancelClick: () => void;
};

type Props = {
  options: string[];
  optionCurrentlyBeingUpdated: string | null;
} & OnClickProps;

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: theme.spacing(2)
  }
}));

const CreatorOptions: React.FC<Props> = ({
  options,
  optionCurrentlyBeingUpdated,
  ...onClickProps
}) => {
  const classes = useStyles();

  return (
    <List
      component={Paper}
      elevation={3}
      subheader={<ListSubheader>Options</ListSubheader>}
      className={classes.root}
    >
      {options.map(content => (
        <Option
          key={content}
          content={content}
          isCurrentlyBeingUpdated={optionCurrentlyBeingUpdated === content}
          {...onClickProps}
        />
      ))}
    </List>
  );
};

export default memo(CreatorOptions);
