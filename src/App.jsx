import MovieDetails from './Pages/MovieDetails';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home.jsx';

function App() {
  
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<MovieDetails/>}/>
      </Routes>
    </>
  )
}

export default App
