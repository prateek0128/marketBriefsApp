import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useContext, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Divider } from "react-native-paper";
import { getHighImpactNewsById } from "../../../apiServices/news";
import {
  addComments,
  checkLikeStatus,
  deleteComments,
  getComments,
  toggleLike,
  toggleLikeComments,
} from "../../../apiServices/newsEngagement";
import { pinNews, unpinNews } from "../../../apiServices/newsManagement";
import {
  CommentIconDark,
  CommentIconLight,
  CurrencyImage2,
  HeartCommentIcon,
  HeartCommentIconFilled,
} from "../../../assets/icons/components/headlineDetailsView";
import { NewsAuthorIcon } from "../../../assets/icons/components/homepage";
import { colors } from "../../../assets/styles/colors";
import fontFamily from "../../../assets/styles/fontFamily";
import globalStyles from "../../../assets/styles/globalStyles";
import ClippedSVG from "../../../components/clippedSVG/clippedSVG";
import Header from "../../../components/header/header";
import ImpactLabel from "../../../components/impactLabel/impactLabel";
import Loader from "../../../components/Loader/loader";
import LoaderOverlay from "../../../components/LoadOverlay/loadOverlayTransparent";
import ProfileIcon from "../../../components/profileIcon/profileIcon";
import Tag from "../../../components/tag/tag";
import { ThemeContext } from "../../../context/themeContext";
import { useBackPressNavigate } from "../../../hooks/useBackPressNavigate";
import { RootStackParamList } from "../../../types/navigation";
import { getAxiosErrorMessage } from "../../../utils/axiosError";
import { loadProfileData } from "../../../utils/loadProfileData";
import showToast from "../../../utils/showToast";
import { storage } from "../../../utils/storage";

dayjs.extend(relativeTime);
const { width, height } = Dimensions.get("window");

type HeadlineDetailsRouteProp = RouteProp<
  RootStackParamList,
  "HeadlineDetailsScreen"
>;

const imageMap: Record<
  string,
  React.ComponentType<{ width?: number; height?: number }>
