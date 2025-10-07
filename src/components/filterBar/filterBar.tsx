import React, { useState, useEffect, useContext } from "react";
import { IconButton, Menu } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import fontFamily from "../../assets/styles/fontFamily";
import { ThemeContext } from "../../context/themeContext";
import { colors } from "../../assets/styles/colors";

const filters = [
  { label: "Recent", value: "recent" },
  { label: "Last 3 Days", value: "3days" },
  { label: "Last 7 Days", value: "7days" },
  { label: "Last 30 Days", value: "30days" },
];

const FilterBar = ({
  onFilterChange,
  selectedFilter,
  setSelectedFilter,
}: {
  onFilterChange: (val: string) => void;
  selectedFilter: string;
  setSelectedFilter: (val: string) => void;
}) => {
  const [visible, setVisible] = useState(false);
  //   const [selected, setSelected] = useState(selectedFilter);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (value: string) => {
    setSelectedFilter(value);
    onFilterChange(value);
    closeMenu();
  };

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton icon="filter-outline" size={24} onPress={openMenu} />
        }
        contentStyle={{
          backgroundColor:
            theme === "light" ? colors.white : colors.darkUndenaryBackground, // ✅ Correct way
          borderColor:
            theme == "light"
              ? colors.nonaryBorder
              : colors.darkUndenaryBackground,
        }}
      >
        {filters.map((item) => {
          const isActive = item.value === selectedFilter;
          return (
            <Menu.Item
              key={item.value}
              onPress={() => handleSelect(item.value)}
              title={item.label}
              titleStyle={[
                styles.menuItemsText,
                isActive && { fontWeight: "bold" }, // primary color
                {
                  color: isActive
                    ? "#6200ee"
                    : theme == "light"
                    ? colors.octodenaryText
                    : colors.white,
                },
              ]}
            />
          );
        })}
      </Menu>
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  menuStyle: { borderWidth: 1 },
  menuItemsText: {
    fontSize: 16,
    fontFamily: fontFamily.Satoshi400,
  },
});
