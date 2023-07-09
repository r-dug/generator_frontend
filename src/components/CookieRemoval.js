import Cookies from 'js-cookie'



  
const deleteCookies = () => {
    Object.keys(Cookies.get()).forEach(function(cookieName) {
    var neededAttributes = {
        
    }
    console.log(cookieName, neededAttributes)
    Cookies.remove(cookieName, neededAttributes)
    })}

export default deleteCookies