import { authenticationActions as actions } from 'pages/authentication/authenticationActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import './signUpModal.less';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class SignUpModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',

      formValid: false,
      emailValid: true,
      passwordValid: true,

      showPassword: false,

      error: '',
      showError: false
    };
  }

  onSignUp = () => {
    const { firstName, lastName, email, password, formValid } = this.state;

    if (!formValid) {
      this.setState({
        error: 'Форма заполнена неправильно',
        showError: true
      });
    }

    this.props.signUp({ firstName, lastName, email, password });
  }

  stopClick = (e) => e.stopPropagation();

  togglePassword = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword
    }));
  }

  onChange = (e) => {
    const { name, value } = e.target;

    this.props.resetError();

    this.setState({
      [name]: value,
      showError: false,
      error: ''
    }, this.validate);
  }

  validate = () => {
    const { firstName, lastName, email, password } = this.state;

    const emailValid = emailRegex.test(email) || email === '';
    const passwordValid = password.length >= 8 || password === '';

    let error = '';

    if (!emailValid) {
      error = 'Введите действительный email';
    } else if (!passwordValid) {
      error = 'Пароль должен быть длины 8 или более';
    }

    this.setState({
      formValid: firstName && lastName && emailValid && passwordValid && email && password,
      emailValid,
      passwordValid,
      error,
      showError: !!error
    });
  }

  render() {
    const { opened, toggleModal, errorMessage, loader } = this.props;
    const {
      firstName,
      lastName,
      email,
      password,

      formValid,
      emailValid,
      passwordValid,

      showPassword,

      error,
      showError
    } = this.state;

    return (
      <div
        onClick={toggleModal}
        className={`sign-up modal ${opened ? 'opened' : ''}`}
      >
        <div className='content' onClick={this.stopClick}>
          <div
            className='action icon-cancel button right'
            onClick={toggleModal}
          />
          <div className={`status bar ${showError || errorMessage ? 'open error' : ''}`}>
            { error || errorMessage }
          </div>
          <div className={`loader ${loader ? 'show' : ''}`}/>
          <form className='signup form'>
            <h2 className='title'>Регистрация</h2>
            <div className='flex'>
              <div className='field half'>
                <label htmlFor='name'>Имя</label>
                <input
                  id='name'
                  name='firstName'
                  type='text'
                  value={firstName}
                  onChange={this.onChange}
                />
              </div>
              <div className='field half'>
                <label htmlFor='lastname'>Фамилия</label>
                <input
                  id='lastname'
                  name='lastName'
                  type='text'
                  value={lastName}
                  onChange={this.onChange}
                />
              </div>
            </div>
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
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={this.onChange}
              />
              <span onClick={this.togglePassword} className='toggle password'>{showPassword ? <div className='icon-eye'/> : <div className='icon-eye-off'/>}</span>
            </div>
            <div
              onClick={formValid ? this.onSignUp : undefined}
              className={`submit ${formValid ? 'valid' : ''}`}
            >
              <a>Зарегистрироваться</a>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const stateToProps = state => ({
  loader: state.authentication.loader,
  errorMessage: state.authentication.errorMessage
});

export default connect(stateToProps, actions)(SignUpModal);

SignUpModal.propTypes = {
  errorMessage: PropTypes.string,
  signUp: PropTypes.func.isRequired,
  loader: PropTypes.bool.isRequired,
  opened: PropTypes.bool.isRequired,
  resetError: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired
};
