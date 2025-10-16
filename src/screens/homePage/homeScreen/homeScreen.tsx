import React, {
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback,
} from "react";
import { BackHandler, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../../assets/styles/colors";
import EmptyState from "../../../components/emptyState/emptyState";
import HeadlineDetailCard from "../../../components/headlineDetailedCard/headlineDetailedCard";
import { RootStackParamList } from "../../../types/navigation";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import fontFamily from "../../../assets/styles/fontFamily";
import axios, { AxiosError } from "axios";
import {
  getHighImpactNews,
  getHighImpactNewsByFilter,
  getNewsFeed,
  getRecommendedHighImpactNewsByFilter,
} from "../../../apiServices/news";
import Loader from "../../../components/Loader/loader";
import { ProfileIcon } from "../../../assets/icons/components/homepage";
import { GraphImage2 } from "../../../assets/icons/components/headlineDetailsView";
import { ThemeContext } from "../../../context/themeContext";
import DiscoverDetailsCard from "../../../components/discoverDetailsCard/discoverDetailsCard";
import TabLabel from "../../../components/tabLabel/tabLabel";
import showToast from "../../../utils/showToast";
import globalStyles from "../../../assets/styles/globalStyles";
import { Divider } from "react-native-paper";
import { getUserProfile } from "../../../apiServices/user";
import FilterBar from "../../../components/filterBar/filterBar";
import { storage } from "../../../utils/storage";
const { width, height } = Dimensions.get("window");
type NewsItem = {
  id: string;
  authors: string;
  time_ago: string;
  title: string;
  title_by_level: any;
  summary: string;
  summary_by_level: any;
  url: string;
  source: string;
  published_at: string;
  categories: any;
  tags: any;
  tag: string;
  related_stocks: any;
  impact_score: number;
  impact_label: string;
  sentiment_score: number;
  reaction_stats: {
    bullish: number;
    bearish: number;
    important: number;
    neutral: number;
  };
  engagement: {
    likes: number;
    comments: number;
  };
  discussions?: any;
};

const HomeScreen = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [allNewsData, setAllNewsData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedTag, setSelectedTag] = useState("All");
  const [userName, setUserName] = useState("");
  const [userExperienceLevel, setUserExperienceLevel] = useState("");
  const [savedInterests, setSavedInterests] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState(10);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [loadingMore, setLoadingMore] = useState(false);

  const getUserProfileAPI = async () => {
    try {
      const response = await getUserProfile();
      console.log("ProfileResponse=>", response.data);
      const profileData = response.data;
      await storage.multiSet([
        ["userId", profileData.id || ""],
        ["userName", profileData.name || ""],
        ["userEmail", profileData.email || ""],
        ["userPhone", profileData.phone || ""],
        ["userExperienceLevel", profileData.experience_level || ""],
        ["userInterests", JSON.stringify(profileData.interests || [])],
      ]);

      setUserName(profileData.name || "");
      setUserExperienceLevel(profileData.experience_level || "");
      setSavedInterests(profileData.interests || []);
    } catch (err) {
      // Narrow / cast to AxiosError
      const axiosErr = err as AxiosError<{
        status: string;
        message: string;
      }>;
      const errorMessage =
        axiosErr.response?.data?.message ?? "Something went wrong";
      showToast(errorMessage, "danger");
    }
  };
  const getAllNewsAPI = async (
    selectedTag: string,
    page: number,
    limit?: number,
    append = false,
    isRefresh = false,
    filterValue: string = "recent"
  ) => {
    if (!isRefresh && !append) {
      setLoading(true); // show loader only on first load
    }
    const activeTag = selectedTag === "All" ? "" : selectedTag;
    try {
      // const response = await getHighImpactNews(activeTag, limit ?? 10);
      const response = await getRecommendedHighImpactNewsByFilter(
        filterValue,
        activeTag,
        limit ?? 10
      );
      //console.log("ALLNewsResponse:", JSON.stringify(response.data, null, 2));
      const newsData = response.data.data;
      console.log("newsResponse:", newsData);
      if (append) {
        setAllNewsData((prev) => [...prev, ...newsData.slice(prev.length)]);
      } else {
        setAllNewsData(newsData);
      }
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
      if (!isRefresh) setLoading(false);
      setRefreshing(false); // always stop refresh spinner
    }
  };
  const handleFilterChange = async (
    selectedTag = "",
    filter: string,
    pageNumber: number = 1,
    append = false,
    isRefresh = false,
    limitValue: number = 10
  ) => {
    setSelectedFilter(filter);
    await storage.setItem("selectedFilter", filter);
    setPage(1);
    console.log("Selected Filter:", filter);
    if (!isRefresh && !append) {
      setLoading(true);
    }
    const activeTag = selectedTag === "All" ? "" : selectedTag;
    try {
      const response = await getRecommendedHighImpactNewsByFilter(
        filter,
        activeTag,
        limitValue
      );
      console.log(
        "Filtered News Response:",
        JSON.stringify(response.data, null, 2)
      );
      const filteredNewsData = response.data.data;
      if (append) {
        setAllNewsData((prev) => [
          ...prev,
          ...filteredNewsData.slice(prev.length),
        ]);
      } else {
        setAllNewsData(filteredNewsData);
      }
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
  // Load saved filter when HomeScreen mounts
  useFocusEffect(
    useCallback(() => {
      const loadFilter = async () => {
        const savedFilter = await storage.getItem("selectedFilter");
        if (savedFilter) {
          setSelectedFilter(savedFilter);
          handleFilterChange("", savedFilter, 1, false, false);
        }
      };
      loadFilter();
      getUserProfileAPI();
    }, [])
  );
  useEffect(() => {
    setSelectedFilter(""); // or "recent"
  }, []);
  useEffect(() => {
    if (selectedTag !== "") {
      setPage(1);
      getAllNewsAPI(selectedTag, 1);
    }
  }, [selectedTag]);
  // In handleRefresh
  const handleRefresh = () => {
    setRefreshing(true); // trigger manual refresh
    const newLimit = limit + 10;
    setLimit(newLimit);
    setPage(1);

    if (selectedFilter) {
      handleFilterChange("", selectedFilter, 1, false, true, newLimit).finally(
        () => {
          setRefreshing(false); // stop refreshing after data is loaded
        }
      );
    } else {
      getAllNewsAPI(selectedTag, 1, newLimit, false, true).finally(() => {
        setRefreshing(false); // stop refreshing after data is loaded
      });
    }
  };

  const handleLoadMore = () => {
    if (loadingMore) return; // prevent multiple calls
    if (allNewsData.length === 0) return; // no data to paginate
    setLoadingMore(true);

    const nextPage = page + 1;
    const newLimit = limit + 10;
    setLimit(newLimit);
    setPage(nextPage);

    const loadMorePromise = selectedFilter
      ? handleFilterChange("", selectedFilter, nextPage, true, false, newLimit)
      : getAllNewsAPI(selectedTag, nextPage, newLimit, true);

    loadMorePromise.finally(() => setLoadingMore(false));
  };

  // Inside your HomeScreen component
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Optional: Ask for confirmation before exiting
        Alert.alert("Exit App", "Are you sure you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Yes", onPress: () => BackHandler.exitApp() },
        ]);
        return true; // Prevent default behavior (going back in navigation)
      };

      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => subscription.remove();
    }, [])
  );
  const parseTimeAgo = (timeAgo: string): number => {
    if (!timeAgo) return Infinity;

    const parts = timeAgo.split(" "); // e.g. ["18", "hours", "ago"]
    const value = parseInt(parts[0], 10);
    const unit = parts[1].toLowerCase();

    if (unit.startsWith("second")) return value; // in seconds
    if (unit.startsWith("minute")) return value * 60;
    if (unit.startsWith("hour")) return value * 3600;
    if (unit.startsWith("day")) return value * 86400;
    if (unit.startsWith("week")) return value * 604800;

    return Infinity; // fallback
  };

  const sortedData = [...allNewsData].sort((a, b) => {
    const timeA = parseTimeAgo(a?.time_ago ?? "");
    const timeB = parseTimeAgo(b?.time_ago ?? "");
    return timeA - timeB; // ascending (oldest first)
    // return timeB - timeA; // descending (newest first)
  });
  const allTags = [
    "All",
    "Stocks",
    "Startups",
    "Mutual Funds",
    "Crypto",
    "Economy",
  ];
  // Filter logic to show only tags in "interests" (plus "All" and selectedTag)
  const visibleTags = [
    // Always show the selected tag first (if any)
    ...allTags.filter((tag) => tag === selectedTag),

    // Show "All" if it’s not already selected
    ...allTags.filter((tag) => tag === "All" && tag !== selectedTag),

    // Show interests that are in allTags and not already added
    ...allTags.filter(
      (tag) =>
        savedInterests.includes(tag) && tag !== selectedTag && tag !== "All"
    ),
  ];
  if (loading && !refreshing) return <Loader />;
  return (
    <View
      style={[
        globalStyles.pageContainerWithBackground(theme),
        { paddingBottom: 0 },
      ]}
    >
      <View style={styles.headingContainer}>
        <View style={styles.headingThemeContainer}>
          <View style={styles.userHeadingContainer}>
            <Text
              style={[
                styles.userNameStyle,
                {
                  color:
                    theme == "light"
                      ? colors.novemdenaryText
                      : colors.darkSenaryText,
                },
              ]}
            >
              Hello {userName || "--"},
            </Text>
            <Text
              style={[
                globalStyles.title(theme),
                { textAlign: "left", marginBottom: 0 },
              ]}
            >
              Top Headlines
            </Text>
          </View>
          {/* <TouchableOpacity onPress={toggleTheme}>
            <Text style={styles.text}>{theme === "dark" ? "☀️" : "🌙"}</Text>
          </TouchableOpacity> */}
          <View>
            <FilterBar
              selectedFilter={selectedFilter} // match FilterBar values
              setSelectedFilter={setSelectedFilter}
              onFilterChange={(filterValue) => {
                if (filterValue == "recent") {
                  getAllNewsAPI(selectedTag, 1, 10, false, false);
                } else {
                  handleFilterChange("", filterValue, 1, false, false);
                }
              }}
            />
          </View>
        </View>
        <Divider
          style={[
            styles.dividerStyle,
            {
              backgroundColor:
                theme == "light"
                  ? colors.octodenaryBackground
                  : colors.darkUndenaryBackground,
            },
          ]}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabLabelContainer}
        >
          {visibleTags.map((tag) => (
            <TabLabel
              key={tag}
              label={tag}
              selected={selectedTag === tag}
              onPress={() => setSelectedTag(tag)}
            />
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={sortedData ?? []}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <React.Fragment key={item.id}>
            <DiscoverDetailsCard
              index={index}
              authorName={item?.authors?.[0] ?? "--"}
              timeAgo={item?.time_ago ?? "--"}
              impactLabel={item?.impact_label ?? ""}
              impactScore={
                item?.impact_score != null
                  ? item.impact_score.toFixed(2)
                  : "0.00"
              }
              likes={item?.engagement?.likes ?? 0}
              comments={item?.engagement?.comments ?? 0}
              tag={item?.tag ?? ""}
              heading={item?.title_by_level ?? ""}
              summary={item?.summary_by_level ?? ""}
              HeadlineImageComponent={GraphImage2}
              ProfileIconComponent={ProfileIcon}
              onPress={() =>
                navigation.navigate("HeadlineDetailsScreen", {
                  newsId: item?.id ?? "",
                  imageKey: "",
                })
              }
              userExperienceLevel={userExperienceLevel}
            />
            <Divider
              style={[
                styles.dividerStyle,
                {
                  backgroundColor:
                    theme == "light"
                      ? colors.octodenaryBackground
                      : colors.darkUndenaryBackground,
                },
              ]}
            />
          </React.Fragment>
        )}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={(info) => {
          if (!loadingMore && sortedData.length >= limit) {
            handleLoadMore();
          }
        }}
        onEndReachedThreshold={0.2}
        ListEmptyComponent={
          !loading ? (
            <EmptyState message="No data found. Pull to refresh." />
          ) : null
        }
        ListFooterComponent={
          loadingMore ? (
            <View style={{ padding: 16 }}>
              <ActivityIndicator
                size="small"
                color={theme === "light" ? "#000" : "#fff"}
              />
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headingContainer: {
    marginTop: 0,
    marginBottom: 20,
  },
  headingThemeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userHeadingContainer: {
    gap: 0,
  },
  userNameStyle: {
    fontSize: 16,
    fontFamily: fontFamily.Inter500,
  },
  heading: {
    fontSize: 32,
    fontFamily: fontFamily.Cabinet700,
    textAlign: "left",
    color: colors.quaternaryText,
  },
  tabLabelContainer: {
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    //marginTop: 12,
  },
  button: {
    backgroundColor: colors.quinaryBackground,
    borderRadius: 24,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  buttonText: {
    color: colors.quinaryText,
    fontFamily: fontFamily.Satoshi700,
    fontSize: 14,
  },
  swiperWrapper: {
    //marginTop: 40,
    marginBottom: 20,
  },
  dividerStyle: {
    height: 1,
    // backgroundColor: colors.nonaryBorder,
    marginVertical: 24,
  },
  text: {
    fontSize: 24,
    color: "#fff",
  },
});
