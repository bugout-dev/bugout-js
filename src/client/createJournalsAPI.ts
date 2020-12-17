import { AxiosInstance } from 'axios'
import { Journal } from '../types'
import { JournalsAPI, Response } from '../interfaces'

const createJournalsAPI = (spireClient: AxiosInstance): JournalsAPI => {
    const getAllJournals = async (): Promise<Response<Journal[]>> => {
        try {
            const response = await spireClient.get<{journals:Journal[]}>('/journals/')

            return {
                data: response.data.journals,
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error getAllJournals',
            }
        }
    }

    const createJournal = async (
        name: string,
    ): Promise<Response<Journal>> => {
        try {
            const response = await spireClient.post<Journal>('/journals/', { name })

            return {
                data: response.data,
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error createJournal',
            }
        }
    }

    const deleteJournal = async (
        id: string,
    ): Promise<Response<Journal>> => {
        try {
            const response = await spireClient.delete<Journal>(`/journals/${id}`)

            return {
                data: response.data,
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error deleteJournal',
            }
        }
    }

    return {
        getAllJournals: () => getAllJournals(),

        createJournal: (
            name: string,
        ) => createJournal(name),

        deleteJournal: (
            id: string,
        ) => deleteJournal(id),
    }
}

export default createJournalsAPI
