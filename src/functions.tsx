import toast from "react-hot-toast";
import { supabase } from "./supabaseClient";

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error?.message) {
    toast.error(error.message);
  }

  window.location.href = "/"
}
