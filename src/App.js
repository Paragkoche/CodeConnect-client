import {React, useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LandingPage from './Components/LandingPage';
import authservice from './appwrite/auth';
import Landing from './Compiler/Landing'
import SignUp from './Components/Modals/SignUp';
import Login1 from './Components/Modals/Login1'
import Footer from './Components/Footer';
import {login,logout} from './store/authSlice'
import { Home } from 'lucide-react';

function App() {

const {loading, setloading} = useState(true)
const dispatch = useDispatch()

// useEffect(() => {
//   authservice.getcurrentUser()
//   .then((userData) => {
//     if(userData){
//       dispatch(login({userData}))
//     }else{
//       dispatch(logout())
//     }
//   })
//   .finally(() => setloading(false))
// }, [])
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login1/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/landing' element={<Landing />}/>
      </Routes>
    </Router>
  );
}

export default App;
