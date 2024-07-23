import {Component} from 'react'

import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  getAuthentication = async () => {
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const jsonData = JSON.stringify({
      username,
      password,
    })
    const options = {
      method: 'POST',
      body: jsonData,
    }

    const response = await fetch(url, options)
    const data = await response.json()

    return data
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const data = await this.getAuthentication()
    if (username === '') {
      this.setState({username: '', password: '', errorMsg: data.error_msg})
    } else if (password === '') {
      this.setState({username: '', password: '', errorMsg: data.error_msg})
    } else {
      const jwtToken = data.jwt_token

      if (jwtToken === undefined) {
        this.setState({username: '', password: '', errorMsg: data.error_msg})
      } else {
        Cookies.set('jwt_token', jwtToken, {expires: 30})
        const {history} = this.props
        this.setState({username: '', password: ''})
        history.replace('/')
      }
    }
  }

  render() {
    const {username, password, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="login-card">
          <img
            className="website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form onSubmit={this.onSubmitForm} className="form-card">
            <label className="form-label" htmlFor="username">
              USERNAME
            </label>
            <input
              value={username}
              onChange={this.onChangeUsername}
              className="form-input"
              id="username"
              type="text"
              placeholder="Username"
            />
            <label className="form-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              value={password}
              onChange={this.onChangePassword}
              className="form-input"
              id="password"
              type="password"
              placeholder="Password"
            />
            <button className="form-button" type="submit">
              Login
            </button>
            {errorMsg !== '' && <p className="error-msg">{`*${errorMsg}`}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
