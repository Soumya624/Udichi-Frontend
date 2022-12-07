export default function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    // console.log(cookies);

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    localStorage.clear();
    window.location.href="/";  
    window.location.reload();
}