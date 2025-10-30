import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Navbar from './components/Navbar';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Result from './pages/Result';
import { useState } from 'react';
import Details from './pages/Detail';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <> 
    <BrowserRouter>
      <Navbar onSearch={setSearchQuery} />
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </div>
    </BrowserRouter>
    <ToastContainer />
    </>


  );
}
export default App;