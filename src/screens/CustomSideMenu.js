import { StyleSheet, Text, View, Image, FlatList, ImageBackground, TouchableOpacity, } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList, } from "@react-navigation/drawer";

const CustomSideMenu = (props) => {

    const bottomList = [
        { id: "1", icon: "information-circle-outline", title: "About Us" },
        { id: "2", icon: "exit-outline", title: "Logout" },
    ];

    const Item = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.item}>
                    <Ionicons name={item.icon} size={20} color="black" />
                    <Text style={styles.textItem}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{ backgroundColor: "white" }}
            >
                <ImageBackground
                    source={{
                        uri: "https://i.pinimg.com/originals/8c/bd/72/8cbd72a89d45f89fd58daca54a63f225.jpg",
                    }}
                    resizeMode="cover"
                    style={{ height: 200 }}
                >
                    <View style={styles.profileContainer}>
                        <Image
                            source={{
                                uri: "https://img.freepik.com/premium-vector/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.jpg?w=1380",
                            }}
                            style={styles.profileImage}
                        />
                        <Text style={[styles.textProfile, { fontSize: 22 }]}>
                            User
                        </Text>
                        <Text style={[styles.textProfile]}>1xxx followers</Text>
                    </View>
                </ImageBackground>
                <View style={styles.itemContainer}>
                    <DrawerItemList {...props} activeTintColor="green" />
                </View>
            </DrawerContentScrollView>
            <View style={styles.bottomContainer}>
                <FlatList
                    data={bottomList}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={(item) => item.id}
                />
            </View>
        </View>
    );
};

export default CustomSideMenu;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    profileContainer: {
        paddingHorizontal: 20,
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 50,
        marginTop: 10
    },
    textProfile: {
        fontWeight: "bold",
        marginTop: 10,
        overflow: "hidden",
        color: "white",
    },
    itemContainer: {
        backgroundColor: "white",
        marginTop: 10
    },
    item: {
        flexDirection: "row",
        marginVertical: 8,
        marginHorizontal: 16,
        paddingVertical: 6,
    },
    textItem: {
        fontSize: 18,
        marginLeft: 10,
    },
    bottomContainer: {
        backgroundColor: "white",
        borderTopWidth: 0.5,
        borderTopColor: "lightgrey",
    },
});
