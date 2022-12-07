export default function deleteAllCookies() {
    var cookies = document.cookie.split(";");
    console.log(cookies);
    localStorage.clear();
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        // document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    window.location.reload();
}