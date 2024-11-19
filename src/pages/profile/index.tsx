import { useAtom } from "jotai/react";
import PageWithSidebar from "../../components/PageWithSidebar";
import { KodeBookUser, userAtom } from "@/store/authStore";
import { Briefcase, MapPin, Prohibit, UserCircle } from "@phosphor-icons/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import { getProfile } from "@/api/users";

const Profile = () => {
  const [user] = useAtom(userAtom);
  const [userData, setUserData] = useState<KodeBookUser | null>();
  const [isLoading, setIsLoading] = useState(false);

  const { username } = useParams();

  useEffect(() => {
    if (!username) {
      setUserData(user);
    }
  }, [user, username]);

  useEffect(() => {
    if (!username) {
      return;
    }

    async function getUserProfile() {
      setIsLoading(true);

      const userProfileDataResponse = await getProfile(username as string);

      setUserData(userProfileDataResponse.data[0] as unknown as KodeBookUser);

      setIsLoading(false);
    }

    getUserProfile();
  }, [username]);

  return (
    <PageWithSidebar path="profile">
      {isLoading ? (
        <div className="h-screen flex justify-center items-center gap-3">
          <Loader className="h-12 w-12" />
          <h3 className="md:text-2xl text-lg">Searching for {username}</h3>
        </div>
      ) : (
        <div>
          {userData ? (
            <div className="flex flex-col p-5 h-screen">
              <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-5 justify-center items-center p-5 bg-appSecondaryBg rounded-lg">
                <div className="flex justify-center items-center">
                  {userData?.avatar_url ? (
                    <img
                      src={userData?.avatar_url}
                      className="aspect-square md:h-40 h-24 md:w-40 w-24 circle"
                    />
                  ) : (
                    <UserCircle className="aspect-square md:h-40 h-24 md:w-40 w-24 circle" />
                  )}
                </div>
                <div className="flex flex-col justify-center text-left mx-auto">
                  <h3 className="md:text-3xl text-xl">{userData?.full_name}</h3>
                  <h5 className="text-lpSecondaryText">
                    @{userData?.username}
                  </h5>
                </div>
                <div className="flex flex-col justify-center gap-3 mx-auto">
                  <p className="flex items-center gap-2">
                    <Briefcase size={25} />
                    Works at {userData?.works_at ?? "None"}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={25} /> {userData?.location ?? "Not provided"}
                  </p>
                </div>
                <div className="flex flex-col justify-center mx-auto">
                  <p>{userData?.followers} Followers</p>
                  <p>{userData?.following} Following</p>
                </div>
              </div>
              <div className="flex h-full p-5 bg-appSecondaryBg rounded-lg mt-5"></div>
            </div>
          ) : (
            <div className="h-screen flex justify-center items-center gap-2">
              <Prohibit size={40} />
              <h3>User not found</h3>
            </div>
          )}
        </div>
      )}
    </PageWithSidebar>
  );
};

export default Profile;
