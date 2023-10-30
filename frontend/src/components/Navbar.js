import React, {useState} from 'react'
import {FaBars, FaTimes, FaSignOutAlt} from 'react-icons/fa'
import './Navbar.css'
import AuthModal from './AuthModal';
import { useAuth } from './AuthContext';

const Navbar = () => {
const { user, logout } = useAuth();
const [click, setClick] = useState(false)
const handleClick = () => setClick(!click)
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedForm, setSelectedForm] = useState(null);

const openModal = (form) => {
  setSelectedForm(form);
  setIsModalOpen(true);
};

const closeModal = () => {
  setSelectedForm(null);
  setIsModalOpen(false);
};
const handleLogout = () => {
    logout();
  };


    return (
        <div className='header'>
            <div className='container'>
            <div className='hamburger' onClick={handleClick}>
                    {click ? (<FaTimes size={20} style={{color: '#333'}}/>) : (<FaBars size={20} style={{color: '#333'}} />)}
                    
                </div>
                <h1>Cryp<span className='primary'>to</span></h1>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li>
                        <a href='#hero_id'>Home</a>
                    </li>
                    <li>
                        <a href='#feat_id'>Featured</a>
                    </li>
                    <li>
                        <a href='#sign_id'>Earn</a>
                    </li>
                    <li>
                        <a href='#form_id'>Coins</a>
                    </li>
                    <li>
                        <a href='#foot_id'>Contact</a>
                    </li>
                </ul>
                <div className='button_div'>
                <ul>
                    {user && user.email ? ( 
                        <p className='user'>{user.email.split('@')[0]}</p>
                ) : (
                    <button className='button_2' onClick={() => openModal('login')}>Login</button>
                 )}
                </ul>
                <ul>
                    {user && user.email ? ( 
                      <button className='logout' onClick={handleLogout}>
                          <FaSignOutAlt /> logout
                      </button>
                ) : (
                  <button  className='button_2' onClick={() => openModal('register')}>Register</button>
                 )}
                </ul>
                    {/* <button className='btn'>Connect Wallet</button> */}
                </div>                 
            </div>
            <AuthModal isOpen={isModalOpen} onClose={closeModal} selectedForm={selectedForm} />
        </div>
    )
}

export default Navbar