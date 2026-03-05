import authService  from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useDispatch } from "react-redux";

function LogoutBtn() {

    const dispatch = useDispatch()

    function handleLogout(){
        authService.logout()
        .then(()=> dispatch(logout()))
        .catch(()=> console.log("logout handling function error"))
    }

    return ( 
        <>
        <button onClick={()=>handleLogout()}>Logout</button>
        </>
     );
}

export default LogoutBtn;   