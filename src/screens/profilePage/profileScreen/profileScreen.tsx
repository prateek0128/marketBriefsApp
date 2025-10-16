import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AboutUsDarkIcon,
  AboutUsLightIcon,
  AppearenceIconBlack,
  AppearenceIconWhite,
  ContactUsDarkIcon,
  ContactUsLightIcon,
  DarkProfileIcon,
  EditProfileIcon,
  ForwardIcon,
  PrivacyDarkIcon,
  PrivacyLightIcon,
  TermsDarkIcon,
  TermsLightIcon,
} from "../../../assets/icons/components/profile";
import { colors } from "../../../assets/styles/colors";
import fontFamily from "../../../assets/styles/fontFamily";
import globalStyles from "../../../assets/styles/globalStyles";
import Header from "../../../components/header/header";
import ProfileAvatar from "../../../components/profileAvatar/profileAvatar";
import { AuthContext } from "../../../context/loginAuthContext";
import { ThemeContext } from "../../../context/themeContext";
import { useBackPressNavigate } from "../../../hooks/useBackPressNavigate";
import { RootStackParamList } from "../../../types/navigation";
import { loadProfileData } from "../../../utils/loadProfileData";
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
      label: "Account Settings",
      darkIcon: <DarkProfileIcon />,
      lightIcon: <EditProfileIcon />,
      onPress: () => navigation.navigate("EditProfileScreen"),
    },
    // {
    //   label: "Delete Account",
    //   darkIcon: <AppearenceIconWhite />,
    //   lightIcon: <AppearenceIconBlack />,
    //   onPress: () => setShowDeleteModal(true),
    // },
  ];
  const supportOptions: OptionItem[] = [
    // {
    //   label: "Help",
    //   darkIcon: <DarkHelp />,
    //   lightIcon: <HelpIcon />,
    //   onPress: () => {},
    // },
    {
      label: "Contact Us",
      darkIcon: <ContactUsDarkIcon />,
      lightIcon: <ContactUsLightIcon />,
      onPress: () => navigation.navigate("ContactUsScreen"),
    },
  ];
  const legalOptions: OptionItem[] = [
    {
      label: "Privacy Policy",
      darkIcon: <PrivacyDarkIcon />,
      lightIcon: <PrivacyLightIcon />,
      onPress: () => {
        Linking.openURL("https://marketbriefs.co.in/privacypolicy").catch(
          (err) => console.error("Failed to open URL:", err)
        );
      },
    },
    {
      label: "Terms and Conditions",
      darkIcon: <TermsDarkIcon />,
      lightIcon: <TermsLightIcon />,
      onPress: () => {
        Linking.openURL("https://marketbriefs.co.in/termsanconditions").catch(
          (err) => console.error("Failed to open URL:", err)
        );
      },
    },
  ];
  const appInfoOptions: OptionItem[] = [
    {
      label: "About Us",
      darkIcon: <AboutUsDarkIcon />,
      lightIcon: <AboutUsLightIcon />,
      onPress: () => navigation.navigate("AboutUsScreen"),
    },
    {
      label: "About App",
      darkIcon: <AboutUsDarkIcon />,
      lightIcon: <AboutUsLightIcon />,
      onPress: () => navigation.navigate("AboutAppScreen"),
    },
    {
      label: "Appearence",
      darkIcon: <AppearenceIconWhite />,
      lightIcon: <AppearenceIconBlack />,
      onPress: () => navigation.navigate("AppearanceScreen"),
    },
  ];
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
          <TouchableOpacity onPress={onPress}>
            <ForwardIcon />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[
        globalStyles.pageContainerWithBackground(theme),
        { flex: 1, justifyContent: "space-between", paddingBottom: 10 },
      ]}
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
            <Image source={{ uri: userProfile }} style={styles.profileImage} />
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
        <>
          {/* <View
            style={[
              styles.premiumButton,
              {
                backgroundColor:
                  theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
              },
            ]}
          >
            <View
              style={{ flexDirection: "row", gap: 16, alignItems: "center" }}
            >
              <View
                style={[
                  styles.premiumIconContainer,
                  {
                    backgroundColor:
                      theme == "dark"
                        ? colors.octodenaryText
                        : colors.primaryBackground,
                  },
                ]}
              >
                {theme == "dark" ? <PremiumIconDark /> : <PremiumIconLight />}
              </View>
              <View style={{ gap: 12 }}>
                <Text style={[styles.premiumText]}>Get Premium</Text>
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
                  Monthly Subscription
                </Text>
              </View>
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
        </>
      </View>
      <View style={{ flex: 1, gap: 30 }}>
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            <View style={styles.optionContainer}>
              {renderSection("Profile", accountOptions)}
              {renderSection("Support", supportOptions)}
              {renderSection("Legal", legalOptions)}
              {renderSection("App Info", appInfoOptions)}
            </View>
          </ScrollView>
        </View>
        <View style={styles.logoutContainer}>
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
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerContainer: {
    //  marginTop: 30,
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
  premiumIconContainer: {
    padding: 12,
    borderRadius: 24,
    gap: 10,
    display: "flex",
    justifyContent: "center",
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
    flex: 1,
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

  appearenceTextArrowContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  appearenceText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 12,
  },
  logoutContainer: {
    // position: "absolute",
    // bottom: 20,
    // left: 0,
    // right: 0,
    alignItems: "center",
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
});
