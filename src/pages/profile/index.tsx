import PageWithSidebar from "../../components/PageWithSidebar";

const Profile = () => {
  return (
    <PageWithSidebar path="profile">
      <div className="flex flex-col p-5 h-screen">
        <div className="flex gap-5 justify-around items-center p-5 bg-appSecondaryBg rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1650110002977-3ee8cc5eac91?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="aspect-square h-40 w-40 circle"
          />
          {/* </div> */}
          <div>
            <h3>Parbhat Sharma</h3>
            <h5 className="text-lpSecondaryText">@parbhat.sharma</h5>
          </div>
          <div className="flex flex-col justify-center">
            <p>Works at MS as SWE</p>
            <p>Odisha, India</p>
          </div>
          <div className="flex flex-col justify-center">
            <p>0 Followers</p>
            <p>0 Following</p>
          </div>
        </div>
        <div className="flex h-full p-5 bg-appSecondaryBg rounded-lg mt-5"></div>
      </div>
    </PageWithSidebar>
  );
};

export default Profile;
