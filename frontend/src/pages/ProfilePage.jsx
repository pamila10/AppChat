import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaImage } from "react-icons/fa";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="container">
      <div>
        <h1 className="h1">Profile</h1>
        <p className="subtitle">Your profile information</p>
      </div>
      <div className="profile">
        <div className="profile_bl">
          <img className="profile_img"
            src={selectedImg || authUser.profilePic || "/avatar.png"}
            alt="Profile"
          />
          <div className="profile_uploadBl">
            <label htmlFor="avatar-upload" className="profile_uploadImg">
              <FaImage/>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
        </div>
        <span className="text_sm">
          {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
        </span>
      </div>
      <div className="profileInfo">
        <div className="profileInfo_bl">
          <div>Full Name</div>
          <div className="profileInfo_field">{authUser?.fullName}</div>
        </div>
        <div className="profileInfo_bl">
          <div>Email Address</div>
          <div className="profileInfo_field">{authUser?.email}</div>
        </div>
      </div>
      <div className="accountInfo">
        <h3 className="h3">Account Information</h3>
        <div className="accountInfo_wrap">
          <div className="accountInfo_bl">
            <span>Member Since</span>
            <span>{authUser.createdAt?.split("T")[0]}</span>
          </div>
          <div className="accountInfo_bl">
            <span>Account Status</span>
            <span>Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;