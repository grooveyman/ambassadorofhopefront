import React from 'react';
import logo from './logo.svg';
import './App.css';
import Registration from './pages/Registration';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <Registration />
      <ToastContainer position='top-right' autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}

export default App;
