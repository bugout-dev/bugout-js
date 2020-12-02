import { AxiosInstance } from 'axios'
import {
    getAllJournals,
    createJournal,
    deleteJournal,
} from '../journal'
import {
    createTags,
    getTags,
    deleteTags,
} from '../tag'
import {
    getEntry,
    createEntry,
    updateEntry,
    deleteEntry,
    getEntriesByJournal,
    searchEntriesByJournal,
} from '../entry'
import {Journal} from '../journal/journal'
import {Entry, EntryMutable} from '../entry/entry'
import {Tag, TagDescription} from '../tag/tag'

const getUser = (spireClient: AxiosInstance) => (
    {
        getAllJournals: () => getAllJournals(spireClient),
        createJournal: (name: Journal['name']) => createJournal(spireClient, name),
        deleteJournal: (id: Journal['id']) => deleteJournal(spireClient, id),
        getEntriesByJournal: (journalId: Journal['id']) => getEntriesByJournal(spireClient, journalId),
        searchEntriesByJournal: (journalId: Journal['id'], query: string) => searchEntriesByJournal(spireClient, journalId, query),
        getEntry: (journalId: Journal['id'], entryId: Entry['id']) => getEntry(spireClient, journalId, entryId),
        createEntry: (journalId: Journal['id'], entryData: EntryMutable) => createEntry(spireClient, journalId, entryData),
        updateEntry: (journalId: Journal['id'], entryId:Entry['id'], entryData: EntryMutable) => updateEntry(spireClient, journalId, entryId, entryData),
        deleteEntry: (journalId: Journal['id'], entryId:Entry['id']) => deleteEntry(spireClient, journalId, entryId),
        createTag: (journalId: Journal['id'], entryId:Entry['id'], tags:string) => createTags(spireClient, journalId, entryId, tags),
        getTags: (journalId: Journal['id'], entryId:Entry['id']) => getTags(spireClient, journalId, entryId),
        deleteTags: (journalId: Journal['id'], entryId:Entry['id'], tag:string) => deleteTags(spireClient, journalId, entryId, tag),
    }
);

export default getUser;