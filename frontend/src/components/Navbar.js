import React, {useState} from 'react'
import {FaBars, FaTimes} from 'react-icons/fa'
import './Navbar.css'
import AuthModal from './AuthModal';

const Navbar = () => {
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
                <button className='button_2' onClick={() => openModal('login')}>Login</button>
                    </ul>
                <ul>
                <button  className='button_2' onClick={() => openModal('register')}>Register</button>
                </ul>
                    {/* <button className='btn'>Connect Wallet</button> */}
                </div>
            </div>
            <AuthModal isOpen={isModalOpen} onClose={closeModal} selectedForm={selectedForm} />
        </div>
    )
}

export default Navbar