> = {
  currency: CurrencyImage2,
};
interface NewsData {
  title?: string;
  title_by_level?: any;
  impact_label?: string;
  impact_score?: number;
  summary?: string;
  summary_by_level?: any;
  url?: string;
  tag?: string;
  authors?: string;
  time_ago?: string;
  source?: string;
  market_mood?: any;
}
const HeadlineDetailsScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<HeadlineDetailsRouteProp>();
  const { newsId, imageKey, path } = route.params || {};
  console.log("NewsId=>", newsId);
  console.log("Path=>", path);
  const [comment, setComment] = useState("");
  const { theme, toggleTheme } = useContext(ThemeContext);
  interface CommentData {
    id: number;
    user_id?: string;
    name?: string;
    commented_at?: string;
    comment?: string;
    likes?: number;
    user_has_liked?: boolean;
    // add other fields as needed
  }
  const [commentsData, setCommentsData] = useState<CommentData[]>([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [newsData, setNewsData] = useState<NewsData>({});
  const [likedComments, setLikedComments] = useState<Record<number, boolean>>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [addCommentsLoader, setAddCommentsLoader] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [userExperienceLevel, setUserExperienceLevel] = useState<string>("");
  const [userId, setUserId] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const getUserLevel = async () => {
    try {
      const userExperienceLevel = await storage.getItem("userExperienceLevel");
      setUserExperienceLevel(userExperienceLevel || ""); // provide a default value if null
      console.log(userExperienceLevel); // this is the actual stored value
    } catch (e) {
      console.log("Failed to fetch user experience level", e);
    }
  };
  useEffect(() => {
    if (newsId) {
      getNewsByIDAPI(newsId);
      getCommentsAPI(newsId);
      //checkUserLikeNewsStatusAPI(newsId);
      checkLikeStatusAPI(newsId);
    }
    //getBookmarkAPI();
    getUserLevel();
  }, [newsId]);
  // News By Id
  const getNewsByIDAPI = async (newsId: string) => {
    setLoading(true);
    try {
      const response = await getHighImpactNewsById(newsId);
      console.log("newsResponseByID:", response.data);
      setNewsData(response.data);
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      showToast(errorMessage, "danger");
    } finally {
      setLoading(false);
    }
  };
  // All comments
  const getCommentsAPI = async (newsId: string) => {
    console.log("Inside Get Comments=>");
    try {
      const response = await getComments(newsId);
      console.log("CommentsResponse=>", response.data.data);
      setCommentsData(response.data.data.comments);
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      showToast(errorMessage, "danger");
    }
  };
  //News Like-Unlike and Saved Article Status
  const checkLikeStatusAPI = async (newsId: string) => {
    try {
      const response = await checkLikeStatus(newsId);
      console.log("CheckLikeStatusAPI", response.data);
      setLiked(response.data.liked);
      setBookmarked(response.data.is_pinned);
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      showToast(errorMessage, "danger");
    }
  };
  // News Like and Unlike  API
  const handleToggleLike = () => {
    console.log("inside handleToggleLike");
    setLiked((prev) => !prev);

    if (newsId) {
      toggleLikeAPI(newsId);
    }
  };
  const toggleLikeAPI = async (newsId: any) => {
    try {
      const response = await toggleLike(newsId);
      console.log("Toggle Like=>", response.data);
      showToast(response.data.message, "success");
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      console.log("ErrorMessagePinNews", errorMessage);
      showToast(errorMessage, "danger");
    }
  };
  // Comment Like and Unlike  API
  const handleToggleLikeComment = (commentId: any) => {
    console.log("inside handleToggleLikeComment");
    // setLiked((prev) => !prev);
    // Update state
    if (commentId) {
      toggleLikeCommentAPI(commentId);
    }
  };
  const toggleLikeCommentAPI = async (commentId: any, isLiked?: any) => {
    const likeCommentData = { is_liked: isLiked };
    try {
      const response = await toggleLikeComments(commentId);
      const commentData = response.data.data;
      console.log("Toggle Like Comment=>", commentData);
      setLikedComments((prev) => ({
        ...prev,
        [commentId]: commentData.user_has_liked,
      }));
      // Update commentsData likes count immediately
      setCommentsData((prevComments: any[]) =>
        prevComments.map((comment: any) =>
          comment.id === commentId
            ? {
                ...comment,
                likes: commentData.total_likes, // ✅ from API
                user_has_liked: commentData.user_has_liked,
              }
            : comment
        )
      );
      //showToast(response.data.message, "success");
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      showToast(errorMessage, "danger");
    }
  };
  // Bookmark or Save Article API
  const handleToggleBookmark = () => {
    console.log("Inside handleToggleBookmark");
    setBookmarked((prev) => {
      const newStatus = !prev;
      if (newsId) {
        if (newStatus) {
          handlePinNews(newsId);
        } else {
          handleUnPinNews(newsId);
        }
      }
      return newStatus;
    });
  };
  const handlePinNews = async (newsId: string) => {
    console.log("Inside handlePinNews");
    try {
      const response = await pinNews(newsId);
      console.log("PinNewsResponse=>", response.data);
      console.log("PinNews=>", response.data.success);
      showToast("News bookmarked successfully", "success");
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      console.log("ErrorMessagePinNews", errorMessage);
      showToast(errorMessage, "danger");
    }
  };
  const handleUnPinNews = async (newsId: string) => {
    console.log("Inside handleUnPinNews");
    try {
      const response = await unpinNews(newsId);
      console.log("UninNewsResponse=>", response.data);
      console.log("UninNews=>", response.data.success);
      showToast("News bookmarked unsuccessfully", "success");
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      showToast(errorMessage, "danger");
    }
  };
  // Add Comment API
  const addCommentsAPI = async (newsId: any) => {
    setAddCommentsLoader(true);
    const commentData = {
      comment: comment,
    };
    try {
      console.log("AddCommentPaylaod=>", commentData);
      const response = await addComments(newsId, commentData);
      console.log("AddCommentResponse=>", response);
      showToast(response.data.message, "success");
      setComment("");
      getCommentsAPI(newsId);
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      showToast(errorMessage, "danger");
    } finally {
      setAddCommentsLoader(false);
    }
  };
  //Delete Comment API
  const deleteCommentAPI = async (commentId: any) => {
    try {
      const response = await deleteComments(commentId);
      console.log("DeleteCommentResponse=>", response.data);
      // showToast(response.data.message, "success");
      getCommentsAPI(newsId ?? "");
    } catch (err) {
      const errorMessage = getAxiosErrorMessage(err);
      console.log("ErrorMessageDeleteNews", errorMessage);
      showToast(errorMessage, "danger");
    }
  };

  const getShortTimeAgo = (dateString: any) => {
    const now = dayjs();
    const past = dayjs(dateString);
    const diffInMinutes = now.diff(past, "minute");
    const diffInHours = now.diff(past, "hour");
    const diffInDays = now.diff(past, "day");

    if (diffInMinutes < 60) {
      return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h`;
    } else {
      return `${diffInDays}d`;
    }
  };

  const handleOpenNewsLink = (url: string) => {
    if (!url) return;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Cannot open the link: " + url);
        }
      })
      .catch((err) => {
        console.error("An error occurred", err);
        Alert.alert("Error", "An unexpected error occurred");
      });
  };

  const titleByLevel =
    userExperienceLevel === "beginner"
      ? newsData.title_by_level?.beginner ?? ""
      : userExperienceLevel === "intermediate"
      ? newsData.title_by_level?.intermediate ?? ""
      : userExperienceLevel === "novice"
      ? newsData.title_by_level?.novice ?? ""
      : userExperienceLevel === "expert"
      ? newsData.title_by_level?.expert ?? ""
      : "";
  const summaryByLevel =
    userExperienceLevel === "beginner"
      ? newsData.summary_by_level?.beginner ?? ""
      : userExperienceLevel === "intermediate"
      ? newsData.summary_by_level?.intermediate ?? ""
      : userExperienceLevel === "novice"
      ? newsData.summary_by_level?.novice ?? ""
      : userExperienceLevel === "expert"
      ? newsData.summary_by_level?.expert ?? ""
      : "";
  // Remove leading/trailing whitespace and split by "•"
  const summaryArray = (summaryByLevel ?? "")
    .split("•")
    .map((point: any) => point.trim())
    .filter((point: any) => point.length > 0);

  useBackPressNavigate(
    path == "Saved" ? "BottomTabNavigator" : "Home",
    path == "Saved" ? { screen: "Saved" } : undefined
  );
  useEffect(() => {
    const fetchProfile = async () => {
      const { id, profile } = await loadProfileData();
      setUserId(id ?? "");
      setUserProfile(profile);
    };

    fetchProfile();
  }, []);
  const marketSentiments = [
    {
      label: "Positive",
      value: `${newsData.market_mood?.positive || 0}%`,
      emoji: "assets/images/positionIcon.png",
      color: "#23C16B",
    },
    {
      label: "Neutral",
      value: `${newsData.market_mood?.neutral || 0}%`,
      emoji: "assets/images/neutralIcon.png",
      color: "#72777A",
    },
    {
      label: "Worried",
      value: `${newsData.market_mood?.negative || 0}%`,
      emoji: "assets/images/worriedIcon.png",
      color: "#FF5247",
    },
  ];
  const visibleComments = showAllComments
    ? commentsData
    : commentsData.slice(0, 3);
  if (loading) return <Loader />;
  // if (addCommentsLoader) return <LoaderOverlay visible={true} />;
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // tweak this if needed
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={[
            globalStyles.pageContainerWithBackground(theme),
            { flex: 0 },
          ]}
        >
          {addCommentsLoader ? (
            <LoaderOverlay visible={true} />
          ) : (
            <>
              <View style={styles.headerContainer}>
                <Header
                  onBackClick={() => {
                    console.log("Back to Home");
                    if (navigation.canGoBack()) {
                      navigation.goBack();
                    } else {
                      navigation.navigate("Home"); // fallback if there's no previous screen
                    }
                  }}
                  backArrow={true}
                  liked={liked}
                  setLiked={setLiked}
                  bookmarked={bookmarked}
                  setBookmarked={setBookmarked}
                  onToggleLikeClick={handleToggleLike}
                  shareUrl={newsData.url}
                  onToggleBookmarkClick={handleToggleBookmark}
                  // onClickLink={() => handleOpenNewsLink(newsData.url ?? "")}
                  showActivityIcons={true}
                />
              </View>
              <View style={styles.headingDetailsContainer}>
                <View style={styles.authorIconContainer}>
                  <NewsAuthorIcon />
                  <View style={styles.authorTimeContainer}>
                    <Text
                      style={[
                        styles.authorTimeText,
                        {
                          color:
                            theme === "light"
                              ? colors.octodenaryText
                              : colors.white,
                          fontSize: 14,
                        },
                      ]}
                    >
                      {`${newsData?.source || "--"} ·`}
                    </Text>
                    <Text
                      style={[
                        styles.authorTimeText,
                        {
                          fontSize: 12,
                          color:
                            theme === "dark"
                              ? colors.darkQuaternaryText
                              : colors.unvigintaryText,
                        },
                      ]}
                    >
                      {`${newsData.time_ago || "--"}`}
                    </Text>
                  </View>
                </View>
                <View>
                  <Text
                    style={[
                      styles.articleDetailsHeading,
                      {
                        color:
                          theme === "dark"
                            ? colors.darkPrimaryText
                            : colors.octodenaryText,
                      },
                    ]}
                  >
                    {titleByLevel}
                  </Text>
                </View>
                <View style={styles.headingContainer}>
                  <View style={styles.detailsHeader}>
                    <View style={styles.tagContainer}>
                      {newsData.tag == "bearish" ? (
                        <Tag
                          label={"Bearish"}
                          backgroundColor={"#FFE5E5"}
                          textColor={"#FF5247"}
                        />
                      ) : newsData.tag == "bullish" ? (
                        <Tag
                          label={"Bullish"}
                          backgroundColor={"#ECFCE5"}
                          textColor={"#23C16B"}
                        />
                      ) : newsData.tag == "market" ? (
                        <Tag
                          label={"Market"}
                          backgroundColor={"#E7E7FF"}
                          textColor={"#6B4EFF"}
                        />
                      ) : newsData.tag == "neutral" ? (
                        <Tag
                          label={"Neutral"}
                          backgroundColor={"#ECFCE5"}
                          textColor={"#23C16B"}
                        />
                      ) : newsData.tag == "important" ? (
                        <Tag
                          label={"Important"}
                          backgroundColor={"#E7E7FF"}
                          textColor={"#6B4EFF"}
                        />
                      ) : (
                        ""
                      )}
                    </View>
                    <View style={styles.profileNameContainer}>
                      <ImpactLabel
                        variant={"contained"}
                        label={newsData.impact_label}
                        value={
                          newsData.impact_score != null ||
                          newsData.impact_score != undefined
                            ? newsData.impact_score.toFixed(2)
                            : "0.00"
                        }
                        backgroundColor={colors.quindenaryBackground}
                        textColor={colors.quattuordenaryBackground}
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    marginTop: 16,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* {renderImage()} */}
                  <ClippedSVG
                    width={width * 0.89}
                    height={200}
                    radius={16}
                    ImageComponent={CurrencyImage2}
                  />
                </View>
                <View style={styles.summaryDetailsConatiner}>
                  <Text
                    style={[
                      styles.keyTakeStyle,
                      {
                        color:
                          theme == "light"
                            ? colors.octodenaryText
                            : colors.white,
                      },
                    ]}
                  >
                    Key Takeaways :
                  </Text>

                  {summaryArray.map((point: any, index: number) => (
                    <View key={index} style={styles.listItem}>
                      <Text
                        style={[
                          styles.listPoints,
                          {
                            color:
                              theme === "dark"
                                ? colors.darkPrimaryText
                                : colors.duovigintaryText,
                          },
                        ]}
                      >
                        {index + 1}.{/* • */}
                      </Text>
                      <Text
                        style={[
                          styles.listPoints,
                          {
                            color:
                              theme === "dark"
                                ? colors.darkPrimaryText
                                : colors.duovigintaryText,
                          },
                        ]}
                      >
                        {point}
                      </Text>
                    </View>
                  ))}

                  <TouchableOpacity
                    style={styles.viewCommentsContainer}
                    onPress={() => handleOpenNewsLink(newsData.url ?? "")}
                  >
                    <Text
                      style={[
                        styles.viewCommentsText,
                        {
                          color:
                            theme === "dark"
                              ? colors.vigenaryText
                              : colors.sexdenaryText,
                        },
                      ]}
                    >
                      Read More
                    </Text>
                  </TouchableOpacity>
                </View>
                <Divider
                  style={[
                    styles.dividerStyle,
                    {
                      backgroundColor:
                        theme == "light"
                          ? colors.nonaryBorder
                          : colors.darkUndenaryBackground,
                    },
                  ]}
                />
                <View style={styles.marketMoodContainer}>
                  <View>
                    <Text
                      style={[
                        styles.marketMoodText,
                        {
                          color:
                            theme === "dark"
                              ? colors.white
                              : colors.octodenaryText,
                        },
                      ]}
                    >
                      Market Mood :
                    </Text>
                  </View>
                  <View style={styles.marketCardsContainer}>
                    {marketSentiments.map((item, index) => (
                      <View
                        key={index}
                        style={[
                          styles.marketCard,
                          {
                            borderColor:
                              theme === "dark"
                                ? colors.undenaryBorder
                                : colors.nonaryBorder,
                          },
                        ]}
                      >
                        <View>
                          <Text
                            style={[
                              styles.positiveValue,
                              { color: item.color },
                            ]}
                          >
                            {item.value}
                          </Text>
                          <Image source={{ uri: item.emoji }} />
                        </View>
                        <View>
                          <Text
                            style={[
                              styles.positiveText,
                              {
                                color:
                                  theme === "dark"
                                    ? colors.white
                                    : colors.octodenaryText,
                              },
                            ]}
                          >
                            {item.label}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </View>
                  <View>
                    <Text
                      style={[
                        styles.marketMoodDescription,
                        {
                          color:
                            theme === "dark"
                              ? colors.white
                              : colors.octodenaryText,
                        },
                      ]}
                    >
                      Market sentiments leans towards bearish with significant
                      concern over international factors.
                    </Text>
                  </View>
                </View>
                <Divider
                  style={[
                    styles.dividerStyle,
                    {
                      backgroundColor:
                        theme == "light"
                          ? colors.nonaryBorder
                          : colors.darkUndenaryBackground,
                    },
                  ]}
                />
              </View>
              <View style={styles.relatedDiscussionsContainer}>
                <View style={styles.relatedDiscussionsHeader}>
                  <Text
                    style={[
                      styles.relatedDiscussionsHeading,
                      {
                        color:
                          theme === "dark"
                            ? colors.darkPrimaryText
                            : colors.octodenaryText,
                      },
                    ]}
                  >
                    Related Discussions
                  </Text>
                  {commentsData.length > 0 && (
                    <Text
                      style={[
                        styles.commentCount,
                        {
                          color:
                            theme === "dark"
                              ? colors.vigenaryText
                              : colors.sexdenaryText,
                        },
                      ]}
                    >
                      {`${
                        commentsData.length < 2
                          ? `${commentsData.length} Comment`
                          : `${commentsData.length} Comments`
                      }`}
                    </Text>
                  )}
                </View>
                <View style={styles.relatedDiscussionsDetails}>
                  {visibleComments && visibleComments.length > 0 ? (
                    visibleComments.map((comment: any) => (
                      <View
                        key={comment.id}
                        style={styles.relatedDiscussionsArticle}
                      >
                        {comment.user_id == userId && userProfile ? (
                          <Image
                            source={{ uri: userProfile }}
                            borderRadius={50}
                            width={40}
                            height={40}
                          />
                        ) : (
                          <ProfileIcon type="male" size={40} />
                        )}
                        <View style={{ flex: 1 }}>
                          <View style={styles.relatedDiscussionsArticle}>
                            <Text
                              style={[
                                styles.authorName,
                                {
                                  color:
                                    theme === "dark"
                                      ? colors.darkPrimaryText
                                      : colors.octodenaryText,
                                },
                              ]}
                            >
                              {comment.name || "--"}
                            </Text>
                            <Text
                              style={[
                                styles.articleTime,
                                {
                                  color:
                                    theme === "dark"
                                      ? colors.darkSenaryText
                                      : colors.unvigintaryText,
                                },
                              ]}
                            >
                              {getShortTimeAgo(comment.commented_at)}
                            </Text>
                          </View>
                          <Text
                            style={[
                              styles.relatedArticleText,
                              {
                                color:
                                  theme === "dark"
                                    ? colors.white
                                    : colors.octodenaryText,
                              },
                            ]}
                          >
                            {comment.comment}
                          </Text>
                          <View style={styles.likeUnlikeContainer}>
                            <View style={styles.likeReplyContainer}>
                              <View style={styles.iconCountContainer}>
                                <TouchableOpacity
                                  onPress={() => {
                                    handleToggleLikeComment(comment.id);
                                  }}
                                >
                                  {!comment.user_has_liked ? (
                                    <HeartCommentIcon width={20} height={20} />
                                  ) : (
                                    <HeartCommentIconFilled
                                      width={20}
                                      height={20}
                                    />
                                  )}
                                </TouchableOpacity>
                                <Text
                                  style={[
                                    styles.articleTime,
                                    {
                                      color:
                                        theme === "dark"
                                          ? colors.darkSenaryText
                                          : colors.unvigintaryText,
                                    },
                                  ]}
                                >
                                  {comment.likes || 0}
                                </Text>
                              </View>
                              {/* <TouchableOpacity>
                                <Text
                                  style={[
                                    styles.articleTime,
                                    {
                                      color:
                                        theme === "dark"
                                          ? colors.darkSenaryText
                                          : colors.unvigintaryText,
                                    },
                                  ]}
                                >
                                  Reply
                                </Text>
                              </TouchableOpacity> */}
                              {comment.user_id == userId && (
                                <TouchableOpacity
                                  onPress={() => deleteCommentAPI(comment.id)}
                                >
                                  <Text
                                    style={[
                                      styles.articleTime,
                                      {
                                        color:
                                          theme === "dark"
                                            ? colors.darkSenaryText
                                            : colors.unvigintaryText,
                                      },
                                    ]}
                                  >
                                    Delete
                                  </Text>
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text
                      style={[
                        styles.articleTime,
                        {
                          textAlign: "center",
                          marginTop: 10,
                          color:
                            theme === "dark"
                              ? colors.darkSenaryText
                              : colors.unvigintaryText,
                        },
                      ]}
                    >
                      No comments yet. Be the first to comment!
                    </Text>
                  )}
                </View>
              </View>
              {commentsData.length > 3 && !showAllComments && (
                <TouchableOpacity
                  style={styles.viewCommentsContainer}
                  onPress={() => setShowAllComments(true)}
                >
                  <Text
                    style={[
                      styles.viewCommentsText,
                      {
                        color:
                          theme === "dark"
                            ? colors.vigenaryText
                            : colors.sexdenaryText,
                      },
                    ]}
                  >
                    View All Comments
                  </Text>
                </TouchableOpacity>
              )}
              <View
                style={[
                  styles.commentContainer,
                  { alignItems: isFocused ? "flex-end" : "center" },
                ]}
              >
                {userProfile ? (
                  <Image
                    source={{ uri: userProfile }}
                    borderRadius={50}
                    width={40}
                    height={40}
                  />
                ) : (
                  <ProfileIcon type="male" size={40} />
                )}
                <View
                  style={[
                    styles.commentWrapper,
                    {
                      backgroundColor:
                        theme === "dark"
                          ? colors.darkPrimaryBackground
                          : colors.primaryBackground,
                      borderEndColor:
                        theme === "dark"
                          ? colors.duovigintaryText
                          : colors.darkQuinaryText,
                    },
                    isFocused && {
                      flexDirection: "column",
                      alignItems: "stretch",
                      height: "auto",
                      minHeight: 100,
                      //paddingBottom: 8,
                    },
                  ]}
                >
                  <TextInput
                    style={[
                      styles.commentInput,
                      {
                        backgroundColor:
                          theme === "dark"
                            ? colors.darkPrimaryBackground
                            : colors.primaryBackground,

                        color:
                          theme === "dark"
                            ? colors.darkPrimaryText
                            : colors.undenaryBackground,

                        borderColor:
                          theme === "dark"
                            ? colors.quaternaryBorderColor
                            : colors.tertiaryBorderColor,
                        height: isFocused ? 100 : 48, // Expand height when focused
                        // width: isFocused ? "100%" : "80%", // Expand width when focused
                        textAlignVertical: "top",
                      },
                    ]}
                    placeholder="Add a comment..."
                    placeholderTextColor={
                      theme == "dark"
                        ? colors.darkSenaryText
                        : colors.unvigintaryText
                    }
                    multiline={isFocused}
                    keyboardType="default"
                    value={comment}
                    onChangeText={(text) => {
                      setComment(text);
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => {
                      if (comment.trim() === "") {
                        setIsFocused(false);
                      }
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      addCommentsAPI(newsId);
                      Keyboard.dismiss(); // dismiss keyboard
                      setIsFocused(false); // manually collapse the textarea
                    }}
                    disabled={comment.trim() === ""}
                    style={{
                      opacity: comment.trim() === "" ? 0.4 : 1,
                    }}
                  >
                    <View
                      style={[
                        styles.commentButton,
                        {
                          alignSelf: isFocused ? "flex-end" : "center",
                          backgroundColor:
                            theme === "dark"
                              ? colors.darkQuaternaryBackground
                              : colors.septendenaryBackground,
                        },
                      ]}
                    >
                      {theme === "light" ? (
                        <CommentIconLight />
                      ) : (
                        <CommentIconDark />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default HeadlineDetailsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 0,
    marginBottom: 24,
  },
  headingDetailsContainer: {
    gap: 24,
  },
  headingContainer: {
    gap: 16,
  },

  summaryDetailsConatiner: {
    gap: 16,
  },
  keyTakeStyle: {
    fontFamily: fontFamily.Inter700,
    fontSize: 18,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
  },
  listIndex: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.tertiaryText,
  },
  articleDetailsHeading: {
    fontFamily: fontFamily.Inter700,
    fontSize: 30,
  },
  detailsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tagContainer: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  profileNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  profileName: {
    flexDirection: "column",
    justifyContent: "center",
  },
  headingName: {
    fontFamily: fontFamily.Cabinet700,
    fontSize: 12,
    color: colors.primaryText,
  },
  meta: {
    fontSize: 8,
    fontFamily: fontFamily.Satoshi500,
    color: colors.tertiaryText,
  },
  listPoints: {
    fontSize: 16,
    fontFamily: fontFamily.Inter400,
  },
  relatedDiscussionsContainer: {
    marginTop: 32,
    gap: 28,
  },
  relatedDiscussionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  relatedDiscussionsHeading: {
    fontFamily: fontFamily.Inter700,
    fontSize: 18,
  },
  commentCount: {
    fontFamily: fontFamily.Inter400,
    fontSize: 16,
  },
  relatedDiscussionsDetails: {
    gap: 20,
  },
  relatedDiscussionsArticle: {
    flexDirection: "row",
    gap: 12,
  },
  authorName: {
    fontFamily: fontFamily.Inter500,
    fontSize: 16,
  },
  articleTime: {
    fontSize: 14,
    fontFamily: fontFamily.Inter400,
    color: colors.unvigintaryText,
  },
  relatedArticleText: {
    fontSize: 16,
    fontFamily: fontFamily.Inter400,
    color: colors.duovigintaryText,
  },
  likeUnlikeContainer: {
    flexDirection: "row",
    paddingTop: 8,
    gap: 36,
  },
  likeReplyContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
  },
  iconCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  commentContainer: {
    //paddingHorizontal: 12,
    marginTop: 32,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    width: "100%",
    gap: 16,
  },
  commentWrapper: {
    width: "84%",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.darkQuinaryText,
    padding: 12,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    height: 64,
  },
  commentInput: {
    width: "80%",
    fontFamily: fontFamily.Inter500,
    fontSize: 16,
    //height: 48,
  },
  commentButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 999,
    backgroundColor: colors.primaryText,
  },
  authorIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  authorTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  authorTimeText: {
    fontFamily: fontFamily.Inter400,
  },
  dividerStyle: {
    height: 1,
  },
  marketMoodContainer: {
    gap: 24,
  },
  marketMoodText: {
    fontFamily: fontFamily.Inter700,
    fontSize: 18,
  },
  marketCardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
    width: "100%",
  },
  marketCard: {
    gap: 16,
    borderRadius: 12,
    borderWidth: 1,
    padding: 12,
    flex: 1,
  },
  positiveValue: {
    fontFamily: fontFamily.Inter700,
    fontSize: 24,
    color: colors.tresvigintaryText,
  },
  positiveText: {
    fontFamily: fontFamily.Inter400,
    fontSize: 14,
  },
  marketMoodDescription: {
    fontFamily: fontFamily.Inter400,
    fontSize: 16,
  },
  viewCommentsContainer: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  viewCommentsText: {
    fontFamily: fontFamily.Inter700,
    fontSize: 16,
    color: colors.sexdenaryText,
  },
});
