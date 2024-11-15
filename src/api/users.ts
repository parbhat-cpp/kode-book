import { backendRoutes } from "@/backendBase.routes";
import { supabase } from "@/supabaseClient";
import { ApiResponse } from "@/types/apiResponse";
import axios from "axios";
import toast from "react-hot-toast";

export const searchUser = async (username: string): Promise<ApiResponse> => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const userRoute = backendRoutes.userRoute;
    try {
        const userSearchResponse = await axios.get(`${userRoute}/${username}`, {
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
