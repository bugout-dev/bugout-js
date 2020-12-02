export interface User {
    user_id: string;
    username: string;
    email: string;
    normalized_email: string;
    verified: boolean;
    created_at: string;
    updated_at: string;
}
export interface Auth  {
    access_token: string;
    token_type: string;
};

export type ApiUrls = {
    broodURL?: string;
    spireURL?: string;
} 

