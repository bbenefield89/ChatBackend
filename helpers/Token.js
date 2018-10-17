import jwt from 'jsonwebtoken'

class Token {
  constructor(user) {
    this.user = user
    this.secret = process.env.SECRET
  }

  createToken = () => {
    const tokenData = {
      id: this.user.id,
      username: this.user.username,
      picture: this.user.picture
    }

    return jwt.sign(tokenData, this.secret, { expiresIn: '30d' })
  }

  validateToken = token => {
    return jwt.verify(token, this.secret)
  }
}

export default Token