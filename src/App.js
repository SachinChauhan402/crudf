import './App.css';
import Create from './components/Create';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Read from './components/Read';
import Update from './components/Update';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Create />} />
        <Route exact path="/all" element={<Read />} />
        <Route exact path="/:id" element={<Update />} />
      </Routes>

    </div>
  );
}

export default App;
