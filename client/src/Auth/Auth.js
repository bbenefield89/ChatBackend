import auth0 from 'auth0-js'

const redirectUri = process.env.NODE_ENV === 'production' ? 'https://limbochat.herokuapp.com' : 'http://localhost:3000'

class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'bbenefield.auth0.com',
    clientID: 'jFYEg5DbnbQ1yj4ztXT6pFKGK0heeleE',
    redirectUri: redirectUri + '/auth',
    responseType: 'token id_token',
    scope: 'openid profile'
  })

  profile;

  login() {
    this.auth0.authorize()
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        console.log('good')
        this.setSession(authResult);
        // window.location.href = redirectUri + '/chat'
        history.replace(redirectUri + '/chat')
      }
      else if (err) {
        console.log('bad')
        // history.replace('/home');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    window.location.href = redirectUri + '/chat'
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    window.location.href = redirectUri
  }

  isAuthenticated() {
    // Check whether the current time is past the 
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  getAccessToken() {
    const token = localStorage.getItem('access_token')

    if (!token)
      console.log('No access token found')

    return token
  }

  getProfile(cb) {
    let token = this.getAccessToken()

    if (token)
      this.auth0.client.userInfo(token, (err, profile) => {
        if (profile) {
          this.profile = profile
        }

        cb(err, profile)
      })
  }
}

export default Auth