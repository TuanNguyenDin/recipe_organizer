import React, {useEffect, useState} from "react";
import {Alert, Button, FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import COLORS from "../constants/colors";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {deleteRecipe} from "../../redux/recipeSlice";


const AdminScreen = ({navigation}) => {
    const [recipes, setRecipes] = useState([]);
    const dispatch = useDispatch();
    const recipesd = useSelector((state) => state.recipe);

    useEffect(() => {
        setRecipes(recipesd.recipes);
        console.log(recipesd.recipes);
    }, [recipesd]);
    const [editingRecipe, setEditingRecipe] = useState(null);
    const addRecipe = () => {
        navigation.navigate("CreateRecipe");
    };
    const editRecipe = (recipe) => {
        // RecipeModal = ({ id, categoryId, name, imageUrl, rating, material, cookStep, time }) => {
        //
        navigation.navigate("EditRecipe", recipe);
    };


    const btnDeleteRecipe = (id) => {
        // Delete recipe from the server
        Alert.alert('Delete Recipe', 'Are you sure you want to delete this recipe?', [
            {text: 'Cancel', style: 'cancel'},
            {
                text: 'Delete',
                style: 'destructive',
                onPress: () => {
                    dispatch(deleteRecipe(id));
                },
            },
        ]);


    };


    return (
        <ScrollView style={styles.container}>
            {recipes.length !== 0 ? (
                <View>
                    <View style={styles.textHeaderContainer}>
                        <Text style={styles.textHeader}>Recipe Management</Text>
                    </View>

                        <Button title={"Add Recipe"}
                                onPress={addRecipe}/>



                    <View style={styles.cardContainer}>
                        <FlatList
                            data={recipes}
                            showsVerticalScrollIndicator={false}
                            columnWrapperStyle={{justifyContent: "space-between"}}
                            scrollEnabled={false}
                            numColumns={2}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => (

                                <View style={styles.rootContainer}>
                                    <Image
                                        style={styles.imageItem}
                                        resizeMode="cover"
                                        source={{uri: item.imageUrl}}
                                    />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.text}>{item.name}</Text>
                                    </View>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            btnDeleteRecipe(item.id)
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            style={styles.icon}
                                            name="delete-alert"
                                            size={22}
                                            color="#ff007f"
                                        />
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={{marginTop: 30}}
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            editRecipe(item)
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            style={styles.icon}
                                            name="pencil"
                                            size={22}
                                            color="#ff007f"
                                        />
                                    </TouchableOpacity>

                                </View>
                            )}
                        />
                    </View>
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <Image source={{uri: 'https://th.bing.com/th/id/OIP.T-BcUUNcRa8aEkLxy-4XFgHaHa?pid=ImgDet&rs=1'}}/>
                    <Text style={styles.textEmpty}>No recipes found</Text>
                </View>
            )}
        </ScrollView>

    );

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightOrange,
    },
    clearContainer: {
        marginHorizontal: 20,
    },
    innerClearContainer: {
        flexDirection: "row",
        paddingVertical: 5,
    },
    textHeaderContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    textHeader: {
        fontSize: 30,
        fontWeight: "bold",
        color: COLORS.orange,
    },
    cardContainer: {
        flex: 1,
        marginHorizontal: 20,
    },
    emptyContainer: {
        height: 550,
        justifyContent: "center",
        alignItems: "center",
    },
    textEmpty: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    rootContainer: {
        height: 150,
        width: 150,
        backgroundColor: COLORS.light,
        marginHorizontal: 2,
        borderRadius: 10,
        marginVertical: 20,
        overflow: "hidden",
    },
    imageItem: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.75,
    },
    textContainer: {
        position: "absolute",
        height: 50,
        left: 0,
        right: 0,
        bottom: 0,
        paddingHorizontal: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "white",
        fontSize: 12,
        fontWeight: "bold",
        textAlign: "center",
    },
    icon: {
        position: "absolute",
        top: 10,
        right: 10,
    }
});


export default AdminScreen;