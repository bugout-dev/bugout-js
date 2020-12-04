import {
    User,
    Pong,
    Auth,
    Entry,
    EntryMutable,
    Journal,
    TagDescription,
    Tag,
} from './types'

export interface ClientInterface {
    ping(): Promise<Pong>;
    createUser(username: string, email: string, password: string): Promise<User>;
    verify(code:string): Promise<User>;
    login(username: string, password: string): Promise<Auth>;
    setToken(token: string): void;
    user(): UserApi
}

export interface EntryAPI {
    getEntriesByJournal(journalId: string): Promise<Response<Entry[]>>,
    searchEntriesByJournal(journalId: string, query: string): Promise<Response<Entry[]>>,
    getEntry(journalId: string, entryId: string): Promise<Response<Entry>>,
    createEntry(journalId: string, entryData: EntryMutable) : Promise<Response<Entry>>,
    updateEntry(journalId: string, entryId:string, entryData: EntryMutable): Promise<Response<Entry>>,
    deleteEntry(journalId: string, entryId:string): Promise<Response<Entry>>,
}

export interface JournalsAPI {
    getAllJournals(): Promise<Response<Journal[]>>,
    createJournal(name: string): Promise<Response<Journal>>,
    deleteJournal(id: string): Promise<Response<Journal>>,
}

export interface TagAPI {
    createTag(journalId: string, entryId:string, tags:string[]): Promise<Response<Tag[]>>
    getTags(journalId: string, entryId:string): Promise<Response<TagDescription>>
    deleteTags(journalId: string, entryId:string, tag:string): Promise<Response<TagDescription>>
}

export interface Response<T> {
    data: T;
}

export interface UserApi {
    getAllJournals(): Promise<Response<Journal[]>>,
    createJournal(name: string): Promise<Response<Journal>>,
    deleteJournal(id: string): Promise<Response<Journal>>,
    getEntriesByJournal(journalId: string): Promise<Response<Entry[]>>,
    searchEntriesByJournal(journalId: string, query: string): Promise<Response<Entry[]>>,
    getEntry(journalId: string, entryId: string): Promise<Response<Entry>>,
    createEntry(journalId: string, entryData: EntryMutable) : Promise<Response<Entry>>,
    updateEntry(journalId: string, entryId:string, entryData: EntryMutable): Promise<Response<Entry>>,
    deleteEntry(journalId: string, entryId:string): Promise<Response<Entry>>,
    createTag(journalId: string, entryId:string, tags:string[]): Promise<Response<Tag[]>>
    getTags(journalId: string, entryId:string): Promise<Response<TagDescription>>
    deleteTags(journalId: string, entryId:string, tag:string): Promise<Response<TagDescription>>
}
