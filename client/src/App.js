import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PlayGame from './components/PlayGame';
import CreatePuzzle from './components/CreatePuzzle';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/play' element={<PlayGame />}/>
        <Route path='/' element={<CreatePuzzle/>} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
