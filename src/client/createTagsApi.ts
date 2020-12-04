import { AxiosInstance } from 'axios'
import { Tag, TagDescription } from '../types'
import { TagAPI, Response } from '../interfaces'

const createTagsApi = (spireClient: AxiosInstance): TagAPI => {
    const createTags = async (
        journalId: string,
        entryId: string,
        tagName: string[],
    ): Promise<Response<Tag[]>> => {
        try {
            const response = await spireClient.post<string[]>(
                `/journals/${journalId}/entries/${entryId}/tags`,
                { tags: tagName },
            )

            return {
                data: response.data.map(
                    (tag) => ({
                        name: tag,
                    }),
                ),
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error createTags',
            }
        }
    }

    const getTags = async (
        journalId: string,
        entryId: string,
    ): Promise<Response<TagDescription>> => {
        try {
            const response = await spireClient.get<TagDescription>(`/journals/${journalId}/entries/${entryId}/tags`)

            return {
                data: response.data,
            }
        } catch (e) {
            throw {
                error: e.response.data,
                status: e?.response?.status,
                message: 'Error getTags',
            }
        }
    }

    const deleteTags = async (
        journalId: string,
        entryId: string,
        tagName: string,
    ): Promise<Response<TagDescription>> => {
        try {
            const response = await spireClient.request<TagDescription>({
                method: 'DELETE',
                url: `/journals/${journalId}/entries/${entryId}/tags`,
                data: {
                    tag: tagName,
                },
            })

            return {
                data: response.data,
            }
        } catch (e) {
            throw {
                error: e,
                status: e?.response?.status,
                message: 'Error deleteTags',
            }
        }
    }

    return {
        createTag: (
            journalId: string,
            entryId: string,
            tagName: string[],
        ) => createTags(journalId, entryId, tagName),

        getTags: (
            journalId: string,
            entryId:string,
        ) => getTags(journalId, entryId),

        deleteTags: (
            journalId: string,
            entryId:string,
            tagName:string,
        ) => deleteTags(journalId, entryId, tagName),
    }
}

export default createTagsApi
