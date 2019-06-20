import Modal from './modal';
import PropTypes from 'prop-types';
import React from 'react';
import './message.less';

class Message extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false
    };
  }

  toggleModal = () => this.setState(prevState => ({ modalIsOpen: !prevState.modalIsOpen }))

  render() {
    return (
      <React.Fragment>
        <Modal
          opened={this.state.modalIsOpen}
          toggle={this.toggleModal}
          message={this.props.message}
          chatId={this.props.chatId}
          messageId={this.props.messageId}
        />
        <div className='flex'>
          <div className={`ui message ${this.props.your ? '' : 'your'}`}>
            {this.props.message}
          </div>
          {
            this.props.your
            && <div
              className='icon'
              onClick={this.toggleModal}
            >
          ✏️
            </div>
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Message;

Message.propTypes = {
  message: PropTypes.string.isRequired,
  messageId: PropTypes.string.isRequired,
  your: PropTypes.bool.isRequired,
  chatId: PropTypes.string.isRequired
};

Message.defaultProps = {
  youMessage: false
};
