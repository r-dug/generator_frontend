import Cookies from 'js-cookie'



  
const deleteCookies = () => {
    Object.keys(Cookies.get()).forEach(function(cookieName) {
    const now = Date.now()
    var neededAttributes = {
        proxy: true,
        sameSite: 'none', // cross-site
        secure: true, // Set to true if using HTTPS
        httpOnly: false, // Prevent client-side JavaScript from accessing cookies
        expires: 'Thu, 01 Jan 1970 00:00:00 UTC', // Session expiration time (in milliseconds)
        domain: process.env.COOKIE_ALLOW,
        path: "/"
    }
    console.log(cookieName, neededAttributes)
    Cookies.set(cookieName, neededAttributes)
    Cookies.remove(cookieName)
    })}

export default deleteCookies 