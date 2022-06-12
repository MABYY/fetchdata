import React , {useState} from "react";
// import {BASE_URL} from '../constants/constants'
// import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import FundLookUp from "./fundLookUp";
import 'react-dropdown/style.css';



function SelectData(props) {
    const [pickDate, setpickDate] = useState()

    //const valDate = "08-03-2022" ///////////// CHANGE TO MAKE DAYS DYNAMIC

//const [disabled, setDisabled] = useState(true)

const changeFc = (e) =>{
        const yr = e.target.value.split('-')[0]
        const day = e.target.value.split('-')[2]
        const month = e.target.value.split('-')[1]
        const newDate = day+'-'+month+'-'+yr
        setpickDate(newDate) ///////////// CHANGE TO MAKE DAYS DYNAMIC
        //setpickDate(valDate)  ///////////// CHANGE TO MAKE DAYS DYNAMIC

    }

    return (

        <div  className= 'div_login'>
            <form className='div_form'>
                <label htmlFor='date' > Pick date to retrive  </label>
                <input id="date" 
                  name= 'date'   
                  type = 'date' 
                  onChange={changeFc}
                  />      
            </form>
            <br></br>
          

        <FundLookUp pickDate={pickDate}/>     
         
        </div> 
    )
}

export default SelectData;