import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function ElevateAppBar(props) {
  const { appName, children } = props;
  return (
    <React.Fragment>
      <CssBaseline />
        <AppBar>
            <Toolbar>
            <Typography variant="h6">{appName}</Typography>
            </Toolbar>
        </AppBar>
      <Toolbar />
      {children}
    </React.Fragment>
  );
}

ElevateAppBar.propTypes = {
    appName: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};

