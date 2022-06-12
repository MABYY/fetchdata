import { Navigate } from "react-router-dom";
import SelectData from "./selectData";

const Protected = () => {

     const isLoggedIn = localStorage.getItem('token')
    
    if (isLoggedIn === "") {
        return  <Navigate to="/" replace />
    } 
    return <SelectData/>
};
export default Protected;

