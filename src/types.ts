export type User = {
    user_id: string;
    username: string;
    email: string;
    normalized_email: string;
    verified: boolean;
    created_at: string;
    updated_at: string;
}

export type Auth = {
    access_token: string;
    token_type: string;
}

export type ApiUrls = {
    broodURL: string;
    spireURL: string;
}

export type Options = {
    apiUrls: ApiUrls;
    token?: string;
    clientID?: string;
}

export type ApiStatus = {
    url: string;
    code: string;
    body: any;
}

export type Pong = {
    brood: ApiStatus;
    spire: ApiStatus;
}

export type Entry = {
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

export type EntryMutable = {
    title: string;
    content: string;
}

export type Journal = {
    bugout_user_id: string;
    created_at: string;
    holder_ids: Array<string>;
    id: string;
    name: string;
    updated_at: string;
}

export type TagDescription = {
    journal_id: string;
    entry_id: string;
    tags: string[];
}

export type Tag = {
    name: string
}
