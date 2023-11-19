export const getCookieByKey = (key) => {
    console.log('[CookieUtils] getCookieByKey: ' + key);
}

export const removeCookieInfo = () => {
    console.log('[CookieUtils] removeCookieInfo');
}

export const getLocalStorageItemByKey = (key) => {
    return localStorage.getItem(key);
}

export const saveUserTokenInfo = (token) => {
    localStorage.setItem('UserId', token.userId)
    localStorage.setItem('Email', token.lastName)
    localStorage.setItem('UserName', token.email)
    localStorage.setItem('AccessToken', token.accessToken)
    localStorage.setItem('RefreshToken', token.refreshToken)
}

export const removeLocalStorageInfo = () => {
    localStorage.clear();
}