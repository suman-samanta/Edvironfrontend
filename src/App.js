
import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from "./context/Context";
import Home from './pages/home/index';
import Login from './pages/Login/index';
import Signup from './pages/signup/index';
import DisburseAmount from './pages/disburseamount/index';

function App() {
  const { user } = useContext(Context);
 
  return (
   <>
   <Routes>
    <Route path='/' element={(user&&user.role==='admin') ? <Home/>:<Login/>} />
    <Route path='/login' element={(user&&user.role==='admin')?<Home/>:<Login/>}/>
    <Route path='/signup' element={(user&&user.role==='admin')?<Home/>:<Signup/>}/>
    <Route path='/disburstfunds' element={(user&&user.role==='admin')?<DisburseAmount/>:<Login/>}/>
   </Routes>

   </>
  );
}

export default App;
