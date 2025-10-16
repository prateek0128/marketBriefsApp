// import {
//   GoogleSignin,
//   isErrorWithCode,
//   isSuccessResponse,
//   statusCodes,
// } from "@react-native-google-signin/google-signin";
// import * as WebBrowser from "expo-web-browser";
// import { createContext, ReactNode, useContext, useState } from "react";
// import { Alert } from "react-native";

// GoogleSignin.configure({
//   webClientId:
//     "484384832433-fs200013405jddg6vi21ev32uj9t0uu9.apps.googleusercontent.com",
//   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
//   offlineAccess: true,
//   iosClientId:
//     "484384832433-f0a6hmbj2003jgm55i4dseh0f9dt2dtl.apps.googleusercontent.com",
//   profileImageSize: 120,
// });
// WebBrowser.maybeCompleteAuthSession();
// const userData = {
//   idToken:
//     "eyJhbGciOiJSUzI1NiIsImtpZCI6IjE3ZjBmMGYxNGU5Y2FmYTlhYjUxODAxNTBhZTcxNGM5ZmQxYjVjMjYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI0ODQzODQ4MzI0MzMtZGF0MTQwcmV1bXBvZmdxc2NlNm5hN3ZyYTFvdjFwYWMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI0ODQzODQ4MzI0MzMtZnMyMDAwMTM0MDVqZGRnNnZpMjFldjMydWo5dDB1dTkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQyOTI2MjAzMzg5MTE3MjA4NTEiLCJlbWFpbCI6ImwucmFnbmFyMjgwN0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmFtZSI6IlJhZ25hciBMb3RoYnJvayIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJMHRwZFp6X01uSVYxanM2OTBwVDFscjI4alQtWm1CU2g3Y1VZZ3RiTy1lUW9ZZGc9czk2LWMiLCJnaXZlbl9uYW1lIjoiUmFnbmFyIiwiZmFtaWx5X25hbWUiOiJMb3RoYnJvayIsImlhdCI6MTc1OTQwMTMxMywiZXhwIjoxNzU5NDA0OTEzfQ.JacgKgBs6jqxQXDAgwNKA9VwmOgcpnveW_a248dbX3gBMGeavOc2Lc_kAVmzxESXh2IjgdPSfvXo1UusgKyp6_NduHztQDBjCbaXvTJcrQvkBKIgadjkLF4au63bxsoNAKSFiW18TqFZUGAqMvLeSYpfz3KPuZ4GtaPEvanskNEDwvLR4_U5da_lqM0MkmRTeVgrFwbZFLDehI5hbx6ZdJQtJASHajj0jMLK6AkTu57rIgmwdWHNN8oRqScTmi8_XZYPdiXW5OpZy8I3fxZTygdXSPd4bIQxiZ4-zx9Qndiikc3wlAe4U_6f1Y3pFqZfOVXwlK5nk38TXjA8sluDnA",
//   scopes: [
//     "https://www.googleapis.com/auth/userinfo.profile",
//     "https://www.googleapis.com/auth/userinfo.email",
//     "openid",
//     "profile",
//     "https://www.googleapis.com/auth/drive.readonly",
//     "email",
//   ],
//   serverAuthCode:
//     "4/0AVGzR1CgkpFUQTsTycvKyvDF3G4frLOabKE8qk6ju5Wvg_Uqs-NH1K0o-9uwdSM1-X4VWw",
//   user: {
//     email: "l.ragnar2807@gmail.com",
//     familyName: "Lothbrok",
//     givenName: "Ragnar",
//     id: "104292620338911720851",
//     name: "Ragnar Lothbrok",
//     photo:
//       "https://lh3.googleusercontent.com/a/ACg8ocI0tpdZz_MnIV1js690pT1lr28jT-ZmBSh7cUYgtbO-eQoYdg=s96-c",
//   },
// };

// type GoogleAuthContextType = {
//   googleUserInfo: any;
//   idToken: string | null;
//   accessToken: string | null;
//   signIn: () => Promise<any>;
//   signOut: () => Promise<void>;
// };

