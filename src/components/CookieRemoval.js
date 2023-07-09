import Cookies from 'js-cookie'
function del(cookieName) {
    console.log(document.cookie)
    Cookies.remove(cookieName, {
        proxy: true,
        sameSite: 'none', // cross-site
        secure: true, // Set to true if using HTTPS
        httpOnly: false, // Prevent client-side JavaScript from accessing cookies
        maxAge: 60*30*1000, // Session expiration time (in milliseconds)
        domain: process.env.COOKIE_ALLOW,
        path: "/"
    })
}

  
const deleteCookies = () => {
    console.log(Cookies.get())
    Object.keys(Cookies.get()).forEach(function(cookieName) {

    del(cookieName)
    })}

export default deleteCookies 