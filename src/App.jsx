import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'
import Banner from './components/HomeComponents/Banner'

function App() {
  

  return (
    <>
      <header className="bg-transparent backdrop-blur-lg w-full mx-auto z-50 sticky top-0">
        <Header></Header>
      </header>
     
      <main className="container mx-auto min-h-screen">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </>
  );
}

export default App
