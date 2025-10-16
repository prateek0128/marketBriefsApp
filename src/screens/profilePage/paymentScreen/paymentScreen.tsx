import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getUserProfile } from "../../../apiServices/user";
import { PaymentDetailsIcon } from "../../../assets/icons/components/profile";
import { colors } from "../../../assets/styles/colors";
import fontFamily from "../../../assets/styles/fontFamily";
import globalStyles from "../../../assets/styles/globalStyles";
import Button from "../../../components/button/button";
import Header from "../../../components/header/header";
import Loader from "../../../components/Loader/loader";
import { ThemeContext } from "../../../context/themeContext";
import { useBackPressNavigate } from "../../../hooks/useBackPressNavigate";
import { RootStackParamList } from "../../../types/navigation";
import showToast from "../../../utils/showToast";
type ProfileDetails = {
  name?: string;
  experience_level?: string;
  email?: string;
  // add other properties as needed
};
export default function PaymentScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(
    "https://randomuser.me/api/portraits/men/32.jpg"
  );
  const [saving, setSaving] = useState(false);
  const [expertiseLevel, setExpertiseLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({});
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const plans = [
    {
      id: "free",
      title: "Free",
      price: 0,
      features: ["Daily 3 articles", "Limited Features"],
      button: { title: "Current Plan", variant: "outlined" },
      note: null,
      popular: false,
      backgroundImage: null,
    },
    {
      id: "premium",
      title: "Premium",
      price: 9,
      features: [
        "Unlimited Articles",
        "Priority Support",
        "Ad-free Experience",
      ],
      button: { title: "Upgrade for ₹9/mo", variant: "contained" },
      note: "Secure Payment, Cancel anytime no hidden fees.",
      popular: true,
      backgroundImage: require("../../../assets/images/paymentImageLight.png"),
    },
  ];
  // Handle Image Selection
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };
  // Handle Save Changes
  const handleSave = () => {
    setSaving(true);
    // Mock API save
    setTimeout(() => {
      console.log("Saved:", { fullName, dob, email, password, avatar });
      setSaving(false);
      alert("Profile updated successfully!");
    }, 1500);
  };
  const getUserProfileAPI = async () => {
    setIsLoading(true);
    try {
      const response = await getUserProfile();
      console.log(" ProfileResponse=>", response.data);
      setProfileDetails(response.data || []);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      showToast(errorMessage, "danger");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUserProfileAPI();
  }, []);
  useBackPressNavigate("Profile");
  const capitalizeFirstLetter = (text: string | undefined) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  if (isLoading) return <Loader />;

  return (
    <ScrollView
      style={[globalStyles.pageContainerWithBackground(theme)]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        //justifyContent: "space-between",
        justifyContent: "flex-start",
        flex: 1,
        height: "100%",
      }}
    >
      <View style={styles.arrowSavedContainer}>
        <Header
          onBackClick={() => {
            navigation.navigate("Profile");
          }}
        />
      </View>
      <View style={styles.paymentsHeadingContainer}>
        <Text
          style={[
            styles.paymentsHeadingText,
            { color: theme == "dark" ? colors.white : colors.octodenaryText },
          ]}
        >
          Get Premium
        </Text>
        <Text
          style={[
            styles.paymentsSubHeadingText,
            {
              color:
                theme == "dark"
                  ? colors.darkSenaryText
                  : colors.novemdenaryText,
            },
          ]}
        >
          Go ad-free and unlock all features
        </Text>
      </View>
      <ScrollView
        style={styles.paymentPlanCardContainers}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ gap: 24 }}>
          {plans.map((plan, index) => {
            const isSelected = selectedPlan === plan.id;
            const CardWrapper = plan.backgroundImage ? ImageBackground : View;
            const cardProps = plan.backgroundImage
              ? {
                  source:
                    theme === "dark"
                      ? require("../../../assets/images/paymentImageDark.png")
                      : require("../../../assets/images/paymentImageLight.png"),
                  imageStyle: { borderRadius: 24, opacity: 0.2 }, // rounded corners
                  resizeMode: "cover" as "cover",
                }
              : {};
            return (
              <TouchableOpacity
                key={plan.id}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.9}
              >
                <CardWrapper
                  {...cardProps}
                  style={[
                    styles.paymentPlanCard,
                    {
                      borderColor: isSelected
                        ? colors.sexdenaryText
                        : theme === "dark"
                        ? colors.darkUndenaryBackground
                        : colors.nonaryBorder,
                      borderWidth: 1,
                    },
                  ]}
                >
                  {/* Popular Label */}
                  {plan.popular && (
                    <View style={styles.popularContainerStyle}>
                      <Text style={styles.popularText}>Popular</Text>
                    </View>
                  )}
                  {/* Title & Price */}
                  <View style={styles.paymentTitleContainer}>
                    <Text
                      style={[
                        styles.paymentTitleText,
                        {
                          color:
                            theme === "dark"
                              ? colors.white
                              : colors.octodenaryText,
                        },
                      ]}
                    >
                      {plan.title}
                    </Text>
                    <View style={styles.planRateContainer}>
                      <Text
                        style={[
                          styles.currencySymbolText,
                          {
                            color:
                              theme === "dark"
                                ? colors.white
                                : colors.octodenaryText,
                          },
                        ]}
                      >
                        ₹
                      </Text>
                      <Text
                        style={[
                          styles.rateText,
                          {
                            color:
                              theme === "dark"
                                ? colors.white
                                : colors.octodenaryText,
                          },
                        ]}
                      >
                        {plan.price}
                      </Text>
                      <Text
                        style={[
                          styles.monthText,
                          {
                            color:
                              theme === "dark"
                                ? colors.white
                                : colors.octodenaryText,
                          },
                        ]}
                      >
                        / mo
                      </Text>
                    </View>
                  </View>
                  {/* Features */}
                  <View style={styles.paymentDetails}>
                    {plan.features.map((feature, fIndex) => (
                      <View style={styles.paymentDetailsInfoLine} key={fIndex}>
                        <PaymentDetailsIcon />
                        <Text
                          style={[
                            styles.paymentDetailsInfoText,
                            {
                              color:
                                theme === "dark"
                                  ? colors.white
                                  : colors.octodenaryText,
                            },
                          ]}
                        >
                          {feature}
                        </Text>
                      </View>
                    ))}
                  </View>
                  {/* Button & Note */}
                  <View style={{ gap: 16 }}>
                    <Button
                      title={plan.button.title}
                      variant={plan.button.variant}
                    />
                    {plan.note && (
                      <Text
                        style={[
                          styles.premiumNoteText,
                          {
                            color:
                              theme === "dark"
                                ? colors.darkSenaryText
                                : colors.novemdenaryText,
                          },
                        ]}
                      >
                        {plan.note}
                      </Text>
                    )}
                  </View>
                </CardWrapper>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  arrowSavedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    paddingTop: 0, // space for status bar
    paddingBottom: 16,
  },
  paymentsHeadingContainer: {
    gap: 12,
    alignItems: "center",
    marginBottom: 36,
  },
  paymentsHeadingText: {
    fontSize: 24,
    fontFamily: fontFamily.Inter700,
  },
  paymentsSubHeadingText: {
    fontSize: 16,
    fontFamily: fontFamily.Inter400,
  },
  paymentPlanCardContainers: {
    gap: 24,
  },
  paymentPlanCard: {
    gap: 24,
    borderRadius: 24,
    borderWidth: 1,
    padding: 24,
  },
  popularContainerStyle: {
    position: "absolute",
    top: -10,
    right: 15,
    backgroundColor: colors.sexdenaryText,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 11,
    fontFamily: fontFamily.Inter400,
    color: colors.white,
  },
  paymentTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  paymentTitleText: {
    fontSize: 24,
    fontFamily: fontFamily.Inter600,
  },
  planRateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbolText: {
    fontSize: 16,
    fontFamily: fontFamily.Inter600,
  },
  rateText: {
    fontSize: 24,
    fontFamily: fontFamily.Inter600,
  },
  monthText: {
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
  },
  paymentDetails: {
    gap: 10,
  },
  paymentDetailsInfoLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  paymentDetailsInfoText: {
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
  },
  premiumNoteText: {
    fontSize: 12,
    fontFamily: fontFamily.Inter400,
  },
});
