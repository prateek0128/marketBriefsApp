import { storage } from "./storage";

export const loadProfileData = async () => {
  try {
    const id = await storage.getItem("userId");
    const name = await storage.getItem("userName");
    const email = await storage.getItem("userEmail");
    const userGoogleProfile = await storage.getItem("userGoogleProfile");
    const phone = await storage.getItem("userPhone");
    const experienceLevel = await storage.getItem("userExperienceLevel");
    const interests = await storage.getItem("userInterests");
    return {
      id: id || "--",
      name: name || "--",
      email: email || "--",
      profile: userGoogleProfile || "",
      phone: phone || "--",
      experienceLevel: experienceLevel || "--",
      interests: interests || "--",
    };
  } catch (error) {
    console.log("Error loading profile data:", error);
    return {
      name: "--",
      email: "--",
      profile: "",
    };
  }
};
