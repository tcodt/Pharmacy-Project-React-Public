import { jwtDecode } from "jwt-decode"
import { axiosInstance } from "../services/api-client";



const useSetToken = () => {
    let token = localStorage.getItem("token");

    if (token === null) return;
    const decoded = jwtDecode(token);

    
    if ((Date.now()) > decoded.exp!) {
        localStorage.clear();
        return
    }

    console.log("Noooooo");
    console.log(token);

    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}



export default useSetToken;