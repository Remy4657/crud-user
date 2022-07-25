
import './App.scss';
import TableUsers from './components/TableUsers';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';
import {useContext, useState} from 'react'
import { UserContext } from './context/UserContext';

function App() {
  const { user } = useContext(UserContext);
  console.log('user: ', user)

  return (
    <div className="App">
      <Header />
      <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
            <Route path="/login" element={<Login />}></Route>
          </Routes>

      </Container>

      <ToastContainer />
    </div>
  );
}

export default App;
