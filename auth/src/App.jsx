import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Signup from './pages/signup/Signup.jsx';
import Login from './pages/login/Login.jsx';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Forgot from './pages/forgot/Forgot.jsx';
import Newpass from './pages/newpass/Newpass.jsx';
import Landing from './pages/landing/landing.jsx';


function App() {

  


  return (
    <>
       <BrowserRouter>
      
        <Routes>

          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/forgot' element={<Forgot/>}/>
          <Route path='/newpass' element={<Newpass/>}/>
          <Route path='/landing' element={<Landing/>}/>





            
        
        </Routes>

    
       </BrowserRouter>

     </>
  )
}

export default App
