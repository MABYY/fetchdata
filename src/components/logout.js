import { useNavigate as useHistory } from "react-router-dom";

function Logout(){
    const history = useHistory();
    return (
        <div className='div_logout'>
        <h1>You have logged out successfully</h1>

        <button className="button_logout " onClick={() => {history("/login");
                                }}>Log in again</button>
        </div>
    )
}

export default Logout;