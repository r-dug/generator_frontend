import Cookies from 'js-cookie'

function del(cookieName) {
    console.log(document.cookie)
    document.cookie = cookieName + `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=${process.env.COOKIE_ALLOW};samesite=none;secure=true;`;
}

  
const deleteCookies = () => {
    console.log(Cookies.get())
    Object.keys(Cookies.get()).forEach(function(cookieName) {

    del(cookieName)
    })}

export default deleteCookies 