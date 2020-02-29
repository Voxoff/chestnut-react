import React from 'react';
import Navbar from './Navbar'
import API from '../helpers/API'

const initialState = {
  email: '',
  password: ''
}

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState
  }

  login = (email, token) => {
    this.setState({ email })
    localStorage.setItem('token', token)
  }

  logout = () => {
    this.setState(initialState)
    localStorage.removeItem('token')
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value })

  onClickLogin = e => {
    e.preventDefault()
    API.post(API.loginUrl, this.state)
      .then(data => {
        if (data.error) {
          this.setState(initialState)
          alert(data.error)
        } else {
          this.login(this.state.email, data.token)
        }
      })
  }

  onClickSignup = event => {
    event.preventDefault()
    if (!this.state.email || !this.state.password) {
      alert('email and Password fields must both be filled in.')
    } else {
      console.log(this.state)
      API.post(API.signupUrl, this.state)
      .then(data => {
          if (data.error) {
            this.setState(initialState)
            alert(data.error)
          } else {
            this.login(this.state.email, data.token)
          }
        })
    }
  }

  render() {
    const { email, password } = this.state
    const { handleChange, onClickLogin, onClickSignup } = this
    return (
      <div className="App">
        <Navbar />
         <form>
            <div className="homepage-form-inputs">
              <input onChange={handleChange} type="text" placeholder='email' name="email" value={email} />
              <input onChange={handleChange} type="password" placeholder='Password' name="password" value={password} />
            </div>
            <div className="homepage-form-buttons">
              <button onClick={onClickLogin}>Login</button>
              <button onClick={onClickSignup}>Sign Up</button>
            </div>
          </form>
      </div>
    );
  }
}

export default Index;
