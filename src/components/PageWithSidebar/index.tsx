import { ArrowCircleLeft } from "@phosphor-icons/react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaLaptopCode } from "react-icons/fa";
import { FaCircleUser, FaMagnifyingGlassLocation } from "react-icons/fa6";
import { IoMdSettings, IoIosLogOut } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabaseClient";
import { logout } from "@/functions";
import UserSearchDialog from "../UserSearchDialog";

interface PageWithSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  path: string;
}

const PageWithSidebar = (props: PageWithSidebarProps) => {
  const [isSidebarCollapse, setIsSidebarCollapse] = useState<boolean>(false);
  const [openSearchUserDialog, setOpenSearchUserDialog] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapse((prevState) => !prevState);
  };

  useEffect(() => {
    async function isUserLoggedIn() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        navigate("/");
      }
    }

    isUserLoggedIn();
  }, [navigate, props.path]);

  useEffect(() => {
    function checkScreenWidth() {
      if (window.innerWidth <= 768) {
        setIsSidebarCollapse(true);
      }
    }

    window.addEventListener("resize", checkScreenWidth);

    return () => window.removeEventListener("resize", checkScreenWidth);
  }, []);

  return (
    <>
      <div className="flex bg-appPrimaryBg text-lpPrimaryText">
        <div className="flex sticky top-0 left-0 h-screen">
          <div
            className={clsx(
              "flex flex-col gap-2 p-5 h-screen transition-all duration-300",
              isSidebarCollapse ? "w-20" : "w-60"
            )}
          >
            <div
              className={clsx(
                "md:flex hidden",
                isSidebarCollapse
                  ? "rotate-180 justify-center transition-all duration-700"
                  : "justify-end"
              )}
            >
              <button onClick={toggleSidebarCollapse}>
                <ArrowCircleLeft size={32} />
              </button>
            </div>
            <div className="flex flex-col gap-2 mt-3">
              <SidebarButton
                icon={<MdSpaceDashboard />}
                text="Dashboard"
                redirect="/dashboard"
                collapse={isSidebarCollapse}
              />
              <SidebarButton
                icon={<FaLaptopCode />}
                text="Projects"
                redirect="/projects"
                collapse={isSidebarCollapse}
              />
              <SidebarButton
                icon={<IoSearchOutline />}
                text="Search"
                onClick={() => setOpenSearchUserDialog(!openSearchUserDialog)}
                collapse={isSidebarCollapse}
              />
              <SidebarButton
                icon={<FaMagnifyingGlassLocation />}
                text="Search nearby"
                redirect="/search-nearby"
                collapse={isSidebarCollapse}
              />
              <SidebarButton
                icon={<FaCircleUser />}
                text="Profile"
                redirect="/profile"
                collapse={isSidebarCollapse}
              />
              <SidebarButton
                icon={<IoMdSettings />}
                text="Settings"
                redirect="/settings"
                collapse={isSidebarCollapse}
              />
            </div>
            <div className="flex flex-col mt-auto">
              <SidebarButton
                icon={<IoIosLogOut />}
                text="Log out"
                onClick={logout}
                collapse={isSidebarCollapse}
              />
            </div>
          </div>
          <div className="h-screen self-end bg-separatorColor w-[1px]"></div>
        </div>
        <div className="w-full">{props.children}</div>
        <UserSearchDialog
          openDialog={openSearchUserDialog}
          setOpenDialog={setOpenSearchUserDialog}
        />
      </div>
    </>
  );
};

export default PageWithSidebar;
