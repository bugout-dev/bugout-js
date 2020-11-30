import axios, {AxiosInstance, AxiosResponse} from 'axios'
import {PersonalInfo, AuthInfo} from './interfaces/mainInterfaces'
import User from './user'
import * as querystring from 'querystring'


export type ApiUrls = {
    broodURL?: string;
    spireURL?: string;
} 

class Bugout {
    private broodClient: AxiosInstance;
    private spireClient: AxiosInstance;
    private personalInfo: PersonalInfo;
    private authInfo: AuthInfo

    constructor(urls: ApiUrls) {
        this.broodClient = axios.create({baseURL: urls.broodURL})
        this.spireClient = axios.create({baseURL: urls.spireURL})
        this.personalInfo = {
            user_id: '',
            username: '',
            email: '',
            normalized_email: '',
            verified: false,
            created_at: '',
            updated_at: '',
        };
        this.authInfo = {
            access_token: '',
            token_type: 'bearer'
        };
    }

    public async ping() {
        const broodResponse = this.broodClient.post('/user')
        const spireResponse = this.spireClient.post('/user')
        const hanldeError = (e: any) => {
            if(e.response) {
                return {
                    ...e.response,
                    status: e.response.status,
                }
            }
        }

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

    public async createUser(email:string, username: string, password: string) {
        const registrationForm = querystring.stringify({
                username,
                email,
                password
            }).toString()
            
        try {
            const userResponse = await this.broodClient.post<PersonalInfo>('/user', registrationForm)

            this.personalInfo = userResponse.data;
        } catch(e) {
            throw e.response.data
        }
    }

    public async setToken(token: string) {
        const authnfo = {
            token_type: 'bearer',
            access_token: token,
        }
        this.broodClient.defaults.headers['authorization'] = `Bearer ${token}`
        this.spireClient.defaults.headers['authorization'] = `Bearer ${token}`

        try {

            const personalInfoResponse = await this.broodClient.get<PersonalInfo>('/user')
            
            this.authInfo = authnfo
            this.personalInfo = personalInfoResponse.data
            
            return true
        } catch (e) {
            throw e.response.data
        }

    } 

    public async login(username: string, password: string): Promise<AuthInfo> {
        const loginUser = querystring.stringify({
            username,
            password
        }).toString() 

        try {
            const authInfoResponse = await this.broodClient.post<AuthInfo>('/token', loginUser);

            return authInfoResponse.data;
        } catch(e) {
            throw e.response.data
        }
    }

    public async verify(code: string){
        if(!this.personalInfo || !this.authInfo) throw new Error('Please set tokn')
        const verificationRequest = querystring.stringify({verification_code: code}).toString() 

        try {
            const verificationResponse = await this.broodClient.post<PersonalInfo>('/confirm');
            this.personalInfo = verificationResponse.data
            return verificationResponse.data
        }
        catch (e) {
            throw e.response.data
    }
    }

    public user() {
        if(!this.personalInfo.user_id || !this.authInfo.access_token) throw new Error ('Please set tokn')
        const userData = {
            personal: this.personalInfo,
            auth: this.authInfo 
        }
        const featcher = {
            brood: this.broodClient,
            spire: this.spireClient,
        }

        const user = new User(userData, featcher)
        
        return user;
    }
}

export default Bugout