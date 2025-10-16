// screens/AppearanceScreen.tsx

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
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
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
type ThemeOption = "light" | "dark";

const options = [
  { key: "light", label: "Light", icon: "sunny-outline" },
  { key: "dark", label: "Dark", icon: "moon-outline" },
];

export default function ContactUsScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  useBackPressNavigate("Profile");
  return (
    <View style={[globalStyles.pageContainerWithBackground(theme)]}>
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
        Contact Us
      </Text>
      <TouchableOpacity
        style={[
          styles.optionRow,
          {
            backgroundColor:
              theme === "dark" ? colors.darkPrimaryBackground : colors.white,
            borderColor:
              theme === "dark"
                ? colors.duodenaryBorderColor
                : colors.darkQuinaryText,
          },
        ]}
        onPress={() => {}}
      >
        <View style={styles.optionLeft}>
          <FontAwesome
            name="phone"
            size={24}
            color={
              theme === "dark" ? colors.vigenaryText : colors.sexdenaryText
            }
          />
          <View style={styles.contactDetailsContainer}>
            <Text
              style={[
                styles.optionText,
                {
                  color:
                    theme === "dark" ? colors.white : colors.octodenaryText,
                },
              ]}
            >
              {"Phone"}
            </Text>
            <Text
              style={[
                styles.optionText,
                {
                  color:
                    theme === "dark"
                      ? colors.vigenaryText
                      : colors.sexdenaryText,
                },
              ]}
            >
              {"+91 9354287590"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.optionRow,
          {
            backgroundColor:
              theme === "dark" ? colors.darkPrimaryBackground : colors.white,
            borderColor:
              theme === "dark"
                ? colors.duodenaryBorderColor
                : colors.darkQuinaryText,
          },
        ]}
        onPress={() => {}}
      >
        <View style={styles.optionLeft}>
          <MaterialIcons
            name="email"
            size={24}
            color={
              theme === "dark" ? colors.vigenaryText : colors.sexdenaryText
            }
          />
          <View style={styles.contactDetailsContainer}>
            <Text
              style={[
                styles.optionText,
                {
                  color:
                    theme === "dark" ? colors.white : colors.octodenaryText,
                },
              ]}
            >
              {"Email"}
            </Text>
            <Text
              style={[
                styles.optionText,
                {
                  color:
                    theme === "dark"
                      ? colors.vigenaryText
                      : colors.sexdenaryText,
                },
              ]}
            >
              {"smartmaheshwari.app@gmail.com"}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
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
    lineHeight: 18,
  },
  contactDetailsContainer: {
    gap: 8,
  },
});
