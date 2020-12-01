import { AxiosInstance } from 'axios'
import { ApiUrls } from './bugout'
import {PersonalInfo, AuthInfo, EntryData} from './interfaces/mainInterfaces'
import {
    getAllJournals,
    createJournal,
    deleteJournal,
    getEntriesByJournal,
    searchEntriesByJournal,
} from './journal.api'
import {
    createTags,
    getTags,
    deleteTags,
} from './tag.api'
import {
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry,
} from './entry.api'

const getUser = (spireClient: AxiosInstance) => (
    {
        getAllJournals: () => getAllJournals(spireClient),
        createJournal: (name: string) => createJournal(spireClient, name),
        deleteJournal: (id: string) => deleteJournal(spireClient, id),
        getEntriesByJournal: (journalId: string) => getEntriesByJournal(spireClient, journalId),
        searchEntriesByJournal: (journalId: string, query: string) => searchEntriesByJournal(spireClient, journalId, query),
        createTags: (journalId: string, entryId:string, tags:string) => createTags(spireClient, journalId, entryId, tags),
        getTags: (journalId: string, entryId:string) => getTags(spireClient, journalId, entryId),
        deleteTags: (journalId: string, entryId:string, tag:string) => deleteTags(spireClient, journalId, entryId, tag),
        getEntry: (journalId: string, entryId:string) => getEntry(spireClient, journalId, entryId),
        createEntry: (journalId: string, entryData: EntryData) => createEntry(spireClient, journalId, entryData),
        updateEntry: (journalId: string, entryId:string, entryData: EntryData) => updateEntry(spireClient, journalId, entryId, entryData),
        deleteEntry: (journalId: string, entryId:string) => deleteEntry(spireClient, journalId, entryId),
    }
);

export default getUser;