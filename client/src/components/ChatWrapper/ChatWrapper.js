import React from 'react'

import ChatForm from './ChatForm'
import ChatMessagesList from './ChatMessagesList'
import { Store } from '../Global/Global'

const ChatWrapper = props => {
  return (
    <Store.Consumer>
      {context => {
        return (
          <React.Fragment>
            <ChatMessagesList { ...context } />
            <ChatForm { ...context } />
          </React.Fragment>
        )
      }}
    </Store.Consumer>
  );
}
 
export default ChatWrapper