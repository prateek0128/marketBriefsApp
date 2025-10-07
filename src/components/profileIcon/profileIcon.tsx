import React from "react";
import {
  FemaleProfileIcon,
  MaleProfileIcon,
} from "../../assets/icons/components/headlineDetailsView";

type ProfileIconProps = {
  type?: "male" | "female";
  size?: number;
};

const ProfileIcon: React.FC<ProfileIconProps> = ({
  type = "male",
  size = 40,
}) => {
  return type === "female" ? (
    <FemaleProfileIcon width={size} height={size} />
  ) : (
    <MaleProfileIcon width={size} height={size} />
  );
};

export default ProfileIcon;
