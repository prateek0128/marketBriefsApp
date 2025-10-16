// screens/AppearanceScreen.tsx

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../../context/themeContext";
import globalStyles from "../../../assets/styles/globalStyles";
import Header from "../../../components/header/header";
import {
  useNavigation,
  NavigationProp,
  CommonActions,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { useBackPressNavigate } from "../../../hooks/useBackPressNavigate";
import { colors } from "../../../assets/styles/colors";
import fontFamily from "../../../assets/styles/fontFamily";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
type ThemeOption = "light" | "dark";

const options = [
  { key: "light", label: "Light", icon: "sunny-outline" },
  { key: "dark", label: "Dark", icon: "moon-outline" },
];

export default function AboutUsScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(theme);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useBackPressNavigate("Profile");
  const openExternalLink = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Unable to open the link: " + url);
      }
    } catch (error) {
      console.error("Error opening link:", error);
      Alert.alert("Error", "Something went wrong while opening the link.");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={[globalStyles.pageContainerWithBackground(theme)]}
        contentContainerStyle={{ paddingBottom: 50, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Header
            onBackClick={() => {
              navigation.navigate("Profile");
            }}
            showThemeIcon={false}
          />
        </View>
        <Text
          style={[
            styles.header,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
        >
          About Us
        </Text>
        <Text
          style={[
            styles.aboutTextCompanyHeading,
            {
              color:
                theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
            },
          ]}
        >
          Maheshwari Innovative IT Services LLP
        </Text>
        <View style={styles.aboutTextContainer}>
          <Text
            style={[
              styles.aboutTextHeading,
              {
                color: theme === "dark" ? colors.white : colors.octodenaryText,
              },
            ]}
          >
            About Our Company
          </Text>
          <Text
            style={[
              styles.aboutText,
              {
                color: theme === "dark" ? colors.white : colors.octodenaryText,
              },
            ]}
          >
            Based in Govardhan, Maheshwari Innovative IT Services LLP is
            dedicated to providing cutting-edge IT solutions that meet the
            ever-evolving needs of our clients. As a leading service-based
            company, we specialize in creating innovative, technology-driven
            products aimed at solving real-world challenges.
          </Text>
          <Text
            style={[
              styles.aboutText,
              {
                color: theme === "dark" ? colors.white : colors.octodenaryText,
              },
            ]}
          >
            Our matrimonial app was born out of a desire to simplify the
            match-making process within the Maheshwari community. We recognized
            the challenges families face in manually browsing biodatas across
            various platforms, so we utilized our technical expertise to develop
            an automated, user-friendly solution. This app represents our
            commitment to giving back to the community through technology.
          </Text>
        </View>
        <View style={styles.contactWebsites}>
          <Text
            style={[
              styles.contactWebsitesHeading,
              {
                color: theme === "dark" ? colors.white : colors.octodenaryText,
              },
            ]}
          >
            Visit Our Websites
          </Text>
          <TouchableOpacity
            onPress={() => openExternalLink("https://miiscollp.com/")}
            style={{ flexDirection: "row", gap: 10 }}
          >
            <MaterialCommunityIcons
              name="web-check"
              size={24}
              color={
                theme === "dark" ? colors.vigenaryText : colors.sexdenaryText
              }
            />
            <Text
              style={[
                styles.contactWebsitesText,
                {
                  color:
                    theme === "dark"
                      ? colors.vigenaryText
                      : colors.sexdenaryText,
                },
              ]}
            >
              miiscollp.com
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => openExternalLink("https://marketbriefs.co.in/")}
            style={{ flexDirection: "row", gap: 10 }}
          >
            <MaterialCommunityIcons
              name="web-check"
              size={24}
              color={
                theme === "dark" ? colors.vigenaryText : colors.sexdenaryText
              }
            />
            <Text
              style={[
                styles.contactWebsitesText,
                {
                  color:
                    theme === "dark"
                      ? colors.vigenaryText
                      : colors.sexdenaryText,
                },
              ]}
            >
              marketbriefs.co.in
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    marginTop: 0,
  },

  header: {
    fontSize: 32,
    fontFamily: fontFamily.Inter700,
    marginBottom: 24,
    marginTop: 10,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
    color: "#111",
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionText: {
    fontSize: 16,
    fontFamily: fontFamily.Inter500,
  },
  radioOuterSelected: {
    borderColor: "#4A46E5",
  },
  radioOuter: {
    height: 22,
    width: 22,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#aaa",
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 12,
  },

  aboutTextCompanyHeading: {
    fontFamily: fontFamily.Satoshi900,
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  aboutTextContainer: { gap: 8 },
  aboutTextHeading: {
    fontFamily: fontFamily.Satoshi900,
    fontSize: 16,
    // textAlign:"center"
    marginBottom: 8,
  },
  aboutText: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 16,
    // textAlign:"center"
  },
  contactWebsites: {
    gap: 8,
    marginTop: 20,
  },
  contactWebsitesHeading: {
    fontFamily: fontFamily.Satoshi900,
    fontSize: 16,
    // textAlign:"center"
    marginBottom: 8,
  },
  contactWebsitesText: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 16,
  },
});
