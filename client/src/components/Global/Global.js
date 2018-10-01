import React, { createContext, Component } from 'react'
import io from 'socket.io-client'

export const Store = createContext()

class Global extends Component {
  constructor(props) {
    super(props)

    this.state = {
      socketURL: 'http://localhost:3001'
    }

    this.socket = io(this.state.socketURL)
  }
  

  setSocketURL = () => {
    const { NODE_ENV } = process.env

    if (NODE_ENV === 'production')
      this.setState({
        socketURL: 'https://evening-headland-92725.herokuapp.com/'
      })
  }

  componentDidMount() {
    this.setSocketURL()
  }

  render() {
    return (
      <Store.Provider
        value={{
          state: this.state,
          socket: this.socket
        }}
      >
        { this.props.children }
      </Store.Provider>
    )
  }
}

export default Global