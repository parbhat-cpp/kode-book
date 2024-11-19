export interface SearchUser {
    id: string;
    username: string;
    full_name: string;
    avatar_url: string;
    /**
     * following is true when the current user follows the search result user
     * following is false when the current user doesn't follows the search result user
     * following is undefined when we request the follow user api so that we can show a loader
     */
    following: boolean | undefined;
}
