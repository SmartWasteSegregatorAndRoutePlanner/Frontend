function getAuthToken() {
    let authCookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, 9) === "authToken") {
                authCookieValue = decodeURIComponent(cookie.substring(9 + 1));
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
