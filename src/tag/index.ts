import {AxiosInstance} from 'axios'
import {Tag, TagDescription} from './tag'
import {Entry} from '../entry/entry'
import {Journal} from '../journal/journal'

export const createTags = async (
    spireClient: AxiosInstance, 
    journalId: Journal['id'],
    entryId: Entry['id'],
    tag: Tag['name']
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
    journalId: Journal['id'],
    entryId: Entry['id'],
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
    journalId: Journal['id'],
    entryId: Entry['id'],
    tag: Tag['name']
): Promise<TagDescription> =>{
    try { 
        const entryResponse = await spireClient.request<TagDescription>({
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