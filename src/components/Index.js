import React from 'react';
import Navbar from './Navbar'
import API from '../helpers/API'
import { FormControl, InputLabel, Input, FormHelperText, Button, ButtonGroup } from '@material-ui/core'
const initialState = {
  email: '',
  password: '',
  loggedIn: false
}

class Index extends React.Component {
  constructor(props){
    super(props);
    this.state = initialState
  }

  login = (email, jwt) => {
    this.setState({ email, loggedIn: true })
    localStorage.setItem('jwt', jwt)
  }

  logout = () => {
    this.setState(initialState)
    localStorage.removeItem('jwt')
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
          console.log(data)
          this.login(this.state.email, data.jwt)
        }
      })
  }

  onClickSignup = event => {
    event.preventDefault()
    if (!this.state.email || !this.state.password) {
      alert('email and Password fields must both be filled in.')
    } else {
      API.post(API.signupUrl, this.state)
      .then(data => {
          if (data.error) {
            this.setState(initialState)
            alert(data.error)
          } else {
            this.login(this.state.email, data.jwt)
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
         { !this.state.loggedIn && (
          <div>
          <FormControl>
            <InputLabel htmlFor="my-input">Email address</InputLabel>
            <Input onChange={handleChange} type="text" placeholder='email' name="email" value={email} />
            <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Password</InputLabel>
            <Input onChange={handleChange} type="text" placeholder='password' name="password" value={password}/>
          </FormControl>
          <ButtonGroup color="primary" aria-label="outlined primary button group">
            <Button onClick={onClickLogin}>Login</Button>
            <Button onClick={onClickSignup}>Singup</Button>
          </ButtonGroup>
          </div>
         )}
      </div>
    );
  }
}

export default Index;
