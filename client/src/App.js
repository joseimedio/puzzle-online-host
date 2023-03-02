import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PlayGame from './components/PlayGame';
import NewPuzzle from './components/NewPuzzle';
import NewPuzzle2 from './components/NewPuzzle2';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PlayGame />}/>
        <Route path='/new' element={<NewPuzzle/>} />
        <Route path='/new2' element={<NewPuzzle2/>} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
