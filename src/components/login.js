import { useNavigate as useHistory } from "react-router-dom";
import React , {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";
import {BASE_URL} from '../constants/constants'


function Login(props) {
  const history = useHistory();

  // Create user
  const [user, setUser] = useState({ 'email': '', 'password':''})
  //Keep track of errors
  const [errors, setErrors] = useState({  'email': '', 'password':''})
  // Enable submission
  const [disabled, setDisabled] = useState(true);

  // Enable submission
  const [welcomeMessage, setwelcomeMessage] = useState([]);
  
  // Define yup schema
  const userSchema = yup.object().shape({
    email: yup.string().email().required('Provide a valid email'),
    password: yup.string().min(6).required('Provide a valid password, min 6 charaters'),
  })

 // Function that takes the userSchema and validates the data provided by the user
  const setFormErrors = (name, value) => {
    yup
    .reach(userSchema, name)
    .validate(value)
    .then((valid) => {
      //console.log('valid', valid)
      setErrors({ ...errors, [name]: "" });
    })
    .catch((err)=>{
      //console.log("errooorrsss", err.errors);
      setErrors({...errors, [name]: err.errors[0]})
    })
  }

  const changeFc = (e)=>{
    setUser({...user,[e.target.name] :e.target.value.toString()});  // save data of new user
    setFormErrors( e.target.name, e.target.value.toString()) // perform yup validation function
  }

    // Once the data is valid allow the user to submit the form
    useEffect(() => {   
      userSchema.isValid(user).then((valid) => setDisabled(!valid));   
    }, [userSchema, user]);

    const submitFc = (e) => {
      e.preventDefault();
      const NewUser = { ...user }
      axios
        .post(`${BASE_URL}/auth/login`, NewUser)
        .then((response) => {

          localStorage.setItem('token',response.data.token) // save token
          setwelcomeMessage(response.data.message) 
          setUser({email: "", password: "" });
          history("/selectData")
          
        })
        .catch((err) => {
      
          setwelcomeMessage(err.response.data.message) 
          console.log(err.response.data.message);
          
        });
    };
    
    return (
      <div  className = 'div_login'>
        
        <h1>Welcome back!</h1> 

        <div className='div_form'>
          <form onSubmit={submitFc}>

            <label htmlFor='email' > Email address: </label>
            <input id="email" 
                  name= 'email'   
                  type = 'email' 
                  value={user.email}
                  placeholder="user@address.com"
                  onChange={changeFc}/>
              
              {errors.email.length > 0 ? (
              <p style={{ color: "red" }}>{errors.email}</p>
               ) : null}

            <br></br>
            <br></br>

            <label htmlFor='pw' > Password: </label>
            <input id="pw" 
                  name= 'password' 
                  type = 'password'
                  value={user.password}
                  placeholder="******"
                  onChange={changeFc}/>

              {errors.password.length > 0 ? (
              <p style={{ color: "red" }}>{errors.password}</p>
               ) : null}

            <br></br>
            <br></br>

            <button className="button_login"  
                     type="submit" 
                     disabled = {disabled}> Join again! </button>

          </form>

          {welcomeMessage.length > 0? (
              <p style={{ color: "red" }}>{welcomeMessage}</p>
               ) : null}
        </div>
        <br></br>
        <button className="button_login" 
                onClick={() => history("/")}>Go home!</button>
      </div>
    );
  }
  
  export default Login;