import {React, useState} from 'react';
import Modal from 'react-modal';
import {FaGoogle} from 'react-icons/fa'
import './authmodal.css';
import PasswordResetModal from './ForgotPassword';

Modal.setAppElement('#root'); // For accessibility

const AuthModal = ({ isOpen, onClose, selectedForm }) => {
  const isLoginForm = selectedForm === 'login';
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);

  const openPasswordResetModal = () => {
    setIsPasswordResetModalOpen(true);
  };

  const closePasswordResetModal = () => {
    setIsPasswordResetModalOpen(false);
  };

  const handlePasswordReset = () => {
    // Implement your password reset logic here
    // This function will be called when the "Reset Password" button is clicked
    // You can send a reset password email to the entered email address
  };

  return (
    <Modal className='modal_card' isOpen={isOpen} onRequestClose={onClose}>
      <button onClick={onClose} className="close-button">
        <span aria-hidden="true">&times;</span>
      </button>

      <div className="form-container">
        <div className="form">
        <h3  className='form-heading'>{isLoginForm ? '' : ''}Cryp<span className='primary'>to</span></h3>
          <form>
            <div className="form-content">
              {/* {isLoginForm ?  : null} */}
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              {isLoginForm ? <p className="forgot-password " onClick={openPasswordResetModal} >Forgot password?</p> : null}
              {isLoginForm ? <p className="forgot-password">or</p> : <p className="forgot-password">or</p>}
             <button className='button'> <FaGoogle/> {isLoginForm ? 'Sign in with Google':'Sign up with Google'}</button>
              
              <button className='button_2'>{isLoginForm ? 'Login' : 'Register'}</button>
            </div>
          </form>
        </div>
      </div>
      <PasswordResetModal isOpen={isPasswordResetModalOpen} onClose={closePasswordResetModal} onReset={handlePasswordReset} />
    </Modal>
  );
};

export default AuthModal;
