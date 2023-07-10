import Cookies from 'js-cookie'
const API_URL = process.env.REACT_APP_API_URL 
  
const deleteCookies = async () => {
    const cookieList = document.cookie
    console.log(typeof cookieList)
    console.log(cookieList)
    // del(cookieList)
    const options = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        headers:{
            "cookies": cookieList
            },
        credentials: "include"
    }
    try{
        const response = await fetch(`${API_URL}/logout`, options)
        const data = await response.json()
        console.log("data: ",data.message)
    }catch (error){
        console.error(error)
    }

}

export default deleteCookies 