import { React, useState } from 'react'
import Modal from 'react-modal'
import { FaGoogle } from 'react-icons/fa'
import './authmodal.css'
import PasswordResetModal from './ForgotPassword'
import axios from 'axios'

Modal.setAppElement('#root') // For accessibility

const AuthModal = ({ isOpen, onClose, selectedForm }) => {
  const isLoginForm = selectedForm === 'login'
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegistration = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (response.status === 200) {
        alert('Registration successful!! please login with your credentials')
        // You can redirect the user to their profile or another page here.
      } else if (response.status === 400) {
        alert('Email is already in use please login with your credentials')
      } else if (response.status === 500) {
        alert('Failed to register user')
      } else {
        alert('An unexpected error occurred')
      }
    } catch (error) {
      alert('Registration failed. Please try again.')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (response.status === 200) {
        // Successful login
        alert('Login successful')
        // You can redirect the user to their dashboard or another page here.
      } else if (response.status === 401) {
        alert('Failed to register user')
      }
    } catch (error) {
      alert('Login failed. Please try again.')
    }
  }

  // const handleGoogleSignIn = async () => {
  //   try {
  //     const response = await axios.get('/auth/google');
  //     window.location.href = response.data.authUrl;
  //   } catch (error) {

  //     console.error('Google authentication error:', error);
  //   }
  // };
  const handleGoogleSignIn = async () => {
    try {
      const response = await fetch('/auth/google', {
        method: 'GET'
      })

      if (response.status === 200) {
        const data = await response.json()
        window.location.href = data.authUrl
      } else {
        console.error('Google authentication error')
      }
    } catch (error) {
      console.error('Google authentication error:', error)
    }
  }
  // const handleLogout = () => {
  //   // Handle user logout, e.g., by making an API request to log the user out
  //   // ...

  //   // After successful logout, set isAuthenticated to false
  //   setIsAuthenticated(false);
  // };

  const openPasswordResetModal = () => {
    setIsPasswordResetModalOpen(true)
  }

  const closePasswordResetModal = () => {
    setIsPasswordResetModalOpen(false)
  }

  const handlePasswordReset = () => {
    // Implement your password reset logic here
    // This function will be called when the "Reset Password" button is clicked
    // You can send a reset password email to the entered email address
  }

  return (
    <Modal className="modal_card" isOpen={isOpen} onRequestClose={onClose}>
      <button onClick={onClose} className="close-button">
        <span aria-hidden="true">&times;</span>
      </button>
      <div className="form-container">
        <div className="form">
          <h3 className="form-heading">
            {isLoginForm ? '' : ''}Cryp<span className="primary">to</span>
          </h3>
          <form>
            <div className="form-content">
              {/* {isLoginForm ?  : null} */}
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {isLoginForm ? (
                <p
                  className="forgot-password "
                  onClick={openPasswordResetModal}
                >
                  Forgot password?
                </p>
              ) : null}
              {isLoginForm ? (
                <p className="forgot-password">or</p>
              ) : (
                <p className="forgot-password">or</p>
              )}
              {/* <button className='button'onClick={handleGoogleSignIn}> <FaGoogle/> {isLoginForm ? 'Sign in with Google':'Sign up with Google'}</button> */}
              <button onClick={handleGoogleSignIn}>Login with Google</button>
              <button
                className="button_2"
                onClick={isLoginForm ? handleLogin : handleRegistration}
              >
                {isLoginForm ? 'Login' : 'Register'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <PasswordResetModal
        isOpen={isPasswordResetModalOpen}
        onClose={closePasswordResetModal}
        onReset={handlePasswordReset}
      />
    </Modal>
  )
}

export default AuthModal
