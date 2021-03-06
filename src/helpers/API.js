class Api {
  baseUrl = 'http://localhost:3000/api/v1'
  loginUrl = `${this.baseUrl}/login`
  signupUrl = `${this.baseUrl}/signup`

  headers = () => {
    return {
      "Content-Type": "application/json",
      "Authorization": localStorage.getItem('token')
    }
  }

  responseToJSON = response => response.json()

  get = url => {
    return fetch(url, {
      headers: this.headers()
    })
    .then(this.responseToJSON)
  }

  post = (url, data) => {
    return fetch(url, {
        method: 'POST',
        headers: this.headers(),
        body: JSON.stringify(data)
      })
    .then(this.responseToJSON)
  }

  // destroy = (url, id) => {
  //   return fetch(`${url}/${id}`, {
  //     method: "DELETE",
  //     headers: this.headers()
  //   })
  //   .then(this.responseToJSON)
  // }
}

const API = new Api()

export default API
