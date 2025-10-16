import React, { useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as Application from "expo-application";
import { Linking } from "react-native";
import { colors } from "../../../assets/styles/colors";
import { ThemeContext } from "../../../context/themeContext";
import globalStyles from "../../../assets/styles/globalStyles";
import Header from "../../../components/header/header";
import fontFamily from "../../../assets/styles/fontFamily";
import { MarketBriefsLogo } from "../../../assets/icons/components/logo";
import ClippedSVG from "../../../components/clippedSVG/clippedSVG";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  useNavigation,
  NavigationProp,
  CommonActions,
} from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { useBackPressNavigate } from "../../../hooks/useBackPressNavigate";
export default function AboutAppScreen() {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const appVersion = Application.nativeApplicationVersion || "1.0.0";
  const appName = Application.applicationName || "My Awesome App";
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
    <ScrollView
      style={[globalStyles.pageContainerWithBackground(theme)]}
      contentContainerStyle={{ flexGrow: 1, padding: 20 }}
    >
      <Header
        onBackClick={() => {
          navigation.navigate("Profile");
        }}
        showThemeIcon={false}
      />
      <Text
        style={[
          styles.header,
          {
            color: theme === "dark" ? colors.white : colors.octodenaryText,
          },
        ]}
      >
        About App
      </Text>
      <View style={{ alignItems: "center", marginVertical: 20 }}>
        {/* <View style={{width:100,height:100}}>  */}
        {/* <ClippedSVG
          width={100}
          height={100}
          radius={16}
          ImageComponent={MarketBriefsLogo}
        /> */}
        {/* <MarketBriefsLogo /> */}
        {/* </View> */}

        <Text
          style={[
            styles.appName,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
        >
          Market Briefs
        </Text>
        <Text
          style={[
            styles.appVersion,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
        >
          Version {appVersion}
        </Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Text
          style={[
            styles.appTextHeading,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
        >
          About This App
        </Text>
        <Text
          style={[
            styles.appText,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
        >
          MarketBriefs is a sleek, user-centric app designed to bring curated
          insights from the portfolio and market world directly to your
          fingertips. Whether you're an investor, professional, or enthusiast,
          MarketBriefs simplifies the exploration of project portfolios,
          financial trends, and industry briefs through an intuitive, visually
          engaging interface. Built for speed and clarity, the app streamlines
          navigation between case studies, performance metrics, and company
          profiles, making it easy to discover what matters most. Our goal is to
          bridge the gap between complex data and actionable knowledge —
          empowering you to make informed decisions with confidence.
        </Text>
      </View>

      <View style={styles.contactWebsites}>
        <Text
          style={[
            styles.appTextHeading,
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
                  theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
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
                  theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
              },
            ]}
          >
            marketbriefs.co.in
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 40, alignItems: "center" }}>
        <Text
          style={[
            styles.companyDetails,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
        >
          © {new Date().getFullYear()} Maheshwari Innovative IT Services LLP
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
    fontFamily: fontFamily.Inter700,
    marginBottom: 24,
    marginTop: 10,
    textAlign: "center",
  },
  appName: {
    fontFamily: fontFamily.Inter700,
    fontSize: 24,
    marginTop: 8,
  },
  appVersion: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 16,
    marginTop: 8,
    lineHeight: 12,
  },
  appTextHeading: {
    fontFamily: fontFamily.Satoshi700,
    fontSize: 16,
    marginTop: 8,
  },
  appText: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 16,
    marginTop: 8,
  },
  companyDetails: {
    fontFamily: fontFamily.Satoshi500,
    fontSize: 10,
  },
  contactWebsites: {
    gap: 8,
    marginTop: 16,
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
