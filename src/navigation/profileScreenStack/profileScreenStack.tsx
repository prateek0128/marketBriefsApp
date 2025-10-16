import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AboutAppScreen from "../../screens/profilePage/aboutAppScreen/aboutAppScreen";
import AboutUsScreen from "../../screens/profilePage/aboutUsScreen/aboutUsScreen";
import AppearanceScreen from "../../screens/profilePage/appearenceScreen/appearenceScreen";
import ContactUsScreen from "../../screens/profilePage/contactUsScreen/contactUsScreen";
import EditProfileScreen from "../../screens/profilePage/editProfileScreen/editProfileScreen";
import PaymentScreen from "../../screens/profilePage/paymentScreen/paymentScreen";
import ProfileScreen from "../../screens/profilePage/profileScreen/profileScreen";
import { ProfileStackParamList } from "../../types/navigation";

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
