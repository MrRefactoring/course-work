import { authenticationActions as actions } from 'pages/authentication/authenticationActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import WebcamCanvas from 'components/webcamCanvas/webcamCanvas';
import './signInModal.less';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignInModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFaceLogin: true,
      email: '',
      password: '',

      error: '',
      showError: false,

      valid: false,
      emailValid: true,
      passwordValid: true,
    };
  }

  onSignIn = () => {
    const { email, password } = this.state;

    this.props.signIn({ email, password });
  }

  preventClick = (e) => e.stopPropagation();

  toggleSimpleLogin = () => {
    this.setState(prevState => ({
      isFaceLogin: !prevState.isFaceLogin
    }));
  }

  validate = () => {
    const { email, password } = this.state;

    const emailValid = emailRegex.test(email) || email === '';
    const passwordValid = password.length >= 8 || password === '';

    let error = '';

    if (!emailValid) {
      error = 'Введите действительный email';
    } else if (!passwordValid) {
      error = 'Пароль должен быть длины 8 или более';
    }

    this.setState({
      valid: email && password && emailValid && passwordValid,
      emailValid,
      passwordValid,
      error,
      showError: !!error
    });
  }

  onChange = (e) => {
    const { name, value } = e.target;

    this.props.resetError();

    this.setState({
      [name]: value
    }, this.validate);
  }

  render() {
    const { opened, toggleModal, errorMessage, loader } = this.props;
    const {
      isFaceLogin,
      email,
      password,
      valid,
      emailValid,
      passwordValid,
      error,
      showError
    } = this.state;

    return (
      <div
        onClick={toggleModal}
        className={`sign-in modal ${opened ? 'opened' : ''}`}
      >
        <div className='content' onClick={this.preventClick}>
          {
            !isFaceLogin
            && <div
              className='action button icon-left left top'
              onClick={this.toggleSimpleLogin}
            />
          }
          <div className={`loader ${loader && !isFaceLogin ? 'show' : ''}`}/>
          <div
            className='action button icon-cancel right top'
            onClick={toggleModal}
          />
          {
            isFaceLogin
            && <div className='face login'>
              <WebcamCanvas opened={opened} />
              <div
                className='control panel'
                onClick={this.toggleSimpleLogin}
              >
                <span>Вход по паролю</span>
              </div>
            </div>
          }
          {
            !isFaceLogin
            && <div className='classic login'>
              <div className={`status bar ${showError || errorMessage ? 'open error' : ''}`}>
                { error || errorMessage }
              </div>
              <form className='signin form'>
                <h2 className='title'>Вход</h2>
                <div className={`field ${emailValid ? '' : 'error'}`}>
                  <label htmlFor='email'>E-mail</label>
                  <input
                    id='email'
                    name='email'
                    type='text'
                    value={email}
                    onChange={this.onChange}
                  />
                </div>
                <div className={`field ${passwordValid ? '' : 'error'}`}>
                  <label htmlFor='password'>Пароль</label>
                  <input
                    id='password'
                    name='password'
                    type='password'
                    value={password}
                    onChange={this.onChange}
                  />
                </div>
                <div
                  onClick={valid ? this.onSignIn : undefined}
                  className={`submit ${valid ? 'valid' : ''}`}
                >
                  <a>Войти</a>
                </div>
              </form>
            </div>
          }
        </div>
      </div>
    );
  }
}

const stateToProps = state => ({
  loader: state.authentication.loader,
  errorMessage: state.authentication.errorMessage
});

export default connect(stateToProps, actions)(SignInModal);

SignInModal.propTypes = {
  errorMessage: PropTypes.string,
  signIn: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  opened: PropTypes.bool.isRequired,
  resetError: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};