// const GoogleAuthContext = createContext<GoogleAuthContextType | null>(null);

// export const GoogleAuthProvider = ({ children }: { children: ReactNode }) => {
//   const [googleUserInfo, setGoogleUserInfo] = useState<any>(null);
//   const [idToken, setIdToken] = useState<string | null>(null);
//   const [accessToken, setAccessToken] = useState<string | null>(null);
//   const [user, setUser] = useState<any | null>(null);
//   // 🔹 Restore user session on app start
//   // useEffect(() => {
//   //   const loadGoogleUser = async () => {
//   //     try {
//   //       const results = await storage.multiGet(["user", "tokenExpiry"]);

//   //       // results is array: [[key, value], [key, value]]
//   //       const storedUser = results.find(([k]) => k === "user")?.[1];
//   //       const storedExpiry = results.find(([k]) => k === "tokenExpiry")?.[1];

//   //       if (storedUser && storedExpiry) {
//   //         const expiryTime = parseInt(storedExpiry, 10); // seconds
//   //         const currentTime = Math.floor(Date.now() / 1000);

//   //         if (currentTime < expiryTime) {
//   //           const remainingTime = expiryTime - currentTime;
//   //           const parsedUser: any = JSON.parse(storedUser);

//   //           setUser(parsedUser);
//   //           setIsLoggedIn(true);
//   //           scheduleAutoLogout(remainingTime);
//   //         }
//   //       } else {
//   //         // You can also try to silently sign in if the token exists on device
//   //         try {
//   //           const response = await GoogleSignin.signInSilently();

//   //           if (response?.data) {
//   //             const tokens = await GoogleSignin.getTokens();
//   //             setGoogleUserInfo(response.data.user);
//   //             setIdToken(tokens.idToken);
//   //             setAccessToken(tokens.accessToken);

//   //             await storage.multiSet([
//   //               ["googleUserInfo", JSON.stringify(response.data.user)],
//   //               ["googleIdToken", tokens.idToken ?? ""],
//   //               ["googleAccessToken", tokens.accessToken ?? ""],
//   //             ]);
//   //           }
//   //         } catch (err) {
//   //           console.log("No existing Google session:", err);
//   //         }
//   //       }
//   //     } catch (e) {
//   //       console.log("Failed to load Google user:", e);
//   //     }
//   //   };
//   //   loadGoogleUser();
//   // }, []);

//   const signIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       await GoogleSignin.signOut(); // Force chooser
//       const response = await GoogleSignin.signIn();

//       if (isSuccessResponse(response)) {
//         const tokens = await GoogleSignin.getTokens();
//         setIdToken(tokens.idToken);
//         setAccessToken(tokens.accessToken);
//         setGoogleUserInfo(response.data);
//         return response.data;
//       } else {
//         console.log("Sign-in cancelled");
//         return null;
//       }
//     } catch (error: any) {
//       console.log("Google Sign-In Error:", error);
//       if (isErrorWithCode(error)) {
//         switch (error.code) {
//           case statusCodes.IN_PROGRESS:
//             Alert.alert("Sign in already in progress");
//             break;
//           case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
//             Alert.alert("Play services not available");
//             break;
//           default:
//             Alert.alert("Google sign in failed");
//         }
//       } else {
//         Alert.alert("Unknown Google sign in error");
//       }
//       return null;
//     }
//   };

//   const signOut = async () => {
//     try {
//       await GoogleSignin.signOut();
//       setGoogleUserInfo(null);
//       setIdToken(null);
//       setAccessToken(null);
//     } catch (error) {
//       console.log("Google sign out error:", error);
//     }
//   };

//   return (
//     <GoogleAuthContext.Provider
//       value={{ googleUserInfo, idToken, accessToken, signIn, signOut }}
//     >
//       {children}
//     </GoogleAuthContext.Provider>
//   );
// };

// export const useGoogleAuth = () => {
//   const context = useContext(GoogleAuthContext);
//   if (!context) {
//     throw new Error("useGoogleAuth must be used within GoogleAuthProvider");
//   }
//   return context;
// };
