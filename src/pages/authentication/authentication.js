import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import SignInModal from 'components/modals/signInModal/signInModal';
import SignUpModal from 'components/modals/signUpModal/signUpModal';
import { withRouter } from 'react-router-dom';
import './authentication.less';

const videoUrl = 'http://sizovleonid.ru/SpaceUp/Img/video/askyfullofstarsmp4.mp4';

class Authentication extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      signInModalOpened: false,
      signUpModalOpened: false
    };
  }

  componentDidMount() {
    if (this.props.token) {
      this.props.history.push('/messages');
    }
  }

  componentDidUpdate() {
    if (this.props.token) {
      this.props.history.push('/messages');
    }
  }

  toggleSignInModal = () => {
    this.setState(prevState => ({
      signInModalOpened: !prevState.signInModalOpened
    }));
  };

  toggleSignUpModal = () => {
    this.setState(prevState => ({
      signUpModalOpened: !prevState.signUpModalOpened
    }));
  };

  render() {
    const { signInModalOpened, signUpModalOpened } = this.state;

    return (
      <React.Fragment>
        <SignInModal
          opened={signInModalOpened}
          toggleModal={this.toggleSignInModal}
        />
        <SignUpModal
          opened={signUpModalOpened}
          toggleModal={this.toggleSignUpModal}
        />
        <section className='ui authorization'>
          <div className='background-text'>
            <img
              alt='logo'
              className='logo'
              src='./assets/logo.png'
            />
            <p className='offer'>Первый messenger с доступом по биометрическим данным</p>
            <div className='actions'>
              <a onClick={this.toggleSignInModal}>Войти</a>
              <a onClick={this.toggleSignUpModal}>Регистрация</a>
            </div>
          </div>
          <div className='background'>
            <div className='dimmer'/>
            <video
              loop
              muted
              autoPlay
              poster='./assets/video-preview.jpg'
              className='background-video'
            >
              <source src={ videoUrl } type='video/mp4'/>
            </video>
            <div className='bg-low'/>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

const stateToProps = state => ({
  token: state.authentication.token
});

export default withRouter(connect(stateToProps)(Authentication));

Authentication.propTypes = {
  token: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
