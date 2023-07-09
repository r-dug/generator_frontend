import Cookies from 'js-cookie'

function del(cookieName) {
    document.cookie = cookieName + `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;${process.env.COOKIE_ALLOW};`;
  }

  
const deleteCookies = () => {
    Object.keys(Cookies.get()).forEach(function(cookieName) {

    del(cookieName)
    })}

export default deleteCookies 