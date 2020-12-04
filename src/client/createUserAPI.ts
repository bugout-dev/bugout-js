import { AxiosInstance } from 'axios'
import createJournalsAPI from './createJournalsAPI'
import createEntriesAPI from './createEntriesAPI'
import createTagsAPI from './createTagsApi'
import { UserApi } from '../interfaces'

const createUserAPI = (spireClient: AxiosInstance): UserApi => ({
    ...createJournalsAPI(spireClient),
    ...createEntriesAPI(spireClient),
    ...createTagsAPI(spireClient),
})

export default createUserAPI
