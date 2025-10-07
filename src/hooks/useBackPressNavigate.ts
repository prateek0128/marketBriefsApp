import {
  useFocusEffect,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import { BackHandler } from "react-native";
import { useCallback } from "react";

export function useBackPressNavigate(targetRoute: string, params?: object) {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (params !== undefined) {
          //@ts-ignore
          navigation.navigate(targetRoute as never, params as never);
        } else {
          navigation.navigate(targetRoute as never);
        }
        return true;
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [navigation, targetRoute, params])
  );
}
