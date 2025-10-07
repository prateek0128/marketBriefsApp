// src/components/UpdateManager.tsx
import { useEffect } from "react";
import * as Updates from "expo-updates";

const UpdateManager = () => {
  useEffect(() => {
    const checkForUpdate = async () => {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          console.log("Update available! Downloading...");
          await Updates.fetchUpdateAsync();
          console.log("Update downloaded. Reloading app...");
          await Updates.reloadAsync();
        } else {
          console.log("No update available.");
        }
      } catch (e) {
        console.log("Error checking update:", e);
      }
    };

    checkForUpdate();
  }, []);

  return null;
};

export default UpdateManager;
