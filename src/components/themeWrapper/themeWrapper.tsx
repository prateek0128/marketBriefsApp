// src/components/ThemedContainer.tsx
import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../../assets/styles/colors";
import { ThemeContext } from "../../context/themeContext";

const ThemedContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "dark" ? colors.octodenaryText : colors.primaryBackground,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ThemedContainer;
