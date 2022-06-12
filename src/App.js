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
        <ul className="nav_bar">

          <li><Link to="/">Home</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/login">Log in</Link></li>
          
            {
              (localStorage.getItem('token')) &&
              <li><Link to="/selectData">Select Fund</Link></li>
              }
       
          {/* <div><Link to="/portfolioDisplay">Portfolio Display</Link></div> */}
          <li><Link  to="/logout"  
                    onClick ={hadleLogout} 
                    >Logout</Link></li>
     
        </ul>
        
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