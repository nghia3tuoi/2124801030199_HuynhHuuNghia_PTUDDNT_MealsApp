import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Colors from "../utils/color";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { RemoveFavorite } from "../store/CreateStore";

export default function FavoritesScreen({ navigation }: any) {
  const favorites = useSelector((state: any) => state.favorites);
  const dispatch = useDispatch();
  const handleRemoveFavorite = (meal: any) => {
    const isFavorite = favorites.find(
      (item: any) => item.idMeal === meal.idMeal
    );
    if (!isFavorite) {
      Alert.alert("Bạn chưa thêm cái này vào!");
    } else {
      if (meal != null) {
        dispatch(RemoveFavorite(meal));
        Alert.alert("Xóa thành công!");
      }
    }
  };
  const renderMealFavorite = ({ item }: any) => {
    const { idMeal, strMeal, strMealThumb }: any = item;
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomWidth: 1,
          borderBottomColor: "grey",
          padding: 10,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
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
            <View>
              <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
                {strMeal}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleRemoveFavorite(item);
          }}
        >
          <Text style={{ fontSize: 16 }}>
            <MaterialIcons
              size={30}
              name="delete-outline"
              style={{ color: "red" }}
            />
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[{ borderRightColor: "grey" }]}>
        <Text
          style={{
            marginBottom: 10,
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
            color: "#ff9f34",
          }}
        >
          Favorite
        </Text>
      </View>
      {favorites.length <= 0 && <Text style={{textAlign: 'center', fontSize: 16, color: Colors.white}}>Bạn chưa thêm món yêu thích!</Text>}
      {favorites.length > 0 && (
        <View>
          <FlatList
            data={favorites}
            renderItem={renderMealFavorite}
            keyExtractor={(item: any) => {
              return item.idMeal;
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    borderRadius: 22,
    width: 44,
    height: 44,
  },
  title: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 16,
    width: 200,
  },
});
