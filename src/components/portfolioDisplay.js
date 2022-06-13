import axios from 'axios'
import React , {useEffect, useState} from "react";
import { useNavigate as useHistory } from "react-router-dom";
import AssetDyData from './AssetsDyData'
import DynamicTable from './DynamicTable'
import '../App.css'

function PortfolioDisplay(props){

  const history = useHistory();

  const {fundApi} = props

  console.log('fundApi' ,fundApi)

  const [fundDisplay, setfundDisplay] = useState({})
  const [DTPortfolio, setDTPortfolio] = useState([])
  

    useEffect(() => {   
      axios
      .get(`https://api.cafci.org.ar/interfaz/semanal/resumen/cartera/${fundApi}`)
      .then((response) => {
        const result = response.data.data[0].dataXML

        setDTPortfolio(result['Detalle']['Grupo'])

        const newData = {
                fundName : result['Cabecera'].FondoNombre,
                currency: result['Cabecera'].Moneda,
                classFund : result['Cabecera'].Clasificacion,
                valDate: result['Cabecera'].FechaReporte,
                company: result['Cabecera'].SGNombre,
                fundAUM : result['Pie'].PieValor
            }
          
          setfundDisplay(newData)
          

         })
         .catch((err) => {
           console.log(err);
         });
        
    }, [fundApi]);
    
    return (
        <div>
          
          <h2>Portfolio Data</h2>
                <ul>
                    <li>Fund Name : {fundDisplay.fundName}</li>
                    <li>Class Fund: {fundDisplay.classFund}</li>
                    <li> Currency: {fundDisplay.currency}</li>
                    <li>Valuation Date: {fundDisplay.valDate}</li>
                    <li>Asset Manager: {fundDisplay.company}</li>
                </ul>

                <h2>Portfolio Allocation</h2>
            <div>
                { DTPortfolio.length>0 ? <DynamicTable portfolio={DTPortfolio} /> : null }
            </div>

            <div>
               { DTPortfolio.length>0 ? <AssetDyData portfolio={DTPortfolio} /> : null }
               </div>
            
        </div>
    )
}

export default PortfolioDisplay;