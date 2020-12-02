import {AxiosInstance} from 'axios'
import {
    Journal
} from './journal'

export const getAllJournals = async (
    spireClient: AxiosInstance, 
): Promise<Journal[]> => {
    try {
        const jurnalsResponse = await spireClient.get<Journal[]>('/journals/')
        return jurnalsResponse.data
    } catch(e) {
        console.log(e)
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error getAllJournals'
        }
    }
}
export const createJournal = async (
    spireClient: AxiosInstance, 
    name: string
): Promise<Journal> => {
    try { 
        const journalResponse = await spireClient.post<Journal>(`/journals/`, {name})
        return journalResponse.data
    } catch(e) {
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error createJournal'
        }
    }
}
export const deleteJournal = async (
    spireClient: AxiosInstance, 
    id: string
): Promise<Journal> => {
    try { 
        const journalResponse = await spireClient.delete<Journal>(`/journals/${id}`)
        return journalResponse.data
    } catch(e) {
        throw {
            error: e.response.data,
            status: e?.response?.status,
            message: 'Error deleteJournal'
        }
    }
}
// export const getEntriesByJournal = async (
//     spireClient: AxiosInstance, 
//     journalId: string
// ): Promise<Entry[]> => {
//     try {
//         const entriesResponse = await spireClient.get<Entry[]>(`/journals/${journalId}/entries`)
//         return entriesResponse.data
//     } catch(e) {
//         throw {
//             error: e.response.data,
//             status: e?.response?.status,
//             message: 'Error getEntries'
//         }
//     }
// }
// export const searchEntriesByJournal = async (
//     spireClient: AxiosInstance, 
//     journalId: string, query: string
// ): Promise<Entry> => {
//     try { 
//         const entriesResponse = await spireClient.get<Entry>(`/journals/${journalId}/search?q=${query}`)
//         return entriesResponse.data
//     } catch(e) {
//         throw {
//             error: e.response.data,
//             status: e?.response?.status,
//             message: 'Error searchEntries'
//         }
//     }
// }