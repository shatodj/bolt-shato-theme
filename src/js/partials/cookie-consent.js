import '../../scss/cookie-consent.scss';

const cookieConsent = ({ selector, buttonSelector }) => {

    const element = document.querySelector(selector)
    const buttonElement = document.querySelector(buttonSelector)

    if (!element) {
        return
    }

    const COOKIE_KEY = 'consent-given'
    const CLASS_NAME_HIDDEN = 'is-hidden'
    const EXPIRATION_IN_DAYS = 7

    const getCookieConsentValue = () => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${COOKIE_KEY}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // https://stackoverflow.com/questions/14573223/set-cookie-and-get-cookie-with-javascript
    const setCookieConsentValue = () => {
        var expires = "";
        var date = new Date();
        date.setTime(date.getTime() + (EXPIRATION_IN_DAYS*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    
        document.cookie = COOKIE_KEY + "=" + ("1")  + expires + "; path=/";
    }

    if (getCookieConsentValue()) {
        element.classList.add(CLASS_NAME_HIDDEN)
    } else {
        element.classList.remove(CLASS_NAME_HIDDEN)
    }

    buttonElement && buttonElement.addEventListener('click', () => {
        setCookieConsentValue()
        element.classList.add(CLASS_NAME_HIDDEN)
    })
}

export default cookieConsent;