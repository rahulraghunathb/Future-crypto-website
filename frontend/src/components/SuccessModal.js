import {React, useState} from 'react';
import './successmodal.css'; // Create a CSS file for styling your modal

const SuccessModal = ({ isOpen, onClose}) => {
    // const [msg, setmsg] = useState('')
  return isOpen ? (
    <div className="success-modal">
      <div className="success-modal-content">
        <h2>Registration Successful!</h2>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null;
};

export default SuccessModal;
