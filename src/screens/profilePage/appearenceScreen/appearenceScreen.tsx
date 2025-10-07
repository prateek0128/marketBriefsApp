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
type ThemeOption = "light" | "dark";

const options = [
  { key: "light", label: "Light", icon: "sunny-outline" },
  { key: "dark", label: "Dark", icon: "moon-outline" },
];

export default function AppearanceScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(theme);
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
        Appearence
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
          selectedTheme === "light" && {
            borderColor:
              theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
          },
        ]}
        onPress={() => {
          setSelectedTheme("light");
          if (theme == "dark") {
            toggleTheme();
          }
        }}
      >
        <View style={styles.optionLeft}>
          <Ionicons
            name={"sunny-outline"}
            size={22}
            color={
              selectedTheme === "light"
                ? theme === "dark"
                  ? colors.vigenaryText
                  : colors.sexdenaryText
                : theme == "dark"
                ? "#fff"
                : "#303437"
            }
          />
          <Text
            style={[
              styles.optionText,
              {
                color: theme === "dark" ? colors.white : colors.octodenaryText,
              },
              selectedTheme === "light" && {
                color:
                  theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
              },
            ]}
          >
            {"Light"}
          </Text>
        </View>
        <View
          style={[
            styles.radioOuter,
            {
              borderColor:
                theme === "dark"
                  ? colors.duodenaryBorderColor
                  : colors.darkQuinaryText,
            },
            selectedTheme === "light" && {
              borderColor:
                theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
            },
          ]}
        >
          {selectedTheme === "light" && (
            <View
              style={[
                styles.radioInner,
                {
                  backgroundColor:
                    theme === "dark"
                      ? colors.vigenaryText
                      : colors.sexdenaryText,
                },
              ]}
            />
          )}
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
          selectedTheme === "dark" && {
            borderColor:
              theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
          },
        ]}
        onPress={() => {
          setSelectedTheme("dark");
          if (theme == "light") {
            toggleTheme();
          }
        }}
      >
        <View style={styles.optionLeft}>
          <Ionicons
            name={"moon-outline"}
            size={22}
            color={
              selectedTheme === "dark"
                ? theme === "dark"
                  ? colors.vigenaryText
                  : colors.sexdenaryText
                : theme == "dark"
                ? "#fff"
                : "#303437"
            }
          />
          <Text
            style={[
              styles.optionText,
              {
                color: theme === "dark" ? colors.white : colors.octodenaryText,
              },
              selectedTheme === "dark" && {
                color:
                  theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
              },
            ]}
          >
            {"Dark"}
          </Text>
        </View>
        <View
          style={[
            styles.radioOuter,
            {
              borderColor:
                theme === "dark"
                  ? colors.duodenaryBorderColor
                  : colors.darkQuinaryText,
            },
            selectedTheme === "dark" && {
              borderColor:
                theme === "dark" ? colors.vigenaryText : colors.sexdenaryText,
            },
          ]}
        >
          {selectedTheme === "dark" && (
            <View
              style={[
                styles.radioInner,
                {
                  backgroundColor:
                    theme === "dark"
                      ? colors.vigenaryText
                      : colors.sexdenaryText,
                },
              ]}
            />
          )}
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
});
