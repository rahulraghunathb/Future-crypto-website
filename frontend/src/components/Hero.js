import React,{useState} from 'react'
import './Hero.css'
import Crypto from '../assets/hero-img.png'



const Hero = () => {


    const [user,setUser] = useState({
        email:""
    });

    let name , value;
    const handleInputs= (e)=>{
        console.log(e);
        name=e.target.name;
        value=e.target.value;
        
        setUser({...user, [name]:value})

    }


    const PostData= async(e) =>{
        e.preventDefault();

        const{email} = user;

        const res = await fetch('/subscribe',{
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ email})
        
        });

        const data = await res.json();

        if(data.status === 422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else{
            window.alert("Subscribed to the Daily Newsletter!")
            console.log("Subscribed to the Daily Newsletter!")
        }



    } 


    return (
        <div id= 'hero_id' className='hero'>
            <div className='container'>

                {/* Left Side */}
                <div className='left'>
                    <p>Buy & Sell Crypto 24/7 using your retirement account</p>
                    <h1>Invest in Best Cryptocurreny with Us</h1>
                    <p>Buy, Sell, and store hundreds of cryptocurrencies</p>
                    <h2>Subscribe to Our Newsletter</h2>
                    <div className='input-container'>
                        <form action="/subscribe" method="POST">
                        <input type='email'name="email" 
                        value={user.name}
                        onChange = {handleInputs}
                        placeholder='Enter your email address' required />
                                               
                        <button className='btn'type="submit" onClick={PostData}>Subscribe</button>
                        </form>
                    </div>
                </div>


                {/* Right Side */}
                <div className='right'>
                    <div className='img-container'>
                        <img src={Crypto} alt=''/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
