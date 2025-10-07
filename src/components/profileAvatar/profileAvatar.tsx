import React from "react";
import { View, Text, StyleSheet } from "react-native";
import fontFamily from "../../assets/styles/fontFamily";

type ProfileAvatarProps = {
  name: string;
  size?: number;
  backgroundColor?: string;
  textColor?: string;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  name,
  size = 100,
  backgroundColor = "#6C63FF",
  textColor = "#fff",
}) => {
  // Take the first letter of the name and uppercase it
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Text style={[styles.initial, { color: textColor, fontSize: size / 2 }]}>
        {initial}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    fontFamily: fontFamily.Cabinet700,
  },
});

export default ProfileAvatar;
