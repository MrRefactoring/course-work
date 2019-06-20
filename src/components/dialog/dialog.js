import { messagesActions as actions } from 'pages/messages/messagesActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import './dialog.less';

class Dialog extends React.Component {
  handleClick = () => {
    const {
      onClick = () => {},
      index
    } = this.props;

    onClick(index);
  }

  removeDialog = () => {
    this.props.removeChat({ chatId: this.props.id });
  }

  render() {
    const {
      name,
      avatar,
      selected,
      lastMessage
    } = this.props;

    return (
      <div
        onClick={this.handleClick}
        className={`dialog item ${selected ? 'selected' : ''}`}
      >
        <div className='avatar'>
          <img src={avatar} />
        </div>
        <div className='info'>
          <div className='name'>{name}</div>
          <div className='last message'>{lastMessage}</div>
        </div>
        <div
          onClick={this.removeDialog}
          className='close icon'
        />
      </div>
    );
  }
}

export default connect(undefined, actions)(Dialog);

Dialog.propTypes = {
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool,
  removeChat: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  avatar: PropTypes.string.isRequired,
  lastMessage: PropTypes.string.isRequired,
  onClick: PropTypes.func
};

Dialog.defaultProps = {
  selected: false
};
