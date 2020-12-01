import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {PersonalInfo, AuthInfo} from './interfaces/mainInterfaces'
import * as querystring from 'querystring'

const hanldeError = (e: any) => {
    if(e.response) {
        return {
            ...e.response,
            status: e.response.status,
        }
    }
}

export const testPing = async (broodClient: AxiosInstance, spireClient: AxiosInstance) => {
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

export const createBugoutUser = async (
    broodClient: AxiosInstance, 
    email:string, 
    username: string, 
    password: string,
): Promise<PersonalInfo> => {

    const registrationForm = querystring.stringify({
        username,
        email,
        password
    }).toString()
    try {
        const userResponse = await broodClient.post<PersonalInfo>('/user', registrationForm)

        return userResponse.data;
    } catch(e) {
        throw e.response.data
    }
}

export const loginBugoutUser = async (
    broodClient: AxiosInstance,
    username: string,
    password: string,
): Promise<AuthInfo> => {
    const loginUser = querystring.stringify({
        username,
        password
    }).toString() 

    try {
        const authInfoResponse = await broodClient.post<AuthInfo>('/token', loginUser);

        return authInfoResponse.data;
    } catch(e) {
        throw e.response.data
    }
}

export const verifyBugoutUser = async (
    broodClient:AxiosInstance,
    code: string,
) => {
    // if(!this.personalInfo || !this.authInfo) throw new Error('Please set tokn')
    const verificationRequest = querystring.stringify({verification_code: code}).toString() 

    try {
        const verificationResponse = await broodClient.post<PersonalInfo>('/confirm');
        // this.personalInfo = verificationResponse.data
        return verificationResponse.data
    }
    catch (e) {
        throw e.response.data
    }
}

export const setBugoutUserToken = async (
    broodClient: AxiosInstance,
    token: string,
) => {
    const authnfo = {
        token_type: 'bearer',
        access_token: token,
    }

    try {

        const personalInfoResponse = await broodClient.get<PersonalInfo>('/user')
        
        return personalInfoResponse.data
    } catch (e) {
        throw e.response.data
    }
}
