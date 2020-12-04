import axios, { AxiosInstance } from 'axios'
import * as querystring from 'querystring'
import createUserAPI from './createUserAPI'
import { handleError } from './helpers'
import { ClientInterface } from '../interfaces'
import {
    Options,
    Pong,
    User,
    Auth,
} from '../types'

const BugoutClient = (
    options: Options,
): ClientInterface => {
    const broodClient: AxiosInstance = axios.create({ baseURL: options.apiUrls.broodURL })
    const spireClient: AxiosInstance = axios.create({ baseURL: options.apiUrls.spireURL })

    const ping = async (): Promise<Pong> => {
        const broodResponse = broodClient.get('/')
        const spireResponse = spireClient.get('/')

        const results = await Promise.all<any>([
            broodResponse.catch(handleError),
            spireResponse.catch(handleError),
        ])

        return {
            brood: {
                url: results[0].config.baseURL,
                code: results[0].status,
                body: results[0].body,
            },
            spire: {
                url: results[1].config.baseURL,
                code: results[1].status,
                body: results[0].body,

            },
        }
    }

    const createUser = async (
        email: string,
        username: string,
        password: string,
    ): Promise<User> => {
        const registrationForm = querystring.stringify({
            username,
            email,
            password,
        }).toString()
        try {
            const response = await broodClient.post<User>('/user', registrationForm)

            return response.data
        } catch (e) {
            throw e.response.data
        }
    }

    const verify = async (): Promise<User> => {
        try {
            const response = await broodClient.post<User>('/confirm')

            return response.data
        } catch (e) {
            if (e.response.status === 401) {
                throw 'Set token first'
            } else {
                throw e.response
            }
        }
    }

    const login = async (username: string, password: string): Promise<Auth> => {
        const loginUser = querystring.stringify({
            username,
            password,
        }).toString()

        try {
            const response = await broodClient.post<Auth>('/token', loginUser)
            broodClient.defaults.headers.authorization = `Bearer ${response.data.access_token}`
            spireClient.defaults.headers.authorization = `Bearer ${response.data.access_token}`

            return response.data
        } catch (e) {
            throw e.response.data
        }
    }

    const setToken = (token: string): void => {
        try {
            broodClient.defaults.headers.authorization = `Bearer ${token}`
            spireClient.defaults.headers.authorization = `Bearer ${token}`
        } catch (e) {
            throw e.response.data
        }
    }

    return {
        ping,
        createUser,
        verify,
        login,
        setToken,
        user: () => createUserAPI(spireClient),
    }
}

export default BugoutClient
