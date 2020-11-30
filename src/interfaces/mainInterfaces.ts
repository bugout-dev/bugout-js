import {AxiosInstance} from 'axios'

export interface Journals {
    bugout_user_id: string;
    created_at: string;
    holder_ids: Array<string>;
    id: string;
    name: string;
    updated_at: string;
}

export interface Entry {
    content: string;
    content_url: string | null;
    context_type: string;
    context_url: string | null;
    created_at: string;
    id: string;
    journal_url: string;
    tags: Array<string>;
    title: string;
    updated_at: string;
}

export type PersonalInfo = {
    user_id: string;
    username: string;
    email: string;
    normalized_email: string;
    verified: boolean;
    created_at: string;
    updated_at: string;
}

export type AuthInfo = {
    access_token: string;
    token_type: string;
}

export type EntryData = {
    title: string;
    content: string;
}

export type TagsResponse = {
    journal_id: string;
    entry_id: string;
    tags: string[];
}
export type Featcher = {
    brood: AxiosInstance;
    spire: AxiosInstance;
}