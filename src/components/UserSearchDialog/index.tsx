import { z } from "zod";
import CustomDialog from "../CustomDialog";
import { useForm } from "react-hook-form";
import { searchUsernameSchema } from "@/schemas/searchUsernameSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import InputWithIcon from "../InputWithIcon";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import Loader from "../Loader";
import { ApiResponse } from "@/types/apiResponse";
import { followUser, searchUser, unfollowUser } from "@/api/users";
import SearchUserCard from "./components/SearchUserCard";
import { SearchUser } from "@/types/userType";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai/react";
import { userAtom } from "@/store/authStore";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

interface SearchUserDialogProps {
  className?: string;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

const UserSearchDialog = (props: SearchUserDialogProps) => {
  /**
   * Show loading when we hit search profile api.
   */
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  /**
   * Contains list of profile response according to our provided username search.
   */
  const [userData, setUserData] = useState<SearchUser[]>([]);

  const [currentUser] = useAtom(userAtom);

  const navigate = useNavigate();

  const [searchUsername, setSerachUsername] = useState<string>("");
  /**
   * Indicates the current page in pagination feature.
   */
  const [searchPage, setSearchPage] = useState<number>(1);
  /**
   * When we search for a profile it is possible that we get more than 5 users with similar username.
   * In that case we will use pagination and this totalPages indicate how many pages of data we are getting.
   * It is undefined by default because when we will get 5 or less than 5 profiles in that case we will not
   * show the pagination button and no. of pages.
   */
  const [totalPages, setTotalPages] = useState<number | undefined>(undefined);

  const searchUsernameForm = useForm<z.infer<typeof searchUsernameSchema>>({
    resolver: zodResolver(searchUsernameSchema),
    defaultValues: {
      username: "",
    },
  });

  const onUsernameSearch = async (
    formData: z.infer<typeof searchUsernameSchema>
  ) => {
    const searchUsernameValidate = searchUsernameSchema.safeParse({
      username: formData.username,
    });

    if (searchUsernameValidate.success) {
      const username = searchUsernameValidate.data.username as string;

      // Setting username so that we can re-use this username for pagination feature.
      setSerachUsername(username);
      // On every search reset the value to 1
      setSearchPage(1);

      setSearchLoading(true);

      const userSearchData: ApiResponse = await searchUser(username, searchPage);

      if (!userSearchData.error) {
        setUserData(userSearchData.data[0].searchResult);

        const totalNoOfRows = Number(userSearchData.data[0].totalRows);

        if (totalNoOfRows >= 5) {
          setTotalPages(Math.ceil(totalNoOfRows / 5));
        }
      }

      setSearchLoading(false);
    } else {
      toast.error("Enter valid username");
    }
  };

  const handleSearchWithPagination = async (direction: string) => {
    let currentPage;
    if (direction === 'back') {
      let dec = (searchPage - 1) % totalPages!;

      if (dec === 0)
        currentPage = 1;
      else
        currentPage = dec;
    } else {
      let inc = (searchPage + 1) % (totalPages! + 1);

      if (inc === 0)
        currentPage = 1;
      else
        currentPage = inc;
    }
    setSearchPage(currentPage);
    setSearchLoading(true);

    const userSearchData: ApiResponse = await searchUser(searchUsername, currentPage);

    if (!userSearchData.error) {
      setUserData(userSearchData.data[0].searchResult);
    }

    setSearchLoading(false);
  }

  const handleSearchCardClick = (username: string) => {
    props.setOpenDialog(!props.openDialog);

    /**
     * In case when we get our profile lised on the search result
     * redirects to our own profile page.
     */
    if (username === currentUser?.username) {
      navigate('/profile');
      return;
    }

    navigate(`/profile/${username}`);
  }

  const handleUserFollow = async (followee_id: string, username: string, index: number) => {
    setUserData((prevState) =>
      /**
       * setting 'following' field to 'undefined' so that we can show a loader when
       * we hit follow user api
       * WHEN :-
       * following => true (current user follows this user)
       * following => false (current user doesn't follow this user)
       * following => undefined (a state when we hit follow api request to the server, which is useful in showing the loader)
       */
      prevState.map((item, i) => index === i ? { ...item, following: undefined } : item)
    );

    const followResponse = await followUser(followee_id, username);

    if (followResponse.status_code === 200) {
      setUserData((prevState) =>
        prevState.map((item, i) => index === i ? { ...item, following: true } : item)
      );
    } else {
      setUserData((prevState) =>
        prevState.map((item, i) => index === i ? { ...item, following: false } : item)
      );
    }
  }

  const handleUserUnfollow = async (followee_id: string, username: string, index: number) => {
    setUserData((prevState) =>
      prevState.map((item, i) => index === i ? { ...item, following: undefined } : item)
    );

    const unfollowResponse = await unfollowUser(followee_id, username);

    if (unfollowResponse.status_code === 200) {
      setUserData((prevState) =>
        prevState.map((item, i) => index === i ? { ...item, following: false } : item)
      );
    } else {
      setUserData((prevState) =>
        prevState.map((item, i) => index === i ? { ...item, following: true } : item)
      );
    }
  }

  return (
    <CustomDialog
      heading={
        <Form {...searchUsernameForm}>
          <form onSubmit={searchUsernameForm.handleSubmit(onUsernameSearch)}>
            <FormField
              control={searchUsernameForm.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      placeholder="Search User"
                      className="mt-4"
                      icon={<FaSearch />}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      }
      openDialog={props.openDialog}
      setOpenDialog={props.setOpenDialog}
      className="bg-appSecondaryBg border-appSecondaryBg text-lpSecondaryBg"
      withHeader
      content={
        <>
          {
            searchLoading &&
            <div className="flex w-full justify-center">
              <div className="flex gap-2">
                <Loader />
                <p>Searching user...</p>
              </div>
            </div>
          }
          <div>
            {
              userData && userData.map((user: SearchUser, index: number) => (
                <SearchUserCard user={user} onClick={() => handleSearchCardClick(user.username)} handleFollow={() => handleUserFollow(user.id, user.username, index)} handleUnfollow={() => handleUserUnfollow(user.id, user.username, index)} />
              ))
            }
          </div>
          {
            totalPages && <div className="flex items-center gap-2 ml-auto">
              <button disabled={searchPage === 1} onClick={() => handleSearchWithPagination('back')}>
                <ArrowLeft size={22} />
              </button>
              <p>{searchPage} / {totalPages}</p>
              <button disabled={searchPage === totalPages} onClick={() => handleSearchWithPagination('forward')}>
                <ArrowRight size={22} />
              </button>
            </div>
          }
        </>
      }
    >

    </CustomDialog>
  );
};

export default UserSearchDialog;
