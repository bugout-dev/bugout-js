import axios, {AxiosInstance} from 'axios'
import * as querystring from 'querystring'
import {User, Auth, ApiUrls} from './bugoutClient'
import getUser from '../user'


const hanldeError = (e: any) => {
    if(e.response) {
        return {
            ...e.response,
            status: e.response.status,
        }
    }
}

const BugoutClient = (
    ApiUrls: ApiUrls,
    bugoutToken?: string,
    bugoutClientID?: string, 
    ) => {
// ToDo here must be request to auth api
    const broodClient: AxiosInstance = axios.create({baseURL: ApiUrls.broodURL})
    const spireClient: AxiosInstance = axios.create({baseURL: ApiUrls.spireURL})
    let personalInformation: User
    let authInfo: Auth

    const ping = async () => {
        const broodResponse = broodClient.get('/')
        const spireResponse = spireClient.get('/')

        const results = await Promise.all<any>([
        broodResponse.catch(hanldeError),
        spireResponse.catch(hanldeError),
    ])

    return {
        brood: {
            url: results[0].config.baseURL,
            code: results[0].status,
        },
        spire: {
            url: results[1].config.baseURL,
            code: results[1].status,
        }
    }
    }
    const createUser = async (
        email: User['email'], 
        username: User['username'], 
        password: string,
    ): Promise<User> => {
        const registrationForm = querystring.stringify({
            username,
            email,
            password
        }).toString()
        try {
            const userResponse = await broodClient.post<User>('/user', registrationForm)

            return userResponse.data;
        } catch(e) {
            throw e.response.data
        }
    }
    const verify = async (code: string): Promise<User> => {
        if(!personalInformation || !authInfo) throw new Error('Token required, configurate token using setToken function')

        try {
            const verificationResponse = await broodClient.post<User>('/confirm');
            // this.personalInfo = verificationResponse.data
            return verificationResponse.data
        }
        catch (e) {
            throw e.response.data
        }
    }
    const login = async (username: User['username'], password: string): Promise<Auth> => {
        const loginUser = querystring.stringify({
            username,
            password
        }).toString() 
    
        try {
            const authInfoResponse = await broodClient.post<Auth>('/token', loginUser);
    
            return authInfoResponse.data;
        } catch(e) {
            throw e.response.data
        }
    }

    const setToken = async (token: Auth['access_token']): Promise<boolean> => {
        
        try {
            broodClient.defaults.headers['authorization'] = `Bearer ${token}`
            spireClient.defaults.headers['authorization'] = `Bearer ${token}`
            
            const personalInfoResponse = await broodClient.get<User>('/user')
            personalInformation = personalInfoResponse.data
            authInfo = {
                token_type: 'bearer',
                access_token: token,
            }
            
            return true 

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
            user: () => getUser(spireClient),
        }
    
}

export default BugoutClient