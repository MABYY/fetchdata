import  {useState,useEffect} from "react";
import {BASE_URL} from '../constants/constants'
import Dropdown from 'react-dropdown';
import {AxiosWithAuth} from '../utils/axiosWithAuth'
import PortfolioDisplay from './portfolioDisplay'


function FundLookUp(props) {
        const valDate =   props.pickDate // "08-03-2022"

        // Selected fund
    const [pickFund, setpickFund] = useState('')
    const [fundApi, setfundApi] = useState('')
    const [fundsArray,setfundsArray] = useState([])

    /// FIND FUNDS

    useEffect(() => {   
            const findFund = {'Fecha': valDate}
            //axios
            // .post(`${BASE_URL}/fundsData/selectbydate`, findFund, 
            // {headers: { Authorization: localStorage.getItem('token')}}
            // )
            AxiosWithAuth()
            .post(`${BASE_URL}/fundsData/selectbydate`, findFund)
            .then((response) => {
                const fundsData =  response.data
                let fundNames = fundsData.map( item =>{return item['Nombre_Fondo']})
                setfundsArray(fundNames)
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
                 setfundApi(response.data.Api)
             })
             .catch((err) => {
             console.log(err);
             });
         
      }, [valDate,pickFund]);

   const changeFc = (e) =>{
    setpickFund(e['value'])
   }


    return (
        <div >
            <form className="div_form">         
                <label htmlFor='dropdownlist' > Select a fund 
                    <Dropdown  id="dropdownlist"
                                options={fundsArray} 
                                value={pickFund} 
                                onChange={changeFc}
                                /> 
                </label>
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
