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

interface SearchUserDialogProps {
  className?: string;
  openDialog?: boolean;
  setOpenDialog?: (open: boolean) => void;
}

const UserSearchDialog = (props: SearchUserDialogProps) => {
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

    } else {
      toast.error("Enter valid username");
    }
  };

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
    ></CustomDialog>
  );
};

export default UserSearchDialog;
