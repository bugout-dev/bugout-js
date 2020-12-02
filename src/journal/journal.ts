export interface Journal {
    bugout_user_id: string;
    created_at: string;
    holder_ids: Array<string>;
    id: string;
    name: string;
    updated_at: string;
}

// export interface GetAllJournals {
//     (featcher: AxiosInstance): Promise<Journal[]>
// }
// export interface CreateJournal {
//     (featcher: AxiosInstance, name: Journal['name']): Promise<Journal>
// }
// export interface DeleteJournal {
//     (featcher: AxiosInstance, id: Journal['id']): Promise<Journal>
// }
