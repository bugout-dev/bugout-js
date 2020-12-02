import {Entry, EntryMutable} from './entry'
import {Journal} from '../journal/journal'
import {AxiosInstance} from 'axios'

export const getEntry = async (
    spireClient: AxiosInstance,
    journalId: Journal['id'],
    entryId: Entry['id'], 
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
    journalId: Journal['id'],
    entryData: EntryMutable
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
    journalId: Journal['id'],
    entryId: Entry['id'], 
    entryData: EntryMutable
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
    journalId: Journal['id'],
    entryId: Entry['id'], 
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
export const getEntriesByJournal = async (
    spireClient: AxiosInstance, 
    journalId: Journal['id'],
): Promise<Entry[]> => {
    try {
        const entriesResponse = await spireClient.get<Entry[]>(`/journals/${journalId}/entries`)
        return entriesResponse.data
    } catch(e) {
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error getEntries'
        }
    }
}
export const searchEntriesByJournal = async (
    spireClient: AxiosInstance, 
    journalId:  Journal['id'],
    query: string
): Promise<Entry[]> => {
    try { 
        const entriesResponse = await spireClient.get<Entry[]>(`/journals/${journalId}/search?q=${query}`)
        return entriesResponse.data
    } catch(e) {
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error searchEntries'
        }
    }
}