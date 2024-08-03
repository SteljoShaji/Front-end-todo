
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Auth from './Components/Auth';


function App() {
  return (
    <>
 <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path='/login' element={<Auth/>}/>
  <Route path='/register' element={<Auth register/>}/>
 </Routes>
    </>
  );
}

export default App;
