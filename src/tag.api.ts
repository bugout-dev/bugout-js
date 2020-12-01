import {AxiosInstance} from 'axios'
import {TagsResponse} from './interfaces/mainInterfaces'

export const createTags = async (
    spireClient: AxiosInstance, 
    journalId: string,
    entryId: string,
    tag: string
): Promise<string[]> =>{
    try { 
        const entryResponse = await spireClient.post<string[]>(`/journals/${journalId}/entries/${entryId}/tags`, {tags: tag})
        return entryResponse.data
    } catch(e) {
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error createTags'
        }
    }
}
export const getTags = async (
    spireClient: AxiosInstance, 
    journalId: string, 
    entryId: string
): Promise<string[]> =>{
    try { 
        const entryResponse = await spireClient.get<string[]>(`/journals/${journalId}/entries/${entryId}/tags`)
        return entryResponse.data
    } catch(e) {
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error getTags'
        }
    }
}

export const deleteTags = async (
    spireClient: AxiosInstance, 
    journalId: string, 
    entryId: string, 
    tag: string,
): Promise<TagsResponse> =>{
    try { 
        const entryResponse = await spireClient.request<TagsResponse>({
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