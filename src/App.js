import './App.css';
import { BrowserRouter, Route, Routes , Link } from "react-router-dom";
import {useState} from 'react'
import Home from './components/home.js'
import Login from './components/login.js'
import Signup from './components/signup.js'
import SelectData  from './components/selectData';
import Logout from './components/logout'
//import PortfolioDisplay from './components/portfolioDisplay'
import Protected from './components/Protected'

function App() {
 
  const [tokenid , setTokenid] = useState(localStorage.getItem('token'))

  const hadleLogout = () => {
    localStorage.removeItem('token')
    setTokenid('')
  }

  return (
    
    <div >
       <BrowserRouter>
        <nav className="nav_bar">

          <div className='navbar_div'><Link to="/">Home</Link></div>
          <div  className='navbar_div'><Link to="/signup">Sign up</Link></div>
          <div  className='navbar_div'><Link to="/login">Log in</Link></div>
          
            {
              (localStorage.getItem('token')) &&
              <div  className='navbar_div'><Link to="/selectData">Select Fund</Link></div>
              }
       
          {/* <div><Link to="/portfolioDisplay">Portfolio Display</Link></div> */}
          <div  className='navbar_div'><Link  to="/logout"  onClick ={hadleLogout} >Logout</Link></div>
     
        </nav>
        
        <Routes>

          <Route path="/"  element={<Home/>}/>
          <Route path="/signup"  element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/selectData" element={<Protected><SelectData/></Protected>}/>
  
          {/* <Route path="/selectData" element={<SelectData/>}/> */}
          {/* <Route path="/portfolioDisplay"  element={ <PortfolioDisplay fundApi={fundApi}/>}/> */}
          <Route path="/logout" element={ <Logout/>}/>

        </Routes>

      </BrowserRouter>
    </div>
    
  );
}

export default App;

//https://www.makeuseof.com/create-protected-route-in-react/

// {/* <Route path="/selectData" element={
//   <Protected isLoggedIn={tokenid}><SelectData />
//   </Protected>
//   }/> */}