import Cookie from 'js-cookie'
import { PERMISSION } from '../constants/permissionConstant'

export function setLoginToken(token) {
    Cookie.set('userToken', token, { expires: 1 })
}

export function getLoginToken() {
    return Cookie.get('userToken')
}

export function clearLoginToken() {
    Cookie.remove('userToken')
    localStorage.clear()
    window.location.reload(false)
}
export function handleNextDeveloper(navigate) {
    navigate(PERMISSION.DEVELOPER_PERMISSION_ROUTE[parseInt(localStorage.getItem('signupCompleted'))
        + 1].path)
    localStorage.setItem('signupCompleted', parseInt(localStorage.getItem('signupCompleted'))
        + 1)
}
