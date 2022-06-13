import { useNavigate as useHistory } from "react-router-dom";
import React , {useState, useEffect} from "react";
import * as  yup from "yup";
import axios from "axios";
import {BASE_URL} from '../constants/constants'
import '../App.css'

function Signup() {
  const history = useHistory();

  // Create user
  const [user, setUser] = useState({ 'username':'' , 'email': '', 'password':''})
  //Keep track of errors
  const [errors, setErrors] = useState({ 'username':'' , 'email': '', 'password':''})
  // Enable submission
  const [disabled, setDisabled] = useState(true);
  
  // Define yup schema
  const userSchema = yup.object().shape({
    username: yup.string().min(6).required('Provide a valid username'),
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
        .post(`${BASE_URL}/auth/register`, NewUser)
        .then((response) => {
          console.log('response', response)
          setUser({ username:"",email: "", password: "" });
          history("/login")
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    return (
      <div className='div_login'>
       
       <h1>Fill in the form to join us</h1> 

        <div className='div_form'>
          <form onSubmit={submitFc}>
            <label htmlFor='username' > Username </label>
            <input id="username" 
                  name= 'username'   
                  type = 'text' 
                  placeholder="Type your username"
                  value={user.username}
                  onChange={changeFc}/>
              
              {errors.username.length > 0 ? (
              <p style={{ color: "red" }}>{errors.username}</p>
               ) : null}

            <br></br>
            <br></br>

            <label htmlFor='email' > Email address </label>
            <input id="email" 
                  name= 'email'   
                  type = 'email' 
                  placeholder="user@address.com"
                  value={user.email}
                  onChange={changeFc}/>
              
              {errors.email.length > 0 ? (
              <p style={{ color: "red" }}>{errors.email}</p>
               ) : null}

            <br></br>
            <br></br>


            <label htmlFor='pw' > Password </label>
            <input id="pw" 
                  name= 'password' 
                  type = 'password'
                  placeholder="******"
                  value={user.password}
                  onChange={changeFc}/>

              {errors.password.length > 0 ? (
              <p style={{ color: "red" }}>{errors.password}</p>
               ) : null}

            <br></br>
            <br></br>

            <button type="submit" 
                    disabled = {disabled} 
                    className="button_login" > Create new user </button>

          </form>

          {/* <button className="md-button shop-button" onClick={() => history("/login")}> Now you can login!</button> */}
        </div>
        <br></br>  
        <button className="button_login" 
                  onClick={() => history("/")}>Go home!</button>

      </div>
    );
  }
  
  export default Signup;

  // .matches(
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  // )