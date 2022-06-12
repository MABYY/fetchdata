import '../App.css'

function AssetsDyTable(props){

  const {classArr, classPort} = props
  
  //Table column names 
  const column = ['Asset', 'Allocation']

  // Table data
  const ThData =()=>{
      
      return column.map((data,key)=>{
          return <th key={key}>{data}</th>
      })
  }
  
  const tdData =() =>{
    
      return classPort.map((data,key)=>{
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

    <div>
      <h3>{classArr}</h3>
      
       <br></br>

        <table className="table">
            <thead>
              <tr>{ThData()}</tr>
            </thead>
            <tbody>
              {tdData()}
            </tbody>
        </table>
       
       <br></br>

    </div>

  )
}
export default AssetsDyTable;

// style table: https://mdbootstrap.com/docs/react/tables/basic/
// https://react-bootstrap.github.io/components/table/
// https://stackoverflow.com/questions/32461271/nodejs-timeout-a-promise-if-failed-to-complete-in-time
