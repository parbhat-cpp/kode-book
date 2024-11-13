import Button from "@/components/Button";
import { Input } from "@/components/ui/input";
import { updatePasswordSchema } from "@/schemas/authSchema";
import { supabase } from "@/supabaseClient";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const updatePasswordForm = useForm<z.infer<typeof updatePasswordSchema>>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleUpdatePassword = async (
    formData: z.infer<typeof updatePasswordSchema>
  ) => {
    const passwordValidate = updatePasswordSchema.safeParse({
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    });

    if (passwordValidate.success) {
      const newPassword = passwordValidate.data.newPassword as string;
      const confirmPassword = passwordValidate.data.confirmPassword as string;

      if (newPassword !== confirmPassword) {
        toast.error("Password doesn't match");
        return;
      }

      const updatePasswordResponse = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (updatePasswordResponse.error?.message) {
        toast.error(updatePasswordResponse.error.message);
      } else {
        toast.success("Password updated");
        navigate("/");
      }
    } else {
      toast.error("Enter valid password");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <h1>Update Password</h1>
        <Form {...updatePasswordForm}>
          <form
            onSubmit={updatePasswordForm.handleSubmit(handleUpdatePassword)}
            className="flex flex-col space-y-5"
          >
            <FormField
              control={updatePasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="new_password"
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updatePasswordForm.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      id="confirm_password"
                      placeholder="Confirm Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Update Password</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default UpdatePassword;
