
import './App.scss';
import TableUsers from './components/TableUsers';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './components/Login';

function App() {


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
