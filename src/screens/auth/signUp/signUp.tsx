import React, { useState, useRef, useEffect, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../../../types/navigation";
import { colors } from "../../../assets/styles/colors";
import globalStyles from "../../../assets/styles/globalStyles";
import fontFamily from "../../../assets/styles/fontFamily";
import { TextInput as RNTextInput } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { showMessage } from "react-native-flash-message";
import Button from "../../../components/button/button";
import InputTextField from "../../../components/inputTextField/inputTextField";
import SocialLoginButton from "../../../components/socialLoginButton/socialLoginButton";
import OTPSection from "../login/otpSection";
import {
  AppleIcon,
  GoogleIcon,
  FacebookIcon,
  AppleIconWhite,
} from "../../../assets/icons/components/welcome";
import { googleSignIn, sendOTP } from "../../../apiServices/auth";
import { AuthContext } from "../../../context/loginAuthContext";
import { ThemeContext } from "../../../context/themeContext";
import showToast from "../../../utils/showToast";
import { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGoogleAuth } from "../../../context/googleAuthContext";
import { useGoogleAuthWeb } from "../../../context/googleAuthContextWeb";
import { useFacebookAuth } from "../../../context/facebookAuthContext";
import { useAppleAuth } from "../../../context/appleAuthContext";
import { getAxiosErrorMessage } from "../../../utils/axiosError";
import { storage } from "../../../utils/storage";
import { handleOnboardingFlow } from "../../../utils/onboardingHelper";
import { saveAuthTokens } from "../../../utils/saveAuthTokens";
const SignUpScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { signupAuth, setLoginState } = useContext(AuthContext);
  // const [input, setInput] = useState("");
  const [inputFullName, setInputFullName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputType, setInputType] = useState("");
  const [showOTPInputs, setShowOTPInputs] = useState(false);
  const [isFocusOTP, setIsFocusOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpInputs = useRef<Array<RNTextInput | null>>([]);
  const [isValid, setIsValid] = useState(false);
  const { googleUserInfo, idToken, accessToken, signIn, signOut } =
    useGoogleAuth();
  const { googleAccessTokenWeb, userInfoGoogleWeb, promptGoogleLoginWeb } =
    useGoogleAuthWeb();
  const { facebookAccessToken, userInfoFacebook, promptFacebookLogin } =
    useFacebookAuth();
  const { userInfoApple, promptAppleLogin } = useAppleAuth();
  const handleSendOTP = async () => {
    if (inputEmail.trim() === "") {
      showToast("Please enter your phone or email.", "warning");
      return;
    }
    if (!isValid) {
      showToast("Please enter a valid phone number or email.", "warning");
      return;
    }
    setShowOTPInputs(true); // Show OTP inputs
    const otpData = {
      identifier: inputEmail,
      identifier_type: inputType,
    };
    const otpData2 = {
      identifier: "s.ronit2812@gmail.com",
      identifier_type: "email",
    };
    try {
      const response = await sendOTP(otpData);
      console.log("OTPResponse", response.data.message);
      showToast("OTP sent successfully to your email.", "success");
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      showToast(errorMessage, "danger");
    }
  };
  const handleSignUp = async () => {
    if (otp.some((digit) => digit === "")) {
      showToast("Please enter all OTP digits.", "warning");
      return;
    }
    const loginData = {
      identifier: inputEmail,
      identifier_type: inputType,
      otp: otp.join(""),
      name: inputFullName,
    };
    try {
      await signupAuth(loginData); // throws if OTP invalid
      await handleOnboardingFlow(navigation, "navigate");
      showToast("OTP verified successfully!", "success");
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      showToast(errorMessage, "danger");
    }
  };
  const handleOTPChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    // Move to next input if value entered
    if (value && index < otpInputs.current.length - 1) {
      otpInputs.current[index + 1]?.focus();
    }
  };
  const handleOTPKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && otp[index] === "" && index > 0) {
      otpInputs.current[index - 1]?.focus();
    }
  };
  const validateInputFullName = (text: string) => {
    // Allow only letters and spaces
    const cleaned = text.replace(/[^a-zA-Z\s]/g, "");
    setInputFullName(cleaned);
  };
  const validateInputEmail = (text: string) => {
    const isNumeric = /^\d+$/.test(text);

    // Improved regex for realistic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (isNumeric) {
      const trimmed = text.slice(0, 10); // Only allow max 10 digits
      setInputEmail(trimmed);
      setIsValid(trimmed.length === 10); // Valid only if exactly 10 digits
    } else {
      setInputEmail(text);
      setIsValid(emailRegex.test(text));
    }
  };
  const handleEditPress = () => {
    setShowOTPInputs(false);
    setOtp(["", "", "", "", "", ""]);
  };
  const handleGoogleLogin = async () => {
    console.log("Idtoken", idToken);
    console.log("AccessToken", accessToken);
    const userData = await signIn();
    console.log("UserData from Google SignIn", userData);
    if (userData) {
      const userGoogleProfile = userData.user.photo;
      await storage.setItem("userGoogleProfile", userGoogleProfile ?? "");
      saveGoogleData(userData.idToken ?? "", userData);
    }
  };
  const handleGoogleLoginWeb = async () => {
    await promptGoogleLoginWeb();
    if (userInfoGoogleWeb && googleAccessTokenWeb?.accessToken) {
      console.log("GoogleToken:", googleAccessTokenWeb);
      console.log("GoogleAccessToken:", googleAccessTokenWeb.accessToken);
      console.log("GoogleIDToken:", googleAccessTokenWeb.idToken);
      console.log("LoggedInUser:", userInfoGoogleWeb);
      saveGoogleData(googleAccessTokenWeb.accessToken ?? "", userInfoGoogleWeb);
      // navigation.navigate("TellUsSomething", {
      //   // name: userInfoGoogleWeb.name,
      //   // email: userInfoGoogleWeb.email,
      // });
    }
  };
  const saveGoogleData = async (token: string, userData: any) => {
    const signinData = {
      google_token: token,
      name: userData.user.name,
    };
    console.log("signinData=>", signinData);
    try {
      const response = await googleSignIn(signinData);
      console.log("Google data saved successfully", response.data);
      const responseData = response.data.data;
      const user = responseData.user;
      const accessTokenExpiry =
        Math.floor(Date.now() / 1000) + responseData.expires_in;
      await saveAuthTokens(responseData);
      await setLoginState(user, accessTokenExpiry);
      await handleOnboardingFlow(navigation, "navigate");
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      console.log("Error saving Google data:", errorMessage);
      showToast(errorMessage, "danger");
    }
  };
  useEffect(() => {
    if (userInfoFacebook) {
      console.log("FacebookUserInfo:", userInfoFacebook);
      navigation.navigate("TellUsSomething", {
        name: userInfoFacebook.name,
        email: userInfoFacebook.email,
        // picture: userInfoFacebook.picture.data.url,
      });
    }
  }, [userInfoFacebook]);
  useEffect(() => {
    if (userInfoApple) {
      console.log("Apple User:", userInfoApple);
      navigation.navigate("TellUsSomething", {
        name: userInfoApple.name,
        email: userInfoApple.email,
      });
    }
  }, [userInfoApple]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[globalStyles.pageContainerWithBackground(theme)]}
    >
      {showOTPInputs == false ? (
        <ScrollView contentContainerStyle={styles.innerContainer}>
          <View style={styles.headingContainer}>
            <Text style={[globalStyles.title(theme)]}>Sign up</Text>
          </View>
          <View style={{ gap: 20 }}>
            <View>
              <View style={styles.labelRow}>
                <Text
                  style={[
                    styles.label,
                    {
                      color:
                        theme === "dark"
                          ? colors.darkSecondaryText
                          : colors.primaryText,
                    },
                  ]}
                >
                  Full Name
                </Text>
              </View>
              <InputTextField
                placeholder="Enter your email address"
                keyboardType="default"
                autoCapitalize="words"
                value={inputFullName}
                onChangeText={validateInputFullName}
                editable={!showOTPInputs} // <-- disable input when OTP inputs are shown
              />
            </View>
            <View>
              <View style={styles.labelRow}>
                <Text
                  style={[
                    styles.label,
                    {
                      color:
                        theme === "dark"
                          ? colors.darkSecondaryText
                          : colors.primaryText,
                    },
                  ]}
                >
                  Email Address
                </Text>
              </View>
              <InputTextField
                placeholder="Enter your email address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={inputEmail}
                onChangeText={validateInputEmail}
                editable={!showOTPInputs} // <-- disable input when OTP inputs are shown
              />
            </View>
          </View>
          <Button
            title={showOTPInputs ? "Sign Up" : "Send OTP"}
            onPress={handleSendOTP}
            // disabled={!isValid || (showOTPInputs && !isOtpComplete)}
            disabled={!isValid}
            buttonStyle={{
              width: Platform.OS == "web" ? "60%" : "100%",
              alignSelf: "center",
            }}
          />
          <View style={styles.orDivider}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.buttonContainers}>
            <SocialLoginButton
              IconComponent={theme === "dark" ? AppleIconWhite : AppleIcon}
              text="Continue with Apple"
              onPress={promptAppleLogin}
            />
            <SocialLoginButton
              IconComponent={GoogleIcon}
              text="Continue with Google"
              //onPress={promptGoogleLogin}
              onPress={() => {
                Platform.OS == "web"
                  ? handleGoogleLoginWeb()
                  : handleGoogleLogin();
              }}
              // disabled={!requestGoogle}
            />
            {/* <SocialLoginButton
              IconComponent={FacebookIcon}
              text="Continue with Facebook"
              //disabled={!requestFacebook}
              onPress={promptFacebookLogin}
            /> */}
          </View>
        </ScrollView>
      ) : (
        <OTPSection
          isFocusOTP={isFocusOTP}
          setIsFocusOTP={setIsFocusOTP}
          showOTPInputs={showOTPInputs}
          setShowOTPInputs={setShowOTPInputs}
          input={inputEmail}
          setInput={setInputEmail}
          otp={otp}
          setOtp={setOtp}
          handleVerifyOTP={handleSignUp}
          handleSendOTP={handleSendOTP}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  innerContainer: {
    justifyContent: "center",
    alignSelf: "center",
    flexGrow: 1,
    width: Platform.OS == "web" ? "60%" : "100%",
  },
  input: {
    height: 36,
    backgroundColor: colors.secondaryBackground,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    gap: 10,
    color: colors.primaryText,
    //  fontFamily: fontFamily.secondary,
  },
  infoText: {
    color: colors.primaryText,
    //  fontFamily: fontFamily.secondary,
    fontSize: 14,
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    color: colors.octonaryText,
    fontFamily: fontFamily.Satoshi500,
  },
  button: {
    backgroundColor: colors.primaryButtonColor,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inlineLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  alreadyLinkText: {
    textAlign: "center",
    fontWeight: 300,
    fontSize: 14,
    color: colors.primaryText,
    //  fontFamily: fontFamily.secondary,
  },
  loginLinkText: {
    textAlign: "center",
    marginLeft: 4,
    fontWeight: 600,
    fontSize: 16,
    color: colors.primary,
    //  fontFamily: fontFamily.secondary,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    gap: 20, // if using React Native >= 0.71
  },
  icon: {
    marginHorizontal: 10,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 12,
  },
  headingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  otpInput: {
    width: 50,
    height: 60, // increased for better vertical spacing
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12, // rounded edges
    textAlign: "center",
    fontSize: 20,
    lineHeight: 24, // added to avoid text cut off
    paddingVertical: Platform.OS === "ios" ? 12 : 8, // vertical padding to center text
    color: colors.primaryText,

    fontFamily: fontFamily.Satoshi500, // or whatever you're using
  },

  buttonContainers: {
    gap: 16,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  orDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: Platform.OS == "web" ? "60%" : "100%",
    marginVertical: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secondaryBorderColor,
    marginHorizontal: 8,
  },
  orText: {
    fontSize: 12,
    color: colors.secondaryBorderColor,
    fontFamily: fontFamily.Satoshi500,
  },
});
