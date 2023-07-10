import Cookies from 'js-cookie'
function del(cookieList) {
    let cookies = cookieList.split(";")
    console.log(cookies)
    while ( cookies.length > 0 ) {
        console.log("all cookies: ",document.cookie)
        console.log("cookie list on iteration: ",cookies)
        console.log("cookie type: ",typeof cookies)
        let split = cookies[0].split("=")
        console.log("cookie type: ",typeof split)
        document.cookie = `${split}; expires= ${new Date(0).toUTCString()};domain=resume-generator.info;path='/';secure=true;httponly=false;`
        console.log(document.cookie)
        let name = split[0]
        console.log("name to delete",name)
        Cookies.remove(name)
        console.log(new Date(0).toUTCString())
        let newCookie = `${name}=; expires= ${new Date(0).toUTCString()};path='/';secure=true;httponly=false;`
        console.log(newCookie)
        document.cookie = `${name}=; expires= ${new Date(0).toUTCString()};domain=resume-generator.info;path='/';secure=true;httponly=false;`
        cookies.shift()
    }
    // document.cookie = name + `=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;domain=${process.env.COOKIE_ALLOW};samesite=none;secure=true;`;

    
}

  
const deleteCookies = () => {
    const cookieList = document.cookie
    console.log(typeof cookieList)
    console.log(cookieList)
    del(cookieList)

}

export default deleteCookies 