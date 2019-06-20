import PropTypes from 'prop-types';
import React from 'react';
import { withRouter } from 'react-router-dom';
import './settingsModal.less';

class SettingsModal extends React.Component {
  preventClick = (e) => e.stopPropagation();

  redirectToLogout = () => this.props.history.push('/logout');

  render() {
    const {
      opened,
      toggler,
      findPersonModal
    } = this.props;

    return (
      <div
        onClick={toggler}
        className={`settings modal ${opened ? 'opened' : ''}`}
      >
        <div
          onClick={this.preventClick}
          className='content'
        >
          <div className='user info'>

          </div>
          <div className='actions'>
            <div onClick={findPersonModal} className='action'>
              <div className='icon search'/>
              <div className='text'>Найти друзей</div>
            </div>
            <div onClick={this.redirectToLogout} className='action'>
              <div className='icon logout'/>
              <div className='text'>Выйти</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SettingsModal);

SettingsModal.propTypes = {
  opened: PropTypes.bool.isRequired,
  toggler: PropTypes.func.isRequired,
  findPersonModal: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};
