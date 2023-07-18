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
import {editRecipe} from "../../redux/recipeSlice";
const EditRecipePage = ({  navigation ,route }) => {
    const dispatch = useDispatch();

    const recipe = route.params;
    const [id, setId] = useState(recipe.id);
    const [name, setName] = useState(recipe.name);
    const [imageUrl, setImageUrl] = useState(recipe.imageUrl);
    const [rating, setRating] = useState(recipe.rating);
    const [material, setMaterial] = useState(recipe.material.join("\n"));
    const [cookStep, setCookStep] = useState(recipe.cookStep.join("\n"));
    const [time, setTime] = useState(recipe.time);

    const handleSave = () => {
        // Save the recipe to the database.
        // material to array
        // cookStep to array
        let materialArray = material.split("\n");
        let cookStepArray = cookStep.split("\n");
        dispatch(
            editRecipe({
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
            <Text style={styles.title}>Edit Recipe</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
            />
            <TextInput
                style={styles.longTextInput}
                placeholder="Material"
                multiline={true}
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
            />
            <TextInput
                style={styles.longTextInput}
                placeholder="Cook Step"
                multiline={true}
                value={cookStep}
                onChange={(e) => setCookStep(e.target.value)}
            />
            <TextInput
                style={styles.textInput}
                placeholder="Time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
            />
            <Button
                title="Save"
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

export default EditRecipePage;