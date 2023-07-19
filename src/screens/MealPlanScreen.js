import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { RECIPES } from "../../database/recipes";
import Card from "../components/Card";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MealPlanScreen = ({ navigation }) => {
  const [recipes, SetRecipe] = useState(RECIPES);
  const [favData, setFavData] = useState([]);
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getRandomItems = (data, count) => {
    // Sao chép mảng data để không ảnh hưởng đến mảng gốc
    const copiedData = [...data];
    // Sắp xếp mảng theo thứ tự ngẫu nhiên
    const shuffledData = copiedData.sort(() => 0.5 - Math.random());
    // Lấy phần tử từ đầu mảng
    const randomItems = shuffledData.slice(0, count);
    return randomItems;
  };
  const renderItem = ({ item }) => (
    <View>
      <Text>{item}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: "space-between",
        }}
        numColumns={2}
        data={getRandomItems(recipes,3)}
        renderItem={({ item }) => (
          <Card
            navigation={navigation}
            data={item}
            favData={favData}
            setFavData={setFavData}
          />
        )}
      />
    </View>
  );

  return (
    <FlatList
      data={days}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  day: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  note: {
    fontStyle: "italic",
    marginTop: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "gray",
  },
  item: {
    backgroundColor: "#DDDDDD",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
  },
  itemDetails: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
  },
  tinyLogo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    display: "flex",
    justifyContent: "flex-start",
  },
});

export default MealPlanScreen;
