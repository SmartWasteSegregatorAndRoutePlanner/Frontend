function setAuthTokenCookie(authToken) {
    // avoid XSS
    authToken = encodeURIComponent(authToken.replace('<', '').replace('>', ''));

    // expiration days
    const expirationDays = 1;
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();

    // set cookie
    document.cookie = "authToken" + "=" + authToken + ";" + expires + ";path=/";

    // below code doesn't work
    // if (document.cookie && document.cookie !== ''){
    //     document.cookie = document.cookie + ";" + newCookie; 
    //     console.log('updated cookie')
    // } else {
    //     document.cookie = newCookie;
    //     console.log('new-cookie');
    // }
}

function getAuthToken() {
    let authCookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, 9) === "authToken") {
                authCookieValue = encodeURIComponent(cookie.substring(9 + 1));
                break;
            }
        }
    }

    // Display the value of "myCookie" in an alert box
    if (authCookieValue) {
        return authCookieValue;
    } else {
        // Redirect the user to a new page
        window.location.href = "./login.html";
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
}