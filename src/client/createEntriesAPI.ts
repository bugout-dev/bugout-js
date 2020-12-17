import { AxiosInstance } from 'axios'
import { Entry, EntryMutable } from '../types'
import { EntryAPI, Response } from '../interfaces'

const createEntriesAPI = (spireClient: AxiosInstance): EntryAPI => {
    const getEntry = async (
        journalId: string,
        entryId: string,
    ): Promise<Response<Entry>> => {
        try {
            const response = await spireClient.get<Entry>(`/journals/${journalId}/entries/${entryId}`)

            return {
                data: response.data,
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error getEntry',
            }
        }
    }

    const createEntry = async (
        journalId: string,
        entryData: EntryMutable,
    ):Promise<Response<Entry>> => {
        try {
            const response = await spireClient.post<Entry>(`/journals/${journalId}/entries`, entryData)

            return {
                data: response.data,
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error createEntry',
            }
        }
    }

    const updateEntry = async (
        journalId: string,
        entryId: string,
        entryData: EntryMutable,
    ): Promise<Response<Entry>> => {
        try {
            const response = await spireClient.put<Entry>(`/journals/${journalId}/entries/${entryId}`, entryData)

            return {
                data: response.data,
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error updateEntry',
            }
        }
    }

    const deleteEntry = async (
        journalId: string,
        entryId: string,
    ): Promise<Response<Entry>> => {
        try {
            const response = await spireClient.delete<Entry>(`/journals/${journalId}/entries/${entryId}`)

            return {
                data: response.data,
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error deleteEntry',
            }
        }
    }

    const getEntriesByJournal = async (
        journalId: string,
    ): Promise<Response<Entry[]>> => {
        try {
            const response = await spireClient.get<{entries: Entry[]}>(`/journals/${journalId}/entries`)

            return {
                data: response.data.entries,
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error getEntries',
            }
        }
    }

    const searchEntriesByJournal = async (
        journalId: string,
        query: string,
    ): Promise<Response<Entry[]>> => {
        try {
            const response = await spireClient.get<Entry[]>(`/journals/${journalId}/search?q=${query}`)

            return {
                data: response.data,
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error searchEntries',
            }
        }
    }

    return {
        getEntriesByJournal: (
            journalId: string,
        ) => getEntriesByJournal(journalId),

        searchEntriesByJournal: (
            journalId: string,
            query: string,
        ) => searchEntriesByJournal(journalId, query),

        getEntry: (
            journalId: string,
            entryId: string,
        ) => getEntry(journalId, entryId),

        createEntry: (
            journalId: string,
            entryData: EntryMutable,
        ) => createEntry(journalId, entryData),

        updateEntry: (
            journalId: string,
            entryId: string,
            entryData: EntryMutable,
        ) => updateEntry(journalId, entryId, entryData),

        deleteEntry: (
            journalId: string,
            entryId: string,
        ) => deleteEntry(journalId, entryId),
    }
}

export default createEntriesAPI
