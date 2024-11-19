import SettingButton from "@/components/settings/SettingButton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaCode } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Settings = () => {
  const [currentSetting, setCurrentSetting] = useState<string>("General");

  return (
    <div className='h-screen bg-appPrimaryBg text-lpPrimaryText'>
      <div className="sticky top-0 left-0">
        <div className="w-full py-4 px-5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/dashboard">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/settings">Settings</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentSetting}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="w-full bg-separatorColor h-[1px]">

        </div>
      </div>

      <div className="flex h-[calc(100vh-57px)]">
        <div className="flex sticky top-0 left-0 overflow-y-auto">
          <div className="p-2 w-60">
            <SettingButton title="General" icon={
              <FaUser />
            } />
            <SettingButton title="Privacy" icon={
              <MdOutlinePrivacyTip />
            } />
            <SettingButton title="Notification" icon={
              <IoIosNotifications />
            } />
            <SettingButton title="Projects" icon={
              <FaCode />
            } />
          </div>
          <div className="self-end bg-separatorColor h-[calc(100vh-57px)] w-[1px]">

          </div>
        </div>
        <div className="w-full overflow-y-auto">

        </div>
      </div>
    </div>
  )
}

export default Settings
