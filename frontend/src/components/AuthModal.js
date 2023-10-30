import { React, useState } from 'react'
import Modal from 'react-modal'
import { FaGoogle } from 'react-icons/fa'
import './authmodal.css'
import axios from 'axios'
import { useAuth } from './AuthContext'; 
import SuccessModal from './SuccessModal';

Modal.setAppElement('#root') // For accessibility
// let data = null;

const AuthModal = ({ isOpen, onClose, selectedForm }) => {
  const isLoginForm = selectedForm === 'login'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  // const [isRegistrationSuccess, setRegistrationSuccess] = useState(false);
  // const [message, setMessage] = useState('');
  

  const closeModal = () => {
    onClose(); 
  };
  const openSuccessModal = () => {
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };


  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
  
      if (response.status === 200) {
        // setRegistrationSuccess(true);
        openSuccessModal();
        // setMessage('Registration successful!! please login with your credentials');
        // alert('Registration successful!! please login with your credentials');
      } else if (response.status === 400) {
        // setRegistrationSuccess(true);
        // setMessage('Email is already in use please login with your credentials');
        alert('Email is already in use please login with your credentials');
      } else if (response.status === 500) {
        // setMessage('Failed to register user');
        alert('Failed to register user');
      } else {
        // setMessage('An unexpected error occurred');
        alert('An unexpected error occurred');
      }
    } catch (error) {
      // setMessage('Registration failed. Please try again.');
      alert('Registration failed. Please try again.');
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
        // data = await response.json();
        login({ email});
        // alert(`User Email: ${data.email}`);
        closeModal();
        // You can redirect the user to their dashboard or another page here.
      } else if (response.status === 401) {
        alert('Failed to register login')
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
  
  return (
    <Modal className="modal_card" isOpen={isOpen} onRequestClose={onClose}>
        <button onClick={onClose} className="close-button">
        <span aria-hidden="true">&times;</span>
      </button>   
      <SuccessModal isOpen={isSuccessModalOpen} onClose={closeSuccessModal} />
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
    </Modal>
  )
}

export default AuthModal
