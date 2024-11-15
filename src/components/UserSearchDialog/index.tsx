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
import { searchUser } from "@/api/users";
import SearchUserCard from "./components/SearchUserCard";
import { SearchUser } from "@/types/userType";
import { useNavigate } from "react-router-dom";

interface SearchUserDialogProps {
  className?: string;
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
}

const UserSearchDialog = (props: SearchUserDialogProps) => {
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<SearchUser[]>([]);

  const navigate = useNavigate();

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

      setSearchLoading(true);

      const userSearchData: ApiResponse = await searchUser(username);

      if (!userSearchData.error)
        setUserData(userSearchData.data);

      setSearchLoading(false);
    } else {
      toast.error("Enter valid username");
    }
  };

  const handleSearchCardClick = (username: string) => {
    props.setOpenDialog(!props.openDialog);

    navigate(`/profile/${username}`);
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
              userData && userData.map((user: SearchUser) => (
                <SearchUserCard user={user} onClick={() => handleSearchCardClick(user.username)} />
              ))
            }
          </div>
        </>
      }
    >

    </CustomDialog>
  );
};

export default UserSearchDialog;
