import { backendRoutes } from "@/backendBase.routes";
import { supabase } from "@/supabaseClient";
import { ApiResponse } from "@/types/apiResponse";
import axios from "axios";
import toast from "react-hot-toast";

/**
 * searchUser searches for the provided username and returns a list of profile based on the provided username with pagination.
 * @param username search a profile with this username
 * @param page page will return the nth page of profile list
 * @returns {Promise<ApiResponse>}
 */
export const searchUser = async (username: string, page: number): Promise<ApiResponse> => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const userRoute = backendRoutes.userRoute;
    try {
        const userSearchResponse = await axios.get(`${userRoute}/${username}/${page}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });

        const userSearchData: ApiResponse = userSearchResponse.data;

        if (userSearchData?.error) {
            toast.error(userSearchData.error);
            return userSearchData;
        }

        return userSearchData;
    } catch (error) {
        toast.error('Failed to fetch user');
        return {
            status_code: 500,
            error: 'Failed to fetch user',
            data: [],
        }
    }
}

/**
 * Get profile by username
 * @param id 
 * @returns {Promise<ApiResponse>}
 */
export const getProfile = async (username: string): Promise<ApiResponse> => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const userRoute = backendRoutes.userRoute;

    try {
        const profileResponse = await axios.get(`${userRoute}/get-profile/${username}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }
        );

        const profileData: ApiResponse = profileResponse.data;

        if (profileData.error) {
            toast.error(profileData.error);
        }

        return profileData;
    } catch (error) {
        console.log(error);

        toast.error('Failed to fetch profile');
        return {
            status_code: 500,
            error: 'Failed to fetch user',
            data: [],
        }
    }
}

/**
 * Current user start following this user with the provided followee_id
 * @param followee_id id of user to be followed
 * @param username username of user to be followed
 * @returns {Promise<ApiResponse>}
 */
export const followUser = async (followee_id: string, username: string): Promise<ApiResponse> => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const userRoute = backendRoutes.userRoute;

    try {
        const followUserResponse = await axios.post(`${userRoute}/follow`, {
            followee_id: followee_id,
        }, {
            headers: {
                'Accept-Content': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        const followUserData: ApiResponse = followUserResponse.data;

        if (followUserData.error) {
            toast.error(followUserData.error);
        } else {
            toast.success(`Following ${username}`);
        }

        return followUserData;
    } catch (error) {
        toast.error('Failed to follow user');
        return {
            status_code: 500,
            error: 'Failed to fetch user',
            data: [],
        }
    }
}

/**
 * Current user unfollows the user with the provided followee_id
 * @param followee_id id of the user to be unfollowd
 * @param username username of the user to be unfollowed
 * @returns {Promise<ApiResponse>}
 */
export const unfollowUser = async (followee_id: string, username: string) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const userRoute = backendRoutes.userRoute;

    try {
        const followUserResponse = await axios.post(`${userRoute}/unfollow`, {
            followee_id: followee_id,
        }, {
            headers: {
                'Accept-Content': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        const followUserData: ApiResponse = followUserResponse.data;

        if (followUserData.error) {
            toast.error(followUserData.error);
        } else {
            toast.success(`Unfollowed ${username}`);
        }

        return followUserData;
    } catch (error) {
        toast.error('Failed to unfollow user');
        return {
            status_code: 500,
            error: 'Failed to fetch user',
            data: [],
        }
    }
}
