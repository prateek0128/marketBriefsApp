import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSession from "expo-auth-session";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
WebBrowser.maybeCompleteAuthSession();
type GoogleAuthContextType = {
  userInfoGoogleWeb: any;
  googleAccessTokenWeb: {
    accessToken?: string;
    idToken?: string;
  } | null;
  promptGoogleLoginWeb: () => void;
};
const GoogleAuthContextWeb = createContext<GoogleAuthContextType | null>(null);

export const GoogleAuthProviderWeb = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userInfoGoogleWeb, setUserInfoGoogleWeb] = useState<any>(null);
  const [googleAccessTokenWeb, setGoogleAccessTokenWeb] = useState<{
    accessToken?: string;
    idToken?: string;
  } | null>(null);

  const isExpoGo = Constants.appOwnership === "expo";
  const redirectUri = AuthSession.makeRedirectUri({
    //native: "https://auth.expo.io/@prateek2812/marketBriefs",
    // scheme: "marketBriefs",
    useProxy: isExpoGo,
  } as any);

  const finalRedirectUri = isExpoGo
    ? `https://auth.expo.io/@prateek2812/marketBriefs`
    : redirectUri;
  console.log("Final Redirect URI:", finalRedirectUri);
  console.log("Redirect URI:", redirectUri);
  //@ts-ignore
  console.log("AUTHURI=>", AuthSession.makeRedirectUri({ useProxy: false }));
  console.log("isEXPOGO=>", isExpoGo);
  console.log("SLUG=>", Constants?.expoConfig?.slug);
  console.log("OWNER=>", Constants?.expoConfig?.owner);
  const [request, response, promptAsync] = Google.useAuthRequest({
    // iosClientId:
    //   "1030825305394-hc58lnam3pc57elggvs3d9hjkpeut4ql.apps.googleusercontent.com",
    // androidClientId:
    //   "1030825305394-ntfuoou9uu4mpvsuhsq01ma72kp0sl62.apps.googleusercontent.com",
    // webClientId:
    //   "1030825305394-i5rjh8ccaidfbbk4f71i28f13612pdv0.apps.googleusercontent.com",
    clientId:
      "484384832433-fs200013405jddg6vi21ev32uj9t0uu9.apps.googleusercontent.com",
    redirectUri: finalRedirectUri,
    scopes: ["profile", "email"],
    //responseType: "id_token",
    //@ts-ignore
    useProxy: isExpoGo,
    usePKCE: false,
    extraParams: { prompt: "select_account" },
  });

  useEffect(() => {
    if (response?.type === "error") {
      console.log("Google Auth Error:", response.error);
      return;
    }
    if (response?.type === "success") {
      const { authentication, params } = response;
      // Store tokens
      setGoogleAccessTokenWeb({
        accessToken: authentication?.accessToken,
        idToken: params?.id_token,
      });
      // Fetch user info
      fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${authentication?.accessToken}` },
      })
        .then((res) => res.json())
        .then((response) => {
          console.log("Google User Data", response);
          setUserInfoGoogleWeb(response);
        })
        .catch((err) => console.log("Failed to fetch user info", err));
    }
  }, [response]);

  // useEffect(() => {
  //   async function exchangeCodeForToken() {
  //     if (response?.type === "success" && response.params.code) {
  //       // Your token exchange logic here
  //       const tokenResponse = await fetch(
  //         "https://oauth2.googleapis.com/token",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //           //@ts-ignore
  //           body: new URLSearchParams({
  //             code: response.params.code,
  //             client_id:
  //               "1030825305394-i5rjh8ccaidfbbk4f71i28f13612pdv0.apps.googleusercontent.com",
  //             redirect_uri: finalRedirectUri,
  //             grant_type: "authorization_code",
  //             code_verifier: request?.codeVerifier ?? "",
  //           }).toString(),
  //         }
  //       );

  //       const tokens = await tokenResponse.json();
  //       console.log("Tokens:", tokens);
  //       // You also need to set the tokens here
  //       setGoogleAccessToken({
  //         accessToken: tokens.access_token,
  //         idToken: tokens.id_token,
  //       });
  //       // And fetch user info using the new access token
  //       fetchUserInfo(tokens.access_token);
  //     }
  //   }
  //   const fetchUserInfo = async (accessToken: string) => {
  //     try {
  //       const res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
  //         headers: { Authorization: `Bearer ${accessToken}` },
  //       });
  //       const userInfo = await res.json();
  //       console.log("Google User Data=>", userInfo);
  //       setUserInfoGoogle(userInfo);
  //     } catch (err) {
  //       console.log("Failed to fetch user info", err);
  //     }
  //   };
  //   // Call the async function
  //   exchangeCodeForToken();
  // }, [response, finalRedirectUri, request]);
  const promptGoogleLoginWeb = async () => {
    console.log("Google Login Request:", request);
    try {
      //@ts-ignore
      const result = await promptAsync({
        //@ts-ignore
        useProxy: true,
        showInRecents: true,
      });
      if (result.type === "success") {
        console.log("Google login successful:", result);
        console.log("IdToken", result.params.id_token);
        setGoogleAccessTokenWeb({
          accessToken: "",
          idToken: result.params.id_token,
        });
        // Handle successful login
      } else {
        console.log("Google login cancelled or failed:", result);
      }
    } catch (error) {
      console.log("Error during Google login:", error);
    }
  };

  return (
    <GoogleAuthContextWeb.Provider
      value={{ userInfoGoogleWeb, googleAccessTokenWeb, promptGoogleLoginWeb }}
    >
      {children}
    </GoogleAuthContextWeb.Provider>
  );
};

export const useGoogleAuthWeb = () => {
  const context = useContext(GoogleAuthContextWeb);
  if (!context)
    throw new Error("useGoogleAuth must be used within GoogleAuthProvider");
  return context;
};
