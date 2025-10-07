import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  getItem: async (key: string) => {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  },
  setItem: async (key: string, value: string) => {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string) => {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  },
  async multiGet(keys: string[]) {
    if (Platform.OS === "web") {
      return keys.map((key) => [key, localStorage.getItem(key)]);
    }
    return await AsyncStorage.multiGet(keys);
  },
  async multiSet(entries: [string, string][]) {
    if (Platform.OS === "web") {
      entries.forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });
      return;
    }
    await AsyncStorage.multiSet(entries);
  },
  async multiRemove(keys: string[]) {
    if (Platform.OS === "web") {
      keys.forEach((key) => localStorage.removeItem(key));
      return;
    }
    await AsyncStorage.multiRemove(keys);
  },
  async clear() {
    if (Platform.OS === "web") {
      localStorage.clear();
    } else {
      await AsyncStorage.clear();
    }
  },
};
