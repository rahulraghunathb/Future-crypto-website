import React from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Featured from "./components/Featured"
import Signup from "./components/Signup"
import Footer from "./components/Footer"
import Form from "./components/form"

function App() {
  return <>
    <Navbar/>
    <Hero/>
    <Featured/>
    <Signup/>
    <Form/>
    <Footer/>
  </>
}

export default App;
