

import Display from './components/Display'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import './components/interceptors/axios';

import Login from './components/Login';
// import Home from './components/Home';
import Signup from './components/Signup'
import Faq from './components/FAQ/Faq'
import { ShieldCheckIcon } from '@heroicons/react/24/solid';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element = {<Signup />} />
          <Route path="/" element = {<Display /> } />
          <Route path="/FAQ" element = {<Faq />} />
          {/* <Route path = "/signup" element = {<Signup />} /> */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;

