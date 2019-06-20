import { authenticationActions as actions } from 'pages/authentication/authenticationActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends React.Component {
  componentDidMount() {
    localStorage.clear();
    this.props.logout();
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

export default withRouter(connect(undefined, actions)(Logout));

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
