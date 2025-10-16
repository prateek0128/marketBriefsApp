import { NavigatorScreenParams } from "@react-navigation/native";

// types/navigation.ts
export type RootStackParamList = {
  Splash: undefined;
  Start: undefined;
  Welcome: undefined;
  SignUp: undefined;
  Login: undefined;
  TellUsSomething?: { name?: string | null; email?: string };
  ChooseYourInterests?: { expertiseLevel?: string | null };
  BottomTabNavigator: NavigatorScreenParams<BottomTabParamList>;
  Home: undefined;
  HeadlineDetailsScreen?: {
    newsId?: string;
    imageKey?: string;
    path?: string;
  };
  Profile: NavigatorScreenParams<ProfileStackParamList>;
  Saved?: undefined;
  EditProfileScreen?: undefined;
  AppearanceScreen?: undefined;
  ContactUsScreen?: undefined;
  AboutUsScreen?: undefined;
  AboutAppScreen?: undefined;
};
export type BottomTabParamList = {
  Home?: undefined;
  Interests?: undefined;
  Saved?: undefined;
  Profile?: NavigatorScreenParams<ProfileStackParamList>;
};
export type HomeStackParamList = {
  Home: undefined;
  HeadlineDetailsScreen: undefined;
};

export type ProfileStackParamList = {
  PaymentScreen?: undefined;
  Profile?: undefined;
  EditProfileScreen?: undefined;
  AppearanceScreen?: undefined;
  ContactUsScreen?: undefined;
  AboutUsScreen?: undefined;
  AboutAppScreen?: undefined;
};
