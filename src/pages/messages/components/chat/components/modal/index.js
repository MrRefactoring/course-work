import { messagesActions as actions } from 'pages/messages/messagesActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import './modal.less';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.message
    };
  }

  preventClick = (e) => e.stopPropagation();

  changeMessage = (e) => {
    const { value } = e.target;

    this.setState({ message: value });
  }

  editMessage = () => {
    const { message } = this.state;
    const { chatId, messageId } = this.props;

    this.props.editMessage({ message, chatId, messageId });
    this.props.toggle();
  }

  render() {
    const {
      opened,
      toggle
    } = this.props;

    if (!opened) {
      return null;
    }

    return (
      <div
        onClick={toggle}
        className='edit modal'
      >
        <div
          onClick={this.preventClick}
          className='content'
        >
          <div className='header'>
            Редактировать сообщение
          </div>
          <div className='in'>
            <input
              onChange={this.changeMessage}
              value={this.state.message}
            />
          </div>
          <div className='actions'>
            <div onClick={this.editMessage} className='close'>
                Save
            </div>
            <div onClick={toggle} className='close'>
                Close
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(undefined, actions)(Modal);

Modal.propTypes = {
  opened: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  editMessage: PropTypes.func.isRequired,
  chatId: PropTypes.string.isRequired,
  messageId: PropTypes.string.isRequired
};
