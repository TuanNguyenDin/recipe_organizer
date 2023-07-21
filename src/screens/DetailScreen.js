import {Animated, FlatList, Image, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View,} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import {AntDesign, Ionicons, MaterialCommunityIcons,} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSelector} from "react-redux";
import moment from "moment";

const DetailsScreen = ({navigation, route}) => {
    const [scaleValue, setScaleValue] = useState(new Animated.Value(1));
    const [favData, setFavData] = useState([]);
    const data = route.params;
    const {comment} = useSelector((state) => state.comment);

    // check data.id = comment.recipeId

    const commentData = comment.filter((item) => item.recipeId === data.id);



    // recent comment
    const recentComment = commentData.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });

    const lastComment = recentComment[0];




    useEffect(() => {
        getFromStorage();
    }, []);

    const getFromStorage = async () => {
        const data = await AsyncStorage.getItem("favorite");
        setFavData(data != null ? JSON.parse(data) : []);
    };

    const setDataToStorage = async () => {
        let list;
        if (favData == []) {
            list = [data.id];
            await AsyncStorage.setItem("favorite", JSON.stringify(list));
        } else {
            list = [...favData, data.id];
            await AsyncStorage.setItem("favorite", JSON.stringify(list));
        }
        setFavData(list);
    };

    const removeDataFromStorage = async () => {
        const list = favData.filter((item) => item !== data.id);
        await AsyncStorage.setItem("favorite", JSON.stringify(list));
        setFavData(list);
    };

    const changeFavorite = () => {
        Animated.timing(scaleValue, {
            toValue: 0.8,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }).start();
        });

        if (favData.includes(data.id)) {
            removeDataFromStorage();
        } else {
            setDataToStorage();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Ionicons
                    name="arrow-back-outline"
                    size={30}
                    color="black"
                    onPress={() => navigation.goBack()}
                />
                <TouchableWithoutFeedback onPress={changeFavorite}>
                    <Animated.View style={[{
                        transform:
                            [{scale: scaleValue}]
                    }]}>
                        {favData.includes(data.id) ? (
                            <MaterialCommunityIcons
                                name="cards-heart"
                                size={38}
                                color="#ff007f"
                            />
                        ) : (
                            <MaterialCommunityIcons
                                name="cards-heart-outline"
                                size={38}
                                color="grey"
                            />
                        )}
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.imageItem} source={{uri: data.imageUrl}}/>
            </View>
            <ScrollView
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={{height: 300}}
                contentInsetAdjustmentBehavior="automatic"
            >
                <View style={styles.detailContainer}>
                    <View style={styles.detailHeader}>
                        <Text
                            style={{
                                fontSize: 22,
                                fontWeight: "bold",
                                flex: 4,
                                marginLeft: 20,
                            }}
                        >
                            {data.name}
                        </Text>
                        <View style={styles.startTag}>
                            <AntDesign
                                style={styles.iconStar}
                                name="star"
                                size={14}
                                color="#fff700"
                            />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    color: COLORS.white,
                                    fontWeight: "bold",
                                    fontSize: 16,
                                }}
                            >
                                {data.rating}
                            </Text>
                        </View>
                    </View>

                    <View style={{flex: 1}}>
                        <View style={styles.aboutContainer}>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>Material</Text>
                            <FlatList
                                data={data.material}
                                scrollEnabled={false}
                                renderItem={({item, index}) => (
                                    <Text style={{color: "grey", marginTop: 5, fontSize: 15}}>
                                        {index + 1} : {item}
                                    </Text>
                                )}
                            />
                        </View>
                        <View style={styles.aboutContainer}>
                            <Text style={{fontSize: 20, fontWeight: "bold"}}>Cooking Steps</Text>
                            <FlatList
                                data={data.cookStep}
                                scrollEnabled={false}
                                renderItem={({item, index}) => (
                                    <Text style={{color: "grey", marginTop: 5, fontSize: 15}}>
                                        {index + 1} - {item}
                                    </Text>
                                )}
                            />
                        </View>
                    </View>

                </View>

                {/*Comment*/}
                <View style={styles.commentContainer}>
                    <View style={styles.commentHeader}>
                        <Text style={{fontSize: 20, fontWeight: "bold"}}>Comments</Text>
                        <Text onPress={() => navigation.navigate("CommentScreen", data)}
                                style={{fontSize: 16, color: "grey"}}>
                            See all
                        </Text>
                    </View>
                    <View style={styles.commentBody}>
                        {lastComment && (
                            <View style={styles.commentItem}>
                                <View style={styles.commentHeader}>

                                    <View>
                                        <Text style={{fontSize: 12, fontWeight: "bold"}}>
                                            {// remove email domain
                                                lastComment.email.split("@")[0]
                                            }
                                        </Text>
                                        <Text style={{fontSize: 14, color: "grey"}}>
                                            {moment(lastComment.date).fromNow()}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={{
                                    fontSize: 16,
                                    marginTop: 10,
                                    backgroundColor: "#3498db",
                                    color: COLORS.white,
                                    padding: 10,
                                    borderRadius: 20,
                                    flex: 1,
                                }}>
                                    {lastComment.content}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightOrange,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginTop: 10,
    },
    imageContainer: {
        flex: 0.35,
        marginTop: 14,
        marginHorizontal: 40,
        borderRadius: 15,
        overflow: "hidden",
    },
    imageItem: {
        flex: 1,
        resizeMode: "cover",
        width: "100%",
    },
    detailContainer: {
        flex: 0.7,
        backgroundColor: COLORS.light,
        marginHorizontal: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 15,
    },
    detailHeader: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    startTag: {
        flex: 1,
        backgroundColor: COLORS.green,
        width: 80,
        height: 40,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
    },
    aboutContainer: {marginTop: 15, paddingHorizontal: 20},
    headerIcon: {
        overflow: "hidden",
        padding: 13,
        borderRadius: 30,
        backgroundColor: "#d8dfff",
        justifyContent: "center",
        alignItems: "center",
    },
    commentContainer: {
        flex: 0.7,
        backgroundColor: COLORS.light,
        marginHorizontal: 5,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        marginTop: 15,
    },
    commentHeader: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    commentBody: {
        flex: 1,
        marginTop: 10,
        paddingHorizontal: 20,

    },
    commentItem: {
        flex: 1,
        backgroundColor: COLORS.light,
        borderRadius: 15,
        marginBottom: 10,
    },
    commentAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },


});
