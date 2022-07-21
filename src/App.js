
import './App.scss';
import TableUsers from './components/TableUsers';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';
import Home from './components/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {


  return (
    <div className="App">
      <Header />
      <Container>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUsers />} />
           
          </Routes>

      </Container>

      <ToastContainer />
    </div>
  );
}

export default App;
