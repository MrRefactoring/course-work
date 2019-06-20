import PropTypes from 'prop-types';
import React from 'react';
import './chatHead.less';

class ChatHead extends React.Component {
  render() {
    const { title, lastSeen } = this.props;

    return (
      <div className='chat head'>
        <div className='dialog info'>
          <div className='title'>{title}</div>
          <div className='subtitle'>{lastSeen}</div>
        </div>
        <div className='actions'>

        </div>
      </div>
    );
  }
}

export default ChatHead;

ChatHead.propTypes = {
  title: PropTypes.string.isRequired,
  lastSeen: PropTypes.string.isRequired // TODO использовать дату
};
