import PieChart from './pieChart'
import '../App.css'

function DynamicTable(props){

  const { portfolio }= props

  let portfolioArray = []
  let chartLabels = []
  let chartSeries = []
  let others = 0

  const assetClass = ["Derivados y Opciones" ,
                      "Titulos de Deuda en Dolar Estadounidense",
                      "Titulos de Deuda en Peso Argentina",
                      "Vehiculos Inversion Colectiva Argentina"]

  for(let i=0; i<portfolio.length; i++){

      let name = portfolio[i]['GrupoNombre']
      let value = portfolio[i]['GrupoValor']
       assetClass.includes(name) 

      portfolioArray.push({AssetClass: name, Allocation: value})   
      if(name !== 'Pasivos' && name !== 'Derivados y Opciones'){
          others = others+ Number(value)
          chartLabels.push(name)
          chartSeries.push(Math.round(Number(value)*100)/100)
     }
 }

  chartLabels.push('Others')
  chartSeries.push(Math.round((100 - others)*100)/100)


  // get table column
  const column = Object.keys(portfolioArray[0]);
 
  // get table heading data
  const ThData =()=>{
      
      return column.map((data,key)=>{
          return <th key={key}>{data}</th>
      })
  }
  // get table row data
  const tdData =() =>{
    //console.log('COLUMNSSSSSSSSS', portfolioArray)
      return portfolioArray.map((data,key)=>{
        return(
            <tr key={key}>
                  {
                    column.map((v,key)=>{
                        return <td key={key}>{data[v]}</td>
                    })
                  }
            </tr>
        )
      })
  }
  return (
      <>
          <table className="table">
            <thead>
              <tr>{ThData()}</tr>
            </thead>
            <tbody>
              {tdData()}
            </tbody>
        </table>
        
        <br></br>
        <br></br>

        <PieChart labels={chartLabels} series={chartSeries}/>       
      </>

  )
}
export default DynamicTable;
