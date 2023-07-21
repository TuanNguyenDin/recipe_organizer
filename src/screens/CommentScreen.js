import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import COLORS from "../constants/colors";
import {useDispatch, useSelector} from "react-redux";
import moment from "moment/moment";
import {addComment} from "../../redux/commentSlice";

const CommentItem = (props) => {
    return (
        <View style={styles.commentItem}>
            <View style={styles.commentHeader}>

                <View>
                    <Text style={{fontSize: 12, fontWeight: "bold"}}>
                        {// remove email domain
                            props.email.split("@")[0]
                        }
                    </Text>
                    <Text style={{fontSize: 14, color: "grey"}}>
                        {moment(props.date).fromNow()}
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
                {props.content}
            </Text>
        </View>
    );
}
const CommentScreen = ({navigation, route}) => {
    const {id} = route.params;
    const distpatch = useDispatch();

    //

    const {comment} = useSelector((state) => state.comment);
    const {user,isLoggedIn} = useSelector((state) => state.user);

    const commentList = comment.filter((item) => {
        return item.recipeId === id;
    });

    // sort comment by date
    commentList.sort((a, b) => {
        return moment(b.date) - moment(a.date);
    });

    const [content, setContent] = React.useState("");

    const handleComment = () => {
        if (!isLoggedIn) {
            alert("Please login to comment");
            return;
        }
        const newComment = {
            recipeId: id,
            email: user.email,
            content: content,
            date: moment().format(),
        };
        console.log(newComment);
        // add new comment to state
        distpatch(addComment(newComment));
        // clear content field
        setContent("");
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

            </View>
            <View style={styles.commentContainer}>
                <ScrollView>

                    <View style={styles.commentBody}>
                        {
                            commentList.map((item, index) => {
                                return (
                                    <CommentItem
                                        key={index}
                                        email={item.email}
                                        date={item.date}
                                        content={item.content}
                                    />
                                );
                            })
                        }
                    </View>

                </ScrollView>
                <View style={styles.inputContainer}>
                    {// show comment inside input field
                    }
                    <TextInput
                        placeholder="Add a comment..."
                        style={styles.input}
                        onChangeText={setContent}
                        multiline={true}
                        value={content}></TextInput>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleComment}
                    >
                        <Ionicons
                            name="send"
                            size={24}
                            color="grey"
                            style={styles.buttonText}
                        />

                    </TouchableOpacity>


                </View>


            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    commentContainer: {
        flex: 1,
        margin: 10,
    },
    commentBody: {
        flex: 1,
        padding: 10,
    },
    commentItem: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
    },
    input: {
        height: "auto", // "auto
        width: "100%",
        padding: 10,
    },
    button: {

        color: "grey",
        float: "right",
    },
    buttonText: {
        textAlign: "right",
        fontSize: 20,
        color: "grey",
    },
    inputContainer: {
        flexDirection: "column",
        justifyContent: "space-between",
        alignContent: "flex-end",
        padding: 10,
        backgroundColor: "#ecf0f1",
        borderRadius: 10,
    },
});


export default CommentScreen;