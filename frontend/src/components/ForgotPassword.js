import React from 'react';
import Modal from 'react-modal';

const PasswordResetModal = ({ isOpen, onClose, onReset }) => {
  return (
    <Modal className='modal_card' isOpen={isOpen} onRequestClose={onClose}>
      <button onClick={onClose} className="close-button">
        <span aria-hidden="true">&times;</span>
      </button>

      <div className="form-container">
        <div className="form">
          <h3 className='form-heading'>Forgot Password?</h3>
          <form>
            <div className="form-content">
              <input type="email" placeholder="Enter your email" />
              <button className='button' onClick={onReset}>Reset Password</button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default PasswordResetModal;
