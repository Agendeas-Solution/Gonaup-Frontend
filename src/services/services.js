import Cookie from "js-cookie"

export function clearLoginToken() {
    Cookie.remove('userToken')
    localStorage.clear()
    window.location.reload(false)
}
