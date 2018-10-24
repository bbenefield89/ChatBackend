import React from 'react'
import { cleanup, fireEvent, render } from 'react-testing-library'

import SignUpModalHomeForm from './SignUpModalHomeForm'

describe('<SignUpModalHomeForm />', () => {
  it('should return a new user', () => {
    const user = {
      id: 1,
      username: 'User A',
      picture: ''
    }

    const onSubmit = jest.fn(() => user)

    const signUpModalForm = render(
      <SignUpModalHomeForm
        onSubmit={ onSubmit }
        submitValue='Sign Up'
      />
    )

    const { getByPlaceholderText, getByText, getByValue } = signUpModalForm
    
    const signupUsernameInput = getByPlaceholderText(/username/i)
    const signupPasswordInput = getByPlaceholderText(/password/i)
    const signupSubmitBtn = getByValue(/sign up/i)

    const signupUsernameInputValue = {
      target: {
        value: 'User A'
      }
    }

    const signupPasswordInputValue = {
      target: {
        value: '123'
      }
    }

    fireEvent.change(signupUsernameInput, signupUsernameInputValue)
    fireEvent.change(signupPasswordInput, signupPasswordInputValue)

    expect(signupUsernameInput.value).toEqual('User A')
    expect(signupPasswordInput.value).toEqual('123')
    
    fireEvent.click(signupSubmitBtn)

    let { id, ...userParam } = user
    userParam = { ...userParam, password: '123' }
    
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit.mock.calls[0][1]).toEqual(userParam)
    expect(onSubmit()).toBe(user)
  })
})