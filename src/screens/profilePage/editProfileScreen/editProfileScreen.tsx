import {
  CommonActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { useContext, useEffect, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { deleteUserProfile } from "../../../apiServices/user";
import { colors } from "../../../assets/styles/colors";
import fontFamily from "../../../assets/styles/fontFamily";
import globalStyles from "../../../assets/styles/globalStyles";
import Header from "../../../components/header/header";
import Loader from "../../../components/Loader/loader";
import ProfileAvatar from "../../../components/profileAvatar/profileAvatar";
import { AuthContext } from "../../../context/loginAuthContext";
import { ThemeContext } from "../../../context/themeContext";
import { useBackPressNavigate } from "../../../hooks/useBackPressNavigate";
import { RootStackParamList } from "../../../types/navigation";
import { getAxiosErrorMessage } from "../../../utils/axiosError";
import { loadProfileData } from "../../../utils/loadProfileData";
import showToast from "../../../utils/showToast";
type ProfileDetails = {
  name?: string;
  experience_level?: string;
  email?: string;
  // add other properties as needed
};
export default function EditProfileScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [userName, setUserName] = useState("--");
  const [userEmail, setUserEmail] = useState("--");
  const [userProfile, setUserProfile] = useState("");
  const [expertiseLevel, setExpertiseLevel] = useState("");
  const [avatar, setAvatar] = useState(
    "https://randomuser.me/api/portraits/men/32.jpg"
  );
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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
      console.log("Saved:", {
        userName,
        userEmail,
        userProfile,
        expertiseLevel,
      });
      setSaving(false);
      alert("Profile updated successfully!");
    }, 1500);
  };
  const handleLogout = () => {
    console.log("Logged out");
    logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Welcome" }],
      })
    );
  };
  useEffect(() => {
    const fetchProfile = async () => {
      const { name, email, profile, experienceLevel } = await loadProfileData();
      setUserName(name);
      setUserEmail(email);
      setUserProfile(profile);
      setExpertiseLevel(experienceLevel ?? "");
    };

    fetchProfile();
  }, []);
  useBackPressNavigate("Profile", {
    screen: "Profile",
  });
  const capitalizeFirstLetter = (text: string | undefined) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  const handelDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      const response = await deleteUserProfile();
      console.log("DeleteUser=>", response.data);
      setShowDeleteModal(false);
      //showToast(errorMessage, "danger");
      handleLogout();
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      showToast(errorMessage, "danger");
    } finally {
      setIsDeleting(false);
    }
  };
  if (isLoading) return <Loader />;

  return (
    <ScrollView
      style={[globalStyles.pageContainerWithBackground(theme)]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        justifyContent: "space-between",
        flex: 1,
        height: "100%",
      }}
    >
      <View>
        <View style={styles.arrowSavedContainer}>
          <Header
            onBackClick={() => {
              navigation.navigate("Profile", {
                screen: "Profile",
              });
            }}
          />
        </View>
        <View style={styles.subContainer}>
          <View style={styles.avatarContainer}>
            {userProfile ? (
              <Image source={{ uri: userProfile }} style={styles.avatar} />
            ) : (
              <ProfileAvatar name={userName} />
            )}
            {/* <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity> */}
          </View>
          <View
            style={[
              styles.form,
              {
                backgroundColor:
                  theme === "dark"
                    ? colors.octodenaryText
                    : colors.primaryBackground,
              },
            ]}
          >
            <View style={styles.Fields}>
              <Text
                style={[
                  styles.label,
                  {
                    color:
                      theme === "dark"
                        ? colors.darkPrimaryText
                        : colors.octodenaryText,
                  },
                ]}
              >
                Full Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      theme === "dark" ? colors.octodenaryText : colors.white,
                    color:
                      theme === "dark"
                        ? colors.darkSenaryText
                        : colors.unvigintaryText,
                  },
                ]}
                placeholder="Enter your full name"
                placeholderTextColor={
                  theme === "dark"
                    ? colors.darkSenaryText
                    : colors.unvigintaryText
                }
                value={userName ?? ""}
                onChangeText={setUserName}
                readOnly={true}
              />
            </View>
            <>
              {/*<View> <Text
          style={[
            styles.label,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
        >
          Date of Birth
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor:
                theme === "dark" ? colors.octodenaryText : colors.white,
              color:
                theme === "dark"
                  ? colors.darkSenaryText
                  : colors.unvigintaryText,
            },
          ]}
          value={dob}
          onChangeText={setDob}
        /></View> */}
            </>
            <View style={styles.Fields}>
              <Text
                style={[
                  styles.label,
                  {
                    color:
                      theme === "dark" ? colors.white : colors.octodenaryText,
                  },
                ]}
              >
                Expertise Level
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      theme === "dark" ? colors.octodenaryText : colors.white,
                    color:
                      theme === "dark"
                        ? colors.darkSenaryText
                        : colors.unvigintaryText,
                  },
                ]}
                placeholder="Enter your expertise level"
                placeholderTextColor={
                  theme === "dark"
                    ? colors.darkSenaryText
                    : colors.unvigintaryText
                }
                value={capitalizeFirstLetter(expertiseLevel) ?? ""}
                onChangeText={setExpertiseLevel}
                readOnly={true}
              />
            </View>

            <View style={styles.Fields}>
              <Text
                style={[
                  styles.label,
                  {
                    color:
                      theme === "dark" ? colors.white : colors.octodenaryText,
                  },
                ]}
              >
                Email
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      theme === "dark" ? colors.octodenaryText : colors.white,
                    color:
                      theme === "dark"
                        ? colors.darkSenaryText
                        : colors.unvigintaryText,
                  },
                ]}
                value={userEmail ?? ""}
                keyboardType="email-address"
                onChangeText={setUserEmail}
                readOnly={true}
              />
            </View>

            {/* <Text
          style={[
            styles.label,
            {
              color: theme === "dark" ? colors.white : colors.octodenaryText,
            },
          ]}
        >
          Password
        </Text>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor:
                theme === "dark" ? colors.octodenaryText : colors.white,
              color:
                theme === "dark"
                  ? colors.darkSenaryText
                  : colors.unvigintaryText,
            },
          ]}
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        /> */}
          </View>
        </View>
      </View>
      {/* <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <TouchableOpacity
          style={[styles.saveButtonContainer, saving && { opacity: 0.6 }]}
          onPress={handleSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View> */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity
          onPress={() => setShowDeleteModal(true)}
          style={styles.logoutButton}
        >
          <Text
            style={[
              styles.logoutText,
              {
                color: colors.quaternaryButtonColor,
              },
            ]}
          >
            Delete Account
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent
        visible={showDeleteModal}
        animationType="fade"
        onRequestClose={() => setShowDeleteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContainer,
              {
                backgroundColor:
                  theme === "dark"
                    ? colors.darkPrimaryBackground
                    : colors.primaryBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                {
                  color:
                    theme === "dark"
                      ? colors.darkPrimaryText
                      : colors.octodenaryText,
                },
              ]}
            >
              Delete Account?
            </Text>
            <Text
              style={[
                styles.modalMessage,
                {
                  color:
                    theme === "dark"
                      ? colors.darkSenaryText
                      : colors.novemdenaryText,
                },
              ]}
            >
              Are you sure you want to permanently delete your account? This
              action cannot be undone.
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.cancelButton]}
                onPress={() => setShowDeleteModal(false)}
              >
                <Text style={[styles.cancelText]}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  {
                    backgroundColor:
                      theme === "dark"
                        ? colors.vigenaryText
                        : colors.sexdenaryText,
                  },
                ]}
                onPress={handelDeleteAccount}
                disabled={isDeleting}
              >
                <Text style={[styles.deleteText]}>
                  {isDeleting ? "Deleting..." : "Delete"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  subContainer: { gap: 40 },
  backButton: {
    marginTop: 20,
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  avatarContainer: {
    alignItems: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: "38%",
    backgroundColor: "#000",
    borderRadius: 20,
    padding: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
  form: {
    gap: 24,
  },
  formContainer: { gap: 40 },
  header: {
    fontSize: 32,
    fontFamily: fontFamily.Inter700,
    gap: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    fontFamily: fontFamily.Inter500,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: "#E3E5E5",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    backgroundColor: "#f9f9f9",
    gap: 10,
  },
  arrowSavedContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 1,
    paddingTop: 0, // space for status bar
    paddingBottom: 16,
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 0,
  },
  saveButton: {
    // borderRadius: 8,
    // paddingVertical: 14,
    // marginTop: 10,
    // alignItems: "center",
  },
  saveButtonText: {
    color: "#6B4EFF",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: fontFamily.Inter400,
  },
  Fields: { gap: 12 },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutContainer: {
    // position: "absolute",
    // bottom: 20,
    // left: 0,
    // right: 0,
    alignItems: "center",
  },
  logoutButton: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  logoutText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    borderRadius: 16,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: fontFamily.Cabinet700,
    marginBottom: 10,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 14,
    fontFamily: fontFamily.Satoshi500,
    textAlign: "center",
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#ccc",
    alignItems: "center",
  },
  deleteButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: "#E53935",
    alignItems: "center",
  },
  cancelText: {
    color: colors.black,
    fontFamily: fontFamily.Cabinet700,
  },
  deleteText: {
    color: colors.white,
    fontFamily: fontFamily.Cabinet700,
  },
});
