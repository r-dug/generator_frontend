import Cookies from 'js-cookie'



  
const deleteCookies = () => {
    Object.keys(Cookies.get()).forEach(function(cookieName) {
    const now = Date.now()
    var neededAttributes = {
        expires: 'Thu, 01 Jan 1970 00:00:00 UTC', // Session expiration time (in milliseconds)
    }
    console.log(cookieName, neededAttributes)
    Cookies.set(cookieName, neededAttributes)
    })}

export default deleteCookies 