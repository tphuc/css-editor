import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import {ChevronRight, ChevronDown} from 'react-feather'

const useTreeItemStyles = makeStyles(theme => ({
  root: {
    '&:focus > $content': {
      backgroundColor: `var(--tree-view-bg-color, #5e81ac)`,
      color: 'var(--tree-view-color)',
    },
  },
  content: {
    color: '#81a1c1',
    marginTop: 2,
    MozBorderRadiusTopleft: 20,
    backgroundColor: '#434c5e',
    paddingRight: theme.spacing(0),
    fontWeight: theme.typography.fontWeightMedium,
    '$expanded > &': {
      fontWeight: theme.typography.fontWeightRegular,
    },
  },
  group: {

  },
  expanded: {},
  label: {
    fontWeight: 'inherit',
    color: 'inherit',
  },
  labelRoot: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0.5, 1),
  },
  labelIcon: {
    marginRight: theme.spacing(2),
  },
  labelText: {
    fontWeight: 'inherit',
    flexGrow: 1,
  },
}));

function StyledTreeItem(props) {
  const classes = useTreeItemStyles();
  const { labelText, labelIcon, labelInfo, color, bgColor, onDrag, ...other } = props;

  return (
    <TreeItem
      draggable
      label={
        <div className={classes.labelRoot}>
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': '#3b4252',
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        group: classes.group,
        label: classes.label,
      }}
      onMouseDown={() => console.log(labelText)}
      {...other}
    />
  );
}

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType.isRequired,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,
};

const useStyles = makeStyles({
  root: {
    height: 264,
    flexGrow: 1,
    maxWidth: 400,
  },
});

export default function GmailTreeView() {
  const classes = useStyles();

  return (
    <TreeView
      className={classes.root}
      defaultExpanded={['3']}
      defaultCollapseIcon={<ChevronDown />}
      defaultExpandIcon={<ChevronRight />}
      defaultEndIcon={<div style={{ width: 24 }} />}
    >
      <StyledTreeItem nodeId="2" labelText="Trash" labelIcon={<ChevronRight />} onDragEnter={() => console.log('asd')} >
        <StyledTreeItem nodeId="1" labelText="All Mail" labelIcon={<ChevronRight />} />
      </StyledTreeItem>
      <StyledTreeItem nodeId="3" labelText="Categories" labelIcon={<ChevronRight />}>
        <StyledTreeItem
          nodeId="5"
          labelText="Social"
          labelIcon={<ChevronRight></ChevronRight>}
          labelInfo="90"
          color="#1a73e8"
          bgColor="#e8f0fe"
        />
        <StyledTreeItem

          nodeId="6"
          labelText="Updates"
          labelIcon={<ChevronRight></ChevronRight>}
          labelInfo="2,294"
          color="#e3742f"
          bgColor="#fcefe3"
        />
        <StyledTreeItem
          nodeId="7"
          labelText="Forums"
          labelIcon={<ChevronRight></ChevronRight>}
          labelInfo="3,566"
          color="#a250f5"
          bgColor="#f3e8fd"
        />
        <StyledTreeItem
          nodeId="8"
          labelText="Promotions"
          labelIcon={<ChevronRight></ChevronRight>}
          labelInfo="733"
          color="#3c8039"
          bgColor="#e6f4ea"
        />
      </StyledTreeItem>
      <StyledTreeItem nodeId="4" labelText="History" labelIcon={<ChevronRight></ChevronRight>} />
    </TreeView>
  );
}