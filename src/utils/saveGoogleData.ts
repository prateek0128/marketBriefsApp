import { useContext } from "react";
import { googleSignIn } from "../apiServices/auth";
import { getAxiosErrorMessage } from "./axiosError";
import { handleOnboardingFlow } from "./onboardingHelper";
import { saveAuthTokens } from "./saveAuthTokens";
import showToast from "./showToast";
import { AuthContext } from "../context/loginAuthContext";

export const saveGoogleData = async (
  token: string,
  userData: any,
  navigation: any
) => {
  const signinData = {
    google_token: token,
    name: userData?.user?.name,
  };
  const { setLoginState } = useContext(AuthContext);
  console.log("Google Sign-In data =>", signinData);

  try {
    const response = await googleSignIn(signinData);

    console.log("✅ Google data saved successfully:", response.data);

    const responseData = response.data.data;
    const user = responseData.user;

    const accessTokenExpiry =
      Math.floor(Date.now() / 1000) + (responseData.expires_in || 0);

    // Save tokens and user state
    await saveAuthTokens(responseData);
    await setLoginState(user, accessTokenExpiry);

    // Continue onboarding/navigation flow
    await handleOnboardingFlow(navigation, "navigate");
  } catch (err) {
    const errorMessage = getAxiosErrorMessage(err);
    console.log("❌ Error saving Google data:", errorMessage);
    showToast(errorMessage, "danger");
  }
};
