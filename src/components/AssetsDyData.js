import {useEffect,useState} from 'react'
import AssetsDyTable from './AssetsDyTable'
import '../App.css'

function AssetsDyData(props){

  const { portfolio }= props

  console.log('AssetsDyData', portfolio)
  
  const [classArr, setclassArr] = useState()
  const [portArray, setportArray] = useState()
  
  const [assetsArray, setassetsArray] = useState([])
  const [keepA, setkeepA] = useState([])
  const [portsArray,setportsArray] = useState([])
  const [finalPort,setfinalPort] = useState([])

  useEffect(()=>{

    const assetClass = ["Derivados y Opciones" ,
    "Titulos de Deuda en Dolar Estadounidense",
    "Titulos de Deuda en Peso Argentina",
    "Titulos de Deuda en Dolar Estadounidense Linked",
    "Vehiculos Inversion Colectiva Argentina",]


    const classA = portfolio.map(item => item['GrupoNombre']) /// Get arry with class names
    setclassArr(classA)

    const portCArr = portfolio.map(item => item['Renglones']) // get array with allocations

    setportArray(portCArr)

    setTimeout( () => {


      ////////////////////// extract portfolios
      const keepAsset = []
      const keepPort = []
      
      for(let i=0; i<classA.length; i++){
        if (assetClass.includes(classA[i]) === true) {
          keepAsset.push(classA[i]) 
          keepPort.push(portArray[i]['Renglon'])

        }
      }


      //////////////////////

      const assetsListArray =[]
      const allocListArray =[]

      for(let i=0; i< keepAsset.length ; i++){
        let assetNames = keepPort[i].map(item=>(item['RenglonNombre']))
        assetsListArray.push(assetNames)
        let allocation = keepPort[i].map(item=>(item['RenglonValor']))
        allocListArray.push(allocation)
      }    

      setassetsArray(assetsListArray)
      setportsArray(allocListArray)
      setkeepA(keepAsset)


      console.log('keepAsset', keepAsset)
   

    },  );
   },[portfolio])

      console.log('portsArray', portsArray)
      console.log('setassetsArray', assetsArray)
      console.log('keepAsset', keepA)

   useEffect(()=>{
    setTimeout( () => {
      let portArrayFinal  = []
      for(let j = 0; j< assetsArray.length; j++){
        let newItem = []
        for(let i = 0; i< assetsArray[j].length; i++){
            newItem.push({'Asset':assetsArray[j][i],
                      'Allocation':portsArray[j][i] })
          }
            portArrayFinal.push(newItem)
      }
      setfinalPort(portArrayFinal)
    }, );
   },[portsArray,assetsArray])

   console.log('portArrayFinal', finalPort)

   let portArrayFinal  = []
   for(let j = 0; j< assetsArray.length; j++){
     let newItem = []
      for(let i = 0; i< assetsArray[j].length; i++){
          newItem.push({'Asset':assetsArray[j][i],
                   'Allocation':portsArray[j][i] })
        }
          portArrayFinal.push(newItem)
    }

    console.log('portArrayFinal', portArrayFinal)
  return (
      <div>
          <h2>Display by asset class </h2>

          {finalPort.length> 0?<AssetsDyTable classArr={keepA[0]} classPort={finalPort[0]}/> : null}
          {finalPort.length> 1? <AssetsDyTable classArr={keepA[1]} classPort={finalPort[1]}/>: null}
          {finalPort.length> 2? <AssetsDyTable classArr={keepA[2]} classPort={finalPort[2]}/>: null}
          {finalPort.length> 3? <AssetsDyTable classArr={keepA[3]} classPort={finalPort[3]}/>: null}
          {finalPort.length> 4? <AssetsDyTable classArr={keepA[4]} classPort={finalPort[4]}/>: null}

      </div>
  )
}
export default AssetsDyData;
