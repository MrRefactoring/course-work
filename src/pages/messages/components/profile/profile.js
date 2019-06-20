import PropTypes from 'prop-types';
import React from 'react';
import './profile.less';

class Profile extends React.Component {
  render() {
    const { title, lastSeen } = this.props;

    return (
      <div className='profile'>
        <div className='header'>
          <div className='title'>
            Информация о собеседнике
          </div>
          <div className='action'>
            <div></div>
          </div>
        </div>
        <div className='user info'>
          <div className='avatar'>
            <img src='https://scontent-ams3-1.cdninstagram.com/vp/b7580118454feb4c4aae127cd1dbce71/5D15C0BA/t51.2885-15/sh0.08/e35/s640x640/31060828_419781101803916_1344520296329117696_n.jpg?_nc_ht=scontent-ams3-1.cdninstagram.com' />
          </div>
          <div className='info block'>
            <div className='title'>
              {title}
            </div>
            <div className='subtitle'>
              {lastSeen}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

Profile.propTypes = {
  title: PropTypes.string.isRequired,
  lastSeen: PropTypes.string.isRequired // TODO использовать дату
};
