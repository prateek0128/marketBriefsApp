import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/homePage/homeScreen/homeScreen";
import HeadlineDetailsScreen from "../../screens/homePage/headlineDetailsScreen/headlineDetailsScreen";
import { HomeStackParamList, RootStackParamList } from "../../types/navigation";
import ProfileScreen from "../../screens/profilePage/profileScreen/profileScreen";
import SavedArticles from "../../screens/savedArticle/savedArticle";
import { ProfileStackParamList } from "../../types/navigation";
import EditProfileScreen from "../../screens/profilePage/editProfileScreen/editProfileScreen";
import PaymentScreen from "../../screens/profilePage/paymentScreen/paymentScreen";
import AppearanceScreen from "../../screens/profilePage/appearenceScreen/appearenceScreen";
import ContactUsScreen from "../../screens/profilePage/contactUsScreen/contactUsScreen";
import AboutUsScreen from "../../screens/profilePage/aboutUsScreen/aboutUsScreen";
import AboutAppScreen from "../../screens/profilePage/aboutAppScreen/aboutAppScreen";

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="AppearanceScreen" component={AppearanceScreen} />
      <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
      <Stack.Screen name="AboutUsScreen" component={AboutUsScreen} />
      <Stack.Screen name="AboutAppScreen" component={AboutAppScreen} />
    </Stack.Navigator>
  );
}
