
import './App.scss';
import TableUsers from './components/TableUsers';
import Header from './components/Header';
import Container from 'react-bootstrap/Container';
import { ToastContainer, toast } from 'react-toastify';

function App() {
  
  
  return (
    <div className="App">
      <Header />
      <Container>

        <TableUsers />
      </Container>

      <ToastContainer />
    </div>
  );
}

export default App;
