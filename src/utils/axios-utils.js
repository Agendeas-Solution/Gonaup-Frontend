import axios from 'axios'

const client = axios.create({ baseURL: process.env.REACT_APP_API_CALL_URL })

export const request = async ({ ...options }) => {
    const onSuccess = response => response
    const onError = error => {
        // optionaly catch errors and add additional logging here
        return error
    }
    return client(options).then(onSuccess).catch(onError)
}

const apiUrl = axios.create({ baseURL: process.env.REACT_APP_COUNTRY_STATE_CITY_API_URL })

export const handleApiCountryStateCityGetCall = ({ ...options }) => {
    const onSuccess = response => response
    const onError = error => {
        // optionaly catch errors and add additional logging here
        return error
    }
    return apiUrl(options).then(onSuccess).catch(onError)
}
const admin = axios.create({ baseURL: process.env.REACT_APP_API_ADMIN_CALL_URL })

export const requestAdmin = ({ ...options }) => {
    const onSuccess = response => response
    const onError = error => {
        return error
    }
    return admin(options).then(onSuccess).catch(onError)
}
