import  {useState,useEffect} from "react";
import {BASE_URL} from '../constants/constants'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useNavigate as useHistory } from "react-router-dom";
import {AxiosWithAuth} from '../utils/axiosWithAuth'
import PortfolioDisplay from './portfolioDisplay'
import '../App.css'

function FundLookUp(props) {
        //console.log('PROPSFLUP', Object.keys(props))
        const history = useHistory();
        //const valueDate = props.pickDate
        
        const valDate =   props.pickDate // "08-03-2022"
        //console.log('valDate', valDate,  props.pickDate  )

        // Selected fund
    const [pickFund, setpickFund] = useState('')
    const [fundApi, setfundApi] = useState('')
    const [fundsArray,setfundsArray] = useState([])

    /// FIND FUNDS

    //const fundsArray=[]
    useEffect(() => {   
            const findFund = {'Fecha': valDate}
            //axios
            // .post(`${BASE_URL}/fundsData/selectbydate`, findFund, 
            // {headers: { Authorization: localStorage.getItem('token')}}
            // )
            AxiosWithAuth()
            .post(`${BASE_URL}/fundsData/selectbydate`, findFund)
            .then((response) => {
                //console.log('responseDate', response.data)
                const fundsData =  response.data
                let fundNames = fundsData.map( item =>{return item['Nombre_Fondo']})
               // console.log('fundNames', fundNames)
                setfundsArray(fundNames)
                //console.log('ITWORKS', fundsArray)
            })
            .catch((err) => {
            console.log(err);
            });
        
     }, [valDate]);

///// FIND API

     useEffect(() => {   
             const findFund = {'Fecha': valDate, 'Nombre_Fondo':pickFund }
             AxiosWithAuth()
             .post(`${BASE_URL}/fundsData/select`, findFund)
             .then((response) => {
                 //console.log('findFundAPI', response.data.Api)
                 setfundApi(response.data.Api)
                 //console.log('fundApi', fundApi)
             })
             .catch((err) => {
             console.log(err);
             });
         
      }, [valDate,pickFund]);

   const changeFc = (e) =>{
    setpickFund(e['value'])
    //console.log('pickFund', pickFund)
   }


    return (
        <div >
            <form className='div_form'>         
                <label htmlFor='dropdownlist' > Select a fund </label>
                <div className= 'drop_class'>
                    <Dropdown  id="dropdownlist"
                                options={fundsArray} 
                                value={pickFund} 
                                onChange={changeFc}
                                />  
        </div>
     
            </form> 
      <br></br>

      {/* <PortfolioDisplay/>
   
        {/* <button  className="md-button shop-button" onClick={() =>
            history("/portfolioDisplay")}>Display this fund!</button> */}
        {/* <Link to="/portfolioDisplay" >
                <button  className="md-button shop-button"
                >Display this fund!</button>
            </Link> */}
       {/* <Route path="/portfolioDisplay"  element={ <PortfolioDisplay/>}/>  */}

       <button className="button_sd" onClick={() => {
                                setfundApi('')
                                setpickFund('')
                                setfundsArray([])
                                }}>Select a different fund</button>
      

       { fundApi? <PortfolioDisplay fundApi ={fundApi}/>: null}



        </div>   
    )
}

export default FundLookUp;

//<div><Link to="/portfolioDisplay">Portfolio Display</Link></div>