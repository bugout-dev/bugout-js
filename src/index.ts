import Bugout, {ApiUrls} from './bugout.js'
import {BROODURL, SPIREURL} from './constants'
import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {PersonalInfo, AuthInfo} from './interfaces/mainInterfaces'
import getUser from './user.api'
import {
    testPing,
    createBugoutUser,
    verifyBugoutUser,
    setBugoutUserToken,
    loginBugoutUser,
} from './bugout.api'

const BugoutClient = (
    bugoutToken?: string,
    bugoutClientID?: string, 
    ApiUrls?: ApiUrls,
    ) => {
// ToDo here must be request to auth api
    const broodClient: AxiosInstance = axios.create({baseURL: ApiUrls?.broodURL || BROODURL})
    const spireClient: AxiosInstance = axios.create({baseURL: ApiUrls?.broodURL || SPIREURL})
    let personalInformation: PersonalInfo = {
        user_id: '',
        username: '',
        email: '',
        normalized_email: '',
        verified: false,
        created_at: '',
        updated_at: '',
    };
    let authInfo: AuthInfo = {
        access_token: '',
        token_type: 'bearer'
    };

    const ping = async () => {
        const result = await testPing(broodClient, spireClient)
        return result
    }
    const createUser = async (
        email:string, 
        username: string, 
        password: string,
    ) => {
        const user = await createBugoutUser(broodClient, email, username, password)
        personalInformation = user

        return user
    }
    const verify = async (code: string) => {
        if(!personalInformation || !authInfo) throw new Error('Token Required')

        const userAccess = await verifyBugoutUser(broodClient, code)
        return userAccess
    }
    const login = async (
        username: string,
        password: string,
    ) => {
        const userAccess = await loginBugoutUser(broodClient, username, password)
        return userAccess 
    }
    const setToken = async (
        token: string,
    ) => {
        broodClient.defaults.headers['authorization'] = `Bearer ${token}`
        spireClient.defaults.headers['authorization'] = `Bearer ${token}`
        
        const personalInfoResponse = await setBugoutUserToken(broodClient, token)

        authInfo = {
            token_type: 'bearer',
            access_token: token,
        }
        personalInformation = personalInfoResponse

        return true 
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

export {BugoutClient as BugoutClient}