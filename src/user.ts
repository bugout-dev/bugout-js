import {AxiosInstance} from 'axios'
import {
    PersonalInfo, 
    AuthInfo, 
    Journals, 
    Entry,
    EntryData,
    TagsResponse,
} from './interfaces/mainInterfaces'

type UserData = {
    personal: PersonalInfo,
    auth: AuthInfo,
}
type Featcher = {
    brood: AxiosInstance;
    spire: AxiosInstance;
}



class User {
    public userData: UserData;
    private featcher: Featcher;
    
    constructor(userData: UserData, featcher: Featcher){
        this.userData = userData
        this.featcher = featcher
    }

    public async getAllJournals(): Promise<Journals[]> {
        try {
            const jurnalsResponse = await this.featcher.spire.get<Journals[]>('/journals/')
            return jurnalsResponse.data
        } catch(e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error getAllJournals'
            }
        }
    }
    public async createJournal(name: string): Promise<Journals> {
        try { 
            const journalResponse = await this.featcher.spire.post<Journals>(`/journals/`, {name})
            return journalResponse.data
        } catch(e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error createJournal'
            }
        }
    }
    public async deleteJournal(id: string): Promise<Journals> {
        try { 
            const journalResponse = await this.featcher.spire.delete<Journals>(`/journals/${id}`)
            return journalResponse.data
        } catch(e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error deleteJournal'
            }
        }
    }
    public async getEntriesByJournal(journalId: string): Promise<Entry[]> {
        try {
            const entriesResponse = await this.featcher.spire.get<Entry[]>(`/journals/${journalId}/entries`)
            return entriesResponse.data
        } catch(e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error getEntries'
            }
        }
    }
    public async searchEntriesByJournal(journalId: string, query: string): Promise<Entry> {
        try { 
            const entriesResponse = await this.featcher.spire.get<Entry>(`/journals/${journalId}/search?q=${query}`)
            return entriesResponse.data
        } catch(e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error searchEntries'
            }
        }
    }
    
    public async createTags(journalId: string, entryId: string, tags: Array<string>): Promise<string[]>{
        try { 
            const entryResponse = await this.featcher.spire.post<string[]>(`/journals/${journalId}/entries/${entryId}/tags`, {tags})
            return entryResponse.data
        } catch(e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error createTags'
            }
        }
    }
    public async getTags(journalId: string, entryId: string): Promise<string[]>{
        try { 
            const entryResponse = await this.featcher.spire.get<string[]>(`/journals/${journalId}/entries/${entryId}/tags`)
            return entryResponse.data
        } catch(e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error getTags'
            }
        }
    }

    public async deleteTags(journalId: string, entryId: string, tag: string): Promise<TagsResponse>{
        try { 
            const entryResponse = await this.featcher.spire.request<TagsResponse>({
                method: 'DELETE',
                url: `/journals/${journalId}/entries/${entryId}/tags`,
                data: {tag},
            })
            return entryResponse.data
        } catch(e) {
            throw {
                error: e,
                status: e?.response?.status,
                message: 'Error deleteTags'
            }
        }
    }
}

export default User