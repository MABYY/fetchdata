import React from "react";
import { useNavigate as useHistory } from "react-router-dom";
import '../App.css'

function Home(props) {


  // history from Hook is the same as props.history. You may use either, but you must use the hook when you don't have access to the react router props.
  const history = useHistory();
  return (
    <div className = 'home_div'>
        <h1 className='div_h1'>Welcome! Create a your profile and start tracking </h1>

        <div className = 'home_div_child'>

              <div className='div_home_left'>
                     <br></br>

                    <button className = 'button_home' onClick={() => history("/signup")}>   Join us!  </button>
                    <p>
                      This webpage is meant to help portfolio managers track the asset allocation of their peer portfolios in Argentina.
                      <br></br>
                    
                      <br></br>
                      The data displayed on this website is retived from the public API built by CAFCI
                      <br></br>
            
                      <br></br>
                      Source: https://www.cafci.org.ar/
                    </p>
              </div>

              <div className="div_home_left">
                <img
                  src='https://picsum.photos/500'
                  alt=""
                />
              </div>
        </div>
    </div>
  );
}

export default Home;