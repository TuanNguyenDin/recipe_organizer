import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Button,
    Image,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useDispatch} from "react-redux";
import {addRecipe} from "../../redux/recipeSlice";
const CreateRecipePage = ({  navigation  }) => {
    const dispatch = useDispatch();

    const [id, setId] = useState([]);
    const [name, setName] = useState([]);
    const [imageUrl, setImageUrl] = useState([]);
    const [rating, setRating] = useState([]);
    const [material, setMaterial] = useState([]);
    const [cookStep, setCookStep] = useState([]);
    const [time, setTime] = useState([]);

    const handleSave = () => {
        // Save the recipe to the database.
        // material to array
        // cookStep to array

        let materialArray = material.split("\n");
        let cookStepArray = cookStep.split("\n");
        dispatch(
            addRecipe({
                id: id,
                name: name,
                imageUrl: imageUrl,
                rating: rating,
                material: materialArray,
                cookStep: cookStepArray,
                time: time,
            })
        );
        navigation.goBack();

    };

    return (
        <View style={styles.container}>
            <Ionicons
                name="arrow-back-outline"
                size={30}
                color="black"
                onPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>Create Recipe</Text>
            <TextInput
                style={styles.textInput}
                placeholder="ID"
                value={id}
                onChangeText={(e) => setId(e)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Name"
                value={name}
                onChangeText={(e) => setName(e)}
            />

            <TextInput
                style={styles.textInput}
                placeholder="Image URL"
                value={imageUrl}
                onChangeText={(e) => setImageUrl(e)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Rating"
                value={rating}
                onChangeText={(e) => setRating(e)}
            />
            <TextInput
                style={styles.longTextInput}
                placeholder="Material"
                multiline={true}
                value={material}
                onChangeText={(e) => setMaterial(e)}
            />
            <TextInput
                style={styles.longTextInput}
                placeholder="Cook Step"
                multiline={true}
                value={cookStep}
                onChangeText={(e) => setCookStep(e)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Time"
                value={time}
                onChangeText={(e) => setTime(e)}
            />
            <Button
                title="Create"
                onPress={handleSave}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,

    },
    longTextInput: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginVertical: 10,
        height: 100,
    }
});

export default CreateRecipePage;