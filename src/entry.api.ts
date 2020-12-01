import {Entry, EntryData} from './interfaces/mainInterfaces'
import {AxiosInstance} from 'axios'

export const getEntry = async (
    spireClient: AxiosInstance,
    journalId: string, 
    entryId: string
): Promise<Entry> => {
    try { 
        const entryResponse = await spireClient.get<Entry>(`/journals/${journalId}/entries/${entryId}`)
        return entryResponse.data
    } catch(e) {
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error getEntry'
        }
    }
}

export const createEntry = async (
    spireClient: AxiosInstance,
    journalId: string,
    entryData: EntryData
):Promise<Entry> => {
    try { 
        const entryResponse = await spireClient.post<Entry>(`/journals/${journalId}/entries`, entryData)
        return entryResponse.data
    } catch(e) {
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error createEntry'
        }
    }
}
export const updateEntry = async (
    spireClient: AxiosInstance,
    journalId: string, 
    entryId: string, 
    entryData: EntryData
): Promise<Entry> => {
    try { 
        const entryResponse = await spireClient.put<Entry>(`/journals/${journalId}/entries/${entryId}`, entryData)
        return entryResponse.data
    } catch(e) {
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error updateEntry'
        }
    }
}
export const deleteEntry = async (
    spireClient: AxiosInstance,
    journalId: string, 
    entryId: string
): Promise<Entry> => {
    try { 
        const entryResponse = await spireClient.delete<Entry>(`/journals/${journalId}/entries/${entryId}`)
        return entryResponse.data
    } catch(e) {
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error deleteEntry'
        }
    }
}