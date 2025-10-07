import React, { use, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";

import {
  DarkHelp,
  DarkMyintresetIcon,
  DarkProfileIcon,
  DarkSavedIcon,
  DarkSetting,
  EditProfileIcon,
  HelpIcon,
  MyIntrestIcon,
  SavedIcon,
  SettingIcon,
  ForwardIcon,
  SeePlansArrow,
  AppearenceIconBlack,
  AppearenceIconWhite,
} from "../../../assets/icons/components/Profile";

import { Ionicons } from "@expo/vector-icons";
import {
  useNavigation,
  NavigationProp,
  CommonActions,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import fontFamily from "../../../assets/styles/fontFamily";
import { ThemeContext } from "../../../context/themeContext";
import { colors } from "../../../assets/styles/colors";
import globalStyles from "../../../assets/styles/globalStyles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../../context/loginAuthContext";
import Header from "../../../components/header/header";
import { useBackPressNavigate } from "../../../hooks/useBackPressNavigate";
import { storage } from "../../../utils/storage";
import { loadProfileData } from "../../../utils/loadProfileData";
import ProfileAvatar from "../../../components/profileAvatar/profileAvatar";
type OptionItem = {
  label: string;
  darkIcon: React.ReactNode;
  lightIcon: React.ReactNode;
  onPress: () => void;
};

const ProfileScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("--");
  const [userEmail, setUserEmail] = useState("--");
  const [userProfile, setUserProfile] = useState("");
  const handleLogout = () => {
    console.log("Logged out");
    logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      })
    );
  };
  const accountOptions: OptionItem[] = [
    {
      label: "Profile Details",
      darkIcon: <DarkProfileIcon />,
      lightIcon: <EditProfileIcon />,
      onPress: () => navigation.navigate("EditProfileScreen"),
    },
    // {
    //   label: "My Interests",
    //   darkIcon: <DarkMyintresetIcon />,
    //   lightIcon: <MyIntrestIcon />,
    //   onPress: () => navigation.navigate("ChooseYourInterests", {}),
    // },
    // {
    //   label: "Saved Articles",
    //   darkIcon: <DarkSavedIcon />,
    //   lightIcon: <SavedIcon />,
    //   onPress: () =>
    //     navigation.navigate("Profile", { screen: "SavedArticles" }),
    // },
  ];
  const moreOptions: OptionItem[] = [
    {
      label: "Help",
      darkIcon: <DarkHelp />,
      lightIcon: <HelpIcon />,
      onPress: () => {},
    },
    {
      label: "Appearence",
      darkIcon: <AppearenceIconWhite />,
      lightIcon: <AppearenceIconBlack />,
      onPress: () => navigation.navigate("AppearanceScreen"),
    },
  ];

  const renderSection = (title: string, options: OptionItem[]) => {
    return (
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color:
                theme === "light"
                  ? colors.octodenaryText
                  : colors.darkPrimaryText,
            },
          ]}
        >
          {title}
        </Text>
        <View>{options.map(renderOption)}</View>
      </View>
    );
  };
  const renderOption = ({
    label,
    darkIcon,
    lightIcon,
    onPress,
  }: OptionItem) => {
    return (
      <TouchableOpacity key={label} onPress={onPress} style={styles.optionRow}>
        <View style={styles.iconOptionContainer}>
          {theme === "dark" ? darkIcon : lightIcon}
          <Text
            style={[
              styles.labelText,
              {
                color:
                  theme === "dark"
                    ? colors.nonaryBorder
                    : colors.tertiaryButtonColor,
              },
            ]}
          >
            {label}
          </Text>
        </View>
        <View style={styles.appearenceTextArrowContainer}>
          {label == "Appearence" && (
            <Text
              style={[
                styles.appearenceText,
                {
                  color:
                    theme == "dark"
                      ? colors.tertiaryButtonColor
                      : colors.darkSenaryText,
                },
              ]}
            >
              {theme == "dark" ? "Dark" : "Light"}
            </Text>
          )}
          <TouchableOpacity onPress={() => {}}>
            <ForwardIcon />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const { name, email, profile } = await loadProfileData();
      setUserName(name);
      setUserEmail(email);
      setUserProfile(profile);
    };

    fetchProfile();
  }, []);
  useBackPressNavigate("Home");
  return (
    <SafeAreaView style={[globalStyles.pageContainerWithBackground(theme)]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}
      >
        <View>
          <View style={styles.headerContainer}>
            <Header showBackArrow={false} showThemeIcon={false} />
          </View>
          <View
            style={[
              styles.profileContainer,
              // {
              //   backgroundColor:
              //     theme === "dark"
              //       ? colors.darkQuinaryBackground
              //       : colors.primaryBackground,
              // },
            ]}
          >
            {userProfile ? (
              <Image
                source={{ uri: userProfile }}
                style={styles.profileImage}
              />
            ) : (
              <ProfileAvatar name={userName} />
            )}
            <View style={[styles.userDetailsContainer]}>
              <Text
                style={[
                  styles.userNameStyle,
                  {
                    color:
                      theme === "dark"
                        ? colors.darkPrimaryText
                        : colors.octodenaryText,
                  },
                ]}
              >
                {userName || "--"}
              </Text>
              <Text
                style={[
                  styles.userEmailStyle,
                  {
                    color:
                      theme === "light"
                        ? colors.novemdenaryText
                        : colors.darkSenaryText,
                  },
                ]}
              >
                {userEmail || "--"}
              </Text>
            </View>
          </View>
          {/* <View
            style={[
              styles.premiumButton,
              {
                backgroundColor:
                  theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
              },
            ]}
          >
            <View style={{ gap: 12 }}>
              <Text style={[styles.premiumText]}>Premium Membership</Text>
              <Text
                style={[
                  styles.premiumSubText,
                  {
                    color:
                      theme === "light"
                        ? colors.septendenaryBackground
                        : colors.white,
                  },
                ]}
              >
                Upgrade for more features
              </Text>
            </View>
            <TouchableOpacity
              style={styles.seePlansContainer}
              onPress={() => {
                navigation.navigate("Profile", { screen: "PaymentScreen" });
              }}
            >
              <Text style={[styles.seePlansText]}>See Plans</Text>
              <SeePlansArrow />
            </TouchableOpacity>
          </View> */}
          <View style={styles.optionContainer}>
            {renderSection("Account", accountOptions)}
            {renderSection("More", moreOptions)}
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text
              style={[
                styles.logoutText,
                {
                  color: colors.quaternaryButtonColor,
                },
              ]}
            >
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 30,
  },
  profileContainer: {
    alignItems: "center",
    marginVertical: 20,
    gap: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 9999,
  },
  userDetailsContainer: { gap: 10, alignItems: "center" },
  userNameStyle: {
    fontSize: 18,
    fontFamily: fontFamily.Cabinet700,
  },
  userEmailStyle: {
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
  },
  premiumButton: {
    borderRadius: 12,
    marginBottom: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  premiumText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fontFamily.Inter700,
  },
  premiumSubText: {
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
  },
  seePlansContainer: { flexDirection: "row", alignItems: "center", gap: 12 },
  seePlansText: {
    color: colors.white,
    fontSize: 12,
    fontFamily: fontFamily.Inter400,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  optionContainer: {
    gap: 16,
  },
  iconOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconWrapper: {},
  labelText: {
    fontSize: 16,
    fontFamily: fontFamily.Inter400,
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: fontFamily.Inter700,
  },
  logoutButton: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  logoutText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 16,
  },
  appearenceTextArrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  appearenceText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 12,
  },
});
