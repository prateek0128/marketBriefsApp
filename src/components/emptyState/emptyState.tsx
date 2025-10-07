// components/EmptyState.tsx
import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import { ThemeContext } from "../../context/themeContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
const EmptyState = ({ message }: { message: string }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <View style={styles.cardShadowWrapper}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme == "light" ? colors.white : "transparent",
            borderColor:
              theme == "light"
                ? colors.octodenaryBackground
                : colors.darkUndenaryBackground,
          },
        ]}
      >
        {/* <View style={styles.illustration}> */}
        {/* <Image
          source={{ uri: "https://i.imgur.com/j5qO6Fi.png" }}
          style={{ width: 120, height: 120 }}
          resizeMode="contain"
        /> */}
        <MaterialCommunityIcons
          name="flask-empty-outline"
          size={64}
          color={theme == "light" ? "black" : "white"}
        />
        {/* </View> */}
        <Text
          style={[
            styles.text,
            { color: theme == "dark" ? colors.white : colors.octodenaryText },
          ]}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  cardShadowWrapper: {
    paddingVertical: 24,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  card: {
    width: "88%",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.tertiaryBorderColor,
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
    gap: 16,
  },
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.quinaryBackground,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    fontFamily: fontFamily.Satoshi500,
    textAlign: "center",
  },
});
