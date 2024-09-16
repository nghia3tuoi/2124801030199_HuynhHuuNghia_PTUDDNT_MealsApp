import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableHighlight,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../utils/color";
import { useEffect, useState } from "react";
import { fetchMeals, fetchMealsBycountrySlug } from "../utils/api";

export default function HomeScreen({ navigation }: any) {
  const [mealsPork, setMealsPork] = useState([]);
  const [mealsSeaFood, setmealsSeaFood] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([fetchMealsBycountrySlug("French"), fetchMealsBycountrySlug("Italian")])
      .then(([mealsPork, mealsSeaFood]) => {
        setIsLoading(false);
        setIsError(false);
        setMealsPork(mealsPork);
        setmealsSeaFood(mealsSeaFood);
      })
      .catch((e) => {
        setIsError(true);
        console.log(e);
      });
  }, []);
  const renderMealPork = ({ item }: any) => {
    const { idMeal, strMeal, strMealThumb } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MealInfo", { strMeal });
        }}
      >
        <View style={styles.item}>
          <Image
            style={styles.avatar}
            source={{
              uri: strMealThumb,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {strMeal}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const renderMealSeaFood = ({ item }: any) => {
    const { idMeal, strMeal, strMealThumb } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("MealInfo", { strMeal });
        }}
      >
        <View style={styles.item}>
          <Image
            style={styles.avatar}
            source={{
              uri: strMealThumb,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {strMeal}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      {isLoading && <ActivityIndicator color={"pink"} size={"large"} />}
      {isError && <Text>Error...</Text>}
      {!isLoading && !isError && (
        <View style={styles.container}>
          <View
            style={[
              styles.flatList,
              { borderRightColor: "grey", borderRightWidth: 1 },
            ]}
          >
            <Text
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20
              }}
            >
              French
            </Text>
            <FlatList
              data={mealsPork}
              renderItem={renderMealPork}
              keyExtractor={(item: any) => {
                return item.idMeal;
              }}
            />
          </View>
          <View style={styles.flatList}>
            <Text
              style={{
                marginBottom: 10,
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 20
              }}
            >
              Italian
            </Text>
            <FlatList
              data={mealsSeaFood}
              renderItem={renderMealSeaFood}
              keyExtractor={(item: any) => {
                return item.idMeal;
              }}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
  },
  flatList: {
    flex: 1,
    padding: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderBottomColor: "grey",
    borderWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    padding: 5,
  },
  avatar: {
    borderRadius: 22,
    width: 44,
    height: 44,
  },
  title: {
    color: Colors.black,
    fontWeight: "bold",
    fontSize: 16,
    width: "100%",
  },
});
