import {
  NavigationProp,
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";
import { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Divider } from "react-native-paper";
import { getPinnedNews, unpinNews } from "../../apiServices/newsManagement";
import { NewsAuthorIcon } from "../../assets/icons/components/homepage";
import {
  ViewMoreIcon,
  ViewMoreIconWhite,
} from "../../assets/icons/components/savedArticles";
import { colors } from "../../assets/styles/colors";
import fontFamily from "../../assets/styles/fontFamily";
import globalStyles from "../../assets/styles/globalStyles";
import EmptyState from "../../components/emptyState/emptyState";
import Loader from "../../components/Loader/loader";
import { ThemeContext } from "../../context/themeContext";
import { useBackPressNavigate } from "../../hooks/useBackPressNavigate";
import { RootStackParamList } from "../../types/navigation";
import showToast from "../../utils/showToast";
import { storage } from "../../utils/storage";
const SavedArticles = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useContext(ThemeContext);
  const [savedNews, setSavedNews] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [userExperienceLevel, setUserExperienceLevel] = useState<string>("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const getUserLevel = async () => {
    try {
      const userExperienceLevel = await storage.getItem("userExperienceLevel");
      setUserExperienceLevel(userExperienceLevel || ""); // provide a default value if null
      console.log(userExperienceLevel); // this is the actual stored value
    } catch (e) {
      console.log("Failed to fetch user experience level", e);
    }
  };
  const getBookmarkAPI = async () => {
    setLoading(true);
    try {
      const response = await getPinnedNews();
      console.log("BookmarkResponse=>", JSON.stringify(response.data, null, 2));
      // setSavedNews(response.data);
      setSavedNews(response.data.map((entry: any) => entry.news));
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      showToast(errorMessage, "danger");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserLevel();
  }, []);
  useFocusEffect(
    useCallback(() => {
      getBookmarkAPI();
    }, [])
  );
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getBookmarkAPI();
    setRefreshing(false);
  }, []);
  const handleUnPinNews = async (newsId: string) => {
    console.log("Inside handleUnPinNews");
    try {
      const response = await unpinNews(newsId);
      console.log("UninNewsResponse=>", response.data);
      console.log("UninNews=>", response.data.success);
      showToast("News bookmarked unsuccessfully", "success");
      // Refresh the list automatically
      await getBookmarkAPI();
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      console.log("ErrorMessageUninNews", axiosErr.response);
      showToast(errorMessage, "danger");
    }
  };
  const renderItem = ({ item }: any) => {
    const titleByLevel =
      userExperienceLevel === "beginner"
        ? item?.title_by_level?.beginner ?? ""
        : userExperienceLevel === "intermediate"
        ? item?.title_by_level?.intermediate ?? ""
        : userExperienceLevel === "novice"
        ? item?.title_by_level?.novice ?? ""
        : userExperienceLevel === "expert"
        ? item?.title_by_level?.expert ?? ""
        : "";
    return (
      <TouchableOpacity
        style={[
          styles.card,
          {
            borderColor:
              theme === "dark"
                ? colors.darkUndenaryBackground
                : colors.darkUndenaryBackground,
          },
        ]}
        onPress={() =>
          navigation.navigate("HeadlineDetailsScreen", {
            newsId: item?.id ?? "",
            imageKey: "",
            path: "Saved",
          })
        }
      >
        <View style={[styles.savedArticleDetails]}>
          <View style={[styles.detailsContainer]}>
            <View style={styles.authorIconContainer}>
              <NewsAuthorIcon />
              <View style={styles.authorTimeContainer}>
                <Text
                  style={[
                    styles.authorText,
                    {
                      color:
                        theme === "light"
                          ? colors.octodenaryText
                          : colors.white,
                    },
                  ]}
                >
                  {item?.authors?.[0] || "--"}
                </Text>
              </View>
            </View>
            <Text
              style={[
                styles.title,
                {
                  color:
                    theme === "dark" ? colors.white : colors.octodenaryText,
                },
              ]}
              // numberOfLines={2}
            >
              {titleByLevel || "--"}
            </Text>
          </View>
          {/* <View style={[styles.imageContainer]}>
            <Image
              source={require("../../../assets/images/Image.png")}
              style={styles.image}
              width={100}
              height={100}
            />
          </View> */}
        </View>
        <View style={[styles.cardBottomSection]}>
          <Text
            style={[
              styles.time,
              {
                color:
                  theme === "dark"
                    ? colors.darkSenaryText
                    : colors.unvigintaryText,
              },
            ]}
          >
            {item?.time_ago || "--"}
          </Text>
          {/* ViewMore button */}
          <View style={{ position: "relative" }}>
            <TouchableOpacity
              onPress={() =>
                setOpenMenuId((prev) => (prev === item.id ? null : item.id))
              }
            >
              {theme === "light" ? <ViewMoreIcon /> : <ViewMoreIconWhite />}
            </TouchableOpacity>

            {/* Popup menu */}
            {openMenuId === item.id && (
              <View
                style={[
                  styles.popupMenu,
                  {
                    backgroundColor:
                      theme === "dark"
                        ? colors.darkPrimaryBackground
                        : colors.white,
                    borderColor:
                      theme === "dark"
                        ? colors.undenaryBorder
                        : colors.nonaryBorder,
                  },
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    console.log("Remove clicked for:", item?.id);
                    handleUnPinNews(item?.id);
                    setOpenMenuId(null);
                  }}
                >
                  <Text
                    style={[
                      styles.popupMenuItem,
                      {
                        color:
                          theme === "dark"
                            ? colors.white
                            : colors.octodenaryText,
                      },
                    ]}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  useBackPressNavigate("Home");
  if (loading) return <Loader />;
  return (
    <TouchableWithoutFeedback
      onPress={() => setOpenMenuId(null)} // Close any open menu
    >
      <SafeAreaView
        style={[
          globalStyles.pageContainerWithBackground(theme),
          { paddingBottom: 0 },
        ]}
      >
        <View style={styles.headerContainer}>
          <View style={styles.arrowSavedContainer}>
            {/* <Header showThemeIcon={true} showBackArrow={false} /> */}
            <Text
              style={[
                styles.header,
                {
                  color:
                    theme === "dark" ? colors.white : colors.octodenaryText,
                },
              ]}
            >
              Saved Articles
            </Text>
          </View>
        </View>
        <Divider
          style={[
            styles.dividerStyle,
            {
              backgroundColor:
                theme === "light"
                  ? colors.octodenaryBackground
                  : colors.darkUndenaryBackground,
            },
          ]}
        />

        <FlatList
          data={savedNews}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => (
            <Divider
              style={[
                styles.dividerStyle,
                {
                  backgroundColor:
                    theme === "light"
                      ? colors.octodenaryBackground
                      : colors.darkUndenaryBackground,
                },
              ]}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            !loading ? (
              <EmptyState message="No articles found. Save news to view articles." />
            ) : null
          }
          contentContainerStyle={{ paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SavedArticles;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 0,
    width: "100%",
  },

  header: {
    fontSize: 32,
    fontFamily: fontFamily.Inter700,
  },
  arrowSavedContainer: { gap: 16, width: "100%" },
  backButton: {},
  sourceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  sourceIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
    gap: 3,
  },
  dividerStyle: {
    height: 1,
    marginVertical: 24,
  },

  card: {
    gap: 16,
  },
  savedArticleDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  detailsContainer: { gap: 16 },
  imageContainer: {},
  title: {
    fontSize: 18,
    fontFamily: fontFamily.Inter700,
    flexShrink: 1,
  },
  time: {
    fontSize: 12,
    fontFamily: fontFamily.Inter400,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
  },
  authorIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  authorTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  authorText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 14,
  },
  cardBottomSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  popupMenu: {
    position: "absolute",
    top: 9, // pushes below the button
    right: 25,
    minWidth: 140,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    zIndex: 999,
  },
  popupMenuItem: {
    fontSize: 14,
    paddingVertical: 4,
    fontFamily: fontFamily.Satoshi500,
    color: "#333",
  },
});
