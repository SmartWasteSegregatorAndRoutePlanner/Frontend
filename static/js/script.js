function setAuthTokenCookie(authToken) {
    // avoid XSS
    authToken = encodeURIComponent(authToken.replace('<', '').replace('>', ''));

    // expiration days
    const expirationDays = 1;
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();

    // set cookie
    const newCookie = "authToken" + "=" + authToken + ";" + expires + ";path=/";
    if (document.cookie && document.cookie !== ''){
        document.cookie = document.cookie + ";" + newCookie; 
    } else {
        document.cookie = newCookie;
    }
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
