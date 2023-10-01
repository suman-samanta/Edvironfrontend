
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from "./context/Context";
import Home from './pages/home/index';
import Login from './pages/Login/index';
import Signup from './pages/signup/index';

function App() {
  const { user } = useContext(Context);
 
  return (
   <>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
   </Routes>

   </>
  );
}

export default App;
