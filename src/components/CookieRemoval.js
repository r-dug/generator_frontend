import Cookies from 'js-cookie'
function del(cookieName) {
    console.log(document.cookie)
    Cookies.remove(cookieName, {path: '/', domain: process.env.COOKIE_ALLOW})

}

  
const deleteCookies = () => {
    console.log(Cookies.get())
    Object.keys(Cookies.get()).forEach(function(cookieName) {

    del(cookieName)
    })}

export default deleteCookies 