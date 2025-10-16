// components/HeadlineDetailCard.js

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../../context/themeContext";

import {
  BackArrowIcon,
  BackArrowIconWhite,
  BackArrowDetailsDark,
  BackArrowDetailsLight,
  ShareIcon,
  ShareIconWhite,
} from "../../assets/icons/components/header";

import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import {
  LikePostIconFilled,
  LikePostIcon,
  BookmarkIcon,
  BookmarkIconFilled,
  BookmarkIconFilledWhite,
  BookmarkIconWhite,
  LikePostIconFilledWhite,
  LikePostIconWhite,
} from "../../assets/icons/components/headlineDetailsView";
import ShareSheet from "../sharedSheet/sharedSheet";
import { BackArrow, BackArrowWhite } from "../../assets/icons/components/logIn";
import Feather from "@expo/vector-icons/Feather";

const { width } = Dimensions.get("window");
type HeaderProps = {
  backArrow?: boolean;
  showBackArrow?: boolean;
  onBackClick?: () => void;
  liked?: boolean;
  setLiked?: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleLikeClick?: () => void;
  bookmarked?: boolean;
  setBookmarked?: React.Dispatch<React.SetStateAction<boolean>>;
  onToggleBookmarkClick?: () => void;
  onClickLink?: () => void;
  shareUrl?: string;
  showThemeIcon?: boolean;
  showActivityIcons?: boolean;
};

const Header = ({
  backArrow,
  showBackArrow = true,
  onBackClick,
  liked,
  setLiked,
  onToggleLikeClick,
  bookmarked,
  setBookmarked,
  onToggleBookmarkClick,
  onClickLink,
  shareUrl,
  showThemeIcon,
  showActivityIcons = false,
}: HeaderProps) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.headerConatiner}>
      <TouchableOpacity onPress={onBackClick}>
        {showBackArrow && (
          <View
            style={[
              styles.leftHeaderPart,
              {
                borderColor:
                  theme === "dark"
                    ? colors.tertiaryButtonColor
                    : colors.nonaryBorder,
              },
            ]}
          >
            {/* {theme === "light" ? <BackArrowIcon /> : <BackArrowIconWhite />} */}
            {backArrow ? (
              theme === "dark" ? (
                <BackArrowDetailsDark />
              ) : (
                <BackArrowDetailsLight />
              )
            ) : theme === "dark" ? (
              <BackArrowWhite />
            ) : (
              <BackArrow />
            )}
          </View>
        )}
      </TouchableOpacity>
      {showActivityIcons && (
        <View style={styles.rightHeaderPart}>
          <TouchableOpacity
            onPress={onToggleLikeClick}
            style={[
              styles.leftHeaderPart,
              {
                borderColor:
                  theme === "dark"
                    ? colors.tertiaryButtonColor
                    : colors.nonaryBorder,
              },
            ]}
          >
            {theme === "light" ? (
              liked ? (
                <LikePostIconFilled />
              ) : (
                <LikePostIcon />
              )
            ) : liked ? (
              <LikePostIconFilledWhite />
            ) : (
              <LikePostIconWhite />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onToggleBookmarkClick}
            style={[
              styles.leftHeaderPart,
              {
                borderColor:
                  theme === "dark"
                    ? colors.tertiaryButtonColor
                    : colors.nonaryBorder,
              },
            ]}
          >
            {theme === "light" ? (
              bookmarked ? (
                <BookmarkIconFilled />
              ) : (
                <BookmarkIcon />
              )
            ) : bookmarked ? (
              <BookmarkIconFilledWhite />
            ) : (
              <BookmarkIconWhite />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setOpen(true)}
            style={[
              styles.leftHeaderPart,
              {
                borderColor:
                  theme === "dark"
                    ? colors.tertiaryButtonColor
                    : colors.nonaryBorder,
              },
            ]}
          >
            {theme === "light" ? <ShareIcon /> : <ShareIconWhite />}
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={onClickLink}
            style={[
              styles.leftHeaderPart,
              {
                borderColor:
                  theme === "dark"
                    ? colors.tertiaryButtonColor
                    : colors.nonaryBorder,
              },
            ]}
          >
            {theme === "light" ? (
              <Feather name="external-link" size={24} color="#404446" />
            ) : (
              <Feather name="external-link" size={24} color="white" />
            )}
          </TouchableOpacity> */}
        </View>
      )}
      {/* {showThemeIcon && (
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={styles.text}>{theme === "dark" ? "☀️" : "🌙"}</Text>
        </TouchableOpacity>
      )} */}
      <ShareSheet
        visible={open}
        onClose={() => setOpen(false)}
        url={shareUrl}
        message={`Have a look at  "URL"`}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerConatiner: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftHeaderPart: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 999,
    borderWidth: 1,
  },
  rightHeaderPart: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
});
