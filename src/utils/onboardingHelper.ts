// utils/onboardingHelper.ts

import { storage } from "./storage";

type NavigationMethod = "navigate" | "replace";

export const handleOnboardingFlow = async (
  navigation: any,
  method: NavigationMethod = "navigate" // default = navigate
) => {
  try {
    const onboardingCompletedStr = await storage.getItem("onboardingCompleted");
    const onboardingCompleted = onboardingCompletedStr
      ? JSON.parse(onboardingCompletedStr)
      : false;

    console.log("Onboarding Raw:", onboardingCompletedStr);
    console.log("Onboarding Completed:", onboardingCompleted);
    if (onboardingCompleted) {
      navigation[method]("BottomTabNavigator");
    } else {
      navigation[method]("TellUsSomething", {});
    }
  } catch (err) {
    console.error("Onboarding flow error:", err);
    navigation[method]("Start"); // fallback
  }
};
