// Màn hình danh sách món ăn
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { fetchMealByName } from "../utils/api";
import { ScrollView } from "react-native-gesture-handler";
import WebView from "react-native-webview";
import YoutubeIframe from "react-native-youtube-iframe";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { AddFavorite } from "../store/CreateStore";
const MealInfo = ({ navigation }: any) => {
  const [meal, setMeal] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const route = useRoute();
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites);
  useEffect(() => {
    if (route.params) {
      const { strMeal }: any = route.params;
      setIsLoading(true);
      fetchMealByName(strMeal)
        .then((response: any) => {
          setIsLoading(false);
          setIsError(false);
          setMeal(response);
        })
        .catch((error: any) => {
          setIsLoading(false);
          setIsError(true);
          // Xử lý khi Promise bị reject (có lỗi)
          console.error("Lỗi khi lấy dữ liệu:", error);
        });

      //   navigation.setOptions({ title: strMeal });
    } else {
      console.log("Không có idMeal");
    }
  }, [route.params]); // Đưa route.params vào mảng phụ thuộc
  const {
    idMeal,
    strMeal,
    strInstructions,
    strMealThumb,
    strCategory,
    strArea,
    strYoutube,
  }: any = meal;
  const getYouTubeVideoID = (url: any) => {
    if (url != null) {
      const regExp =
        /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : null;
    }
  };
  const addMealFavorite = (meal: any) => {
    const isFavorite = favorites.find(
      (item: any) => item.idMeal === meal.idMeal
    );
    if (isFavorite) {
      Alert.alert("Đã thêm cái này vào rồi!");
    } else {
      if (meal != null) {
        dispatch(AddFavorite(meal));
        Alert.alert("Thêm vào yêu thích thành công!");
      }
    }
  };
  const url = strYoutube;
  const videoID = getYouTubeVideoID(url);
  return (
    <ScrollView style={{ flex: 1 }}>
      {isLoading && <ActivityIndicator color={"pink"} size={"large"} />}
      {isError && <Text>Error...</Text>}
      {!isLoading && !isError && (
        <View style={styles.container}>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              marginBottom: 20,
              textTransform: "uppercase",
            }}
          >
            {strMeal}
          </Text>
          <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
            <Image
              style={{ flex: 1, height: 150 }}
              source={{
                uri: strMealThumb,
              }}
            />
            <View style={{ flex: 1, gap: 5 }}>
              <View>
                <Text>
                  Name: <Text>{strMeal}</Text>
                </Text>
              </View>
              <View>
                <Text>
                  Type: <Text>{strCategory}</Text>
                </Text>
              </View>
              <View>
                <Text>
                  Country: <Text>{strArea}</Text>
                </Text>
              </View>
              <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    backgroundColor: "pink",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => addMealFavorite(meal)}
                >
                  <Text
                    style={{
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Add Favorite
                  </Text>
                  <MaterialIcons
                    size={24}
                    name="star-border"
                    style={{ color: "red" }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>
              Intrustion:{" "}
            </Text>
            <Text>{strInstructions}</Text>
          </View>
          <View
            style={{
              flex: 1,
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>
              Link Youtube:
            </Text>
            <View>
              <YoutubeIframe
                height={300}
                videoId={videoID} // Thay thế bằng ID video YouTube của bạn
              />
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});
export default MealInfo;
