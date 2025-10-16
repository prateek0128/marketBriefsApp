import { Inter_400Regular } from "@expo-google-fonts/inter/400Regular";
import { Inter_500Medium } from "@expo-google-fonts/inter/500Medium";
import { Inter_600SemiBold } from "@expo-google-fonts/inter/600SemiBold";
import { Inter_700Bold } from "@expo-google-fonts/inter/700Bold";
import { useFonts } from "expo-font";
import { useContext, useEffect, useState } from "react";
import { StatusBar } from "react-native";
import FlashMessage from "react-native-flash-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { colors } from "./src/assets/styles/colors";
import { AuthProvider } from "./src/context/loginAuthContext";
import { ThemeContext, ThemeProvider } from "./src/context/themeContext";
import Navigation from "./src/navigation/navigationStack/navigation";
// import { GoogleAuthProvider } from "./src/context/googleAuthContext";
import * as Updates from "expo-updates";
import { Provider as PaperProvider } from "react-native-paper";
import ThemedContainer from "./src/components/themeWrapper/themeWrapper";
import { AppleAuthProvider } from "./src/context/appleAuthContext";
import { FacebookAuthProvider } from "./src/context/facebookAuthContext";
import { GoogleAuthProviderWeb } from "./src/context/googleAuthContextWeb";
export default function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    "Satoshi-Regular": require("./src/assets/fonts/SatoshiVariable/Satoshi-Regular.otf"),
    "Satoshi-Medium": require("./src/assets/fonts/SatoshiVariable/Satoshi-Medium.otf"),
    "Satoshi-Bold": require("./src/assets/fonts/SatoshiVariable/Satoshi-Bold.otf"),
    "Satoshi-Black": require("./src/assets/fonts/SatoshiVariable/Satoshi-Black.otf"),
    "CabinetGrotesk-Regular": require("./src/assets/fonts/CabinetGrotesk/CabinetGrotesk-Regular.otf"),
    "CabinetGrotesk-Bold": require("./src/assets/fonts/CabinetGrotesk/CabinetGrotesk-Bold.otf"),
    "Chillax-Medium": require("./src/assets/fonts/ChillaxVariable/Chillax-Medium.otf"),
  });
  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.log("Error checking for updates:", error);
      }
    };

    checkForUpdates();
  }, []);
  return (
    <>
      <PaperProvider>
        {/* <GoogleAuthProvider> */}
        <GoogleAuthProviderWeb>
          <FacebookAuthProvider>
            <AppleAuthProvider>
              <AuthProvider>
                <ThemeProvider>
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    <SafeAreaProvider>
                      <ThemedContainer>
                        <StatusBar
                          backgroundColor={
                            theme === "dark"
                              ? colors.octodenaryText
                              : colors.primaryBackground
                          } // Android background color
                          barStyle={
                            theme === "dark" ? "light-content" : "dark-content"
                          } // iOS & Android text/icons
                          // translucent={true}
                        />
                        <Navigation />
                        {/* <ThemeToggleButton /> */}
                        <FlashMessage position="top" />
                      </ThemedContainer>
                    </SafeAreaProvider>
                  </GestureHandlerRootView>
                </ThemeProvider>
              </AuthProvider>
            </AppleAuthProvider>
          </FacebookAuthProvider>
        </GoogleAuthProviderWeb>
        {/* </GoogleAuthProvider> */}
      </PaperProvider>
    </>
  );
}
