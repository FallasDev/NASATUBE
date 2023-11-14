import './App.css';
import { Inicio } from './components/inicio';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InicioDetails from './components/InicioDetails';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path='/video' element={<InicioDetails/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
