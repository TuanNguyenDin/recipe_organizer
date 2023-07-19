import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logoutSuccess } from "../../redux/userSlice";
import { Text, View, Button, TextInput, StyleSheet, Image } from "react-native";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (
      email !== null ||
      email !== "" ||
      password !== null ||
      password !== ""
    ) {
      const user = { email: email, password: password };
      dispatch(login(user));
    }
  };
  const handleLogout = () => {
    dispatch(logoutSuccess());
  };
  return (
    <View>
      {isLoggedIn ? (
        <View>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>Welcome</Text>
                <Text style={styles.userInfo}>{user.email}</Text>
              </View>
              <View>
                <Image
                  style={styles.avatar}
                  source={{uri: 'https://img.freepik.com/premium-vector/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.jpg?w=1380'}}
                />
              </View>
            </View>
            <Button onPress={handleLogout} title="Logout" color="#d2b48c" />
          </View>
        </View>
      ) : (
        <View>
          <TextInput
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
          <Button onPress={handleLogin} title="Login" color="#841584" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#d2b48c",
    backgroundSize: "contain",
    height: 160,
  },

  headerContent: {
    padding: 30,
    alignItems: "center",
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
    float: "right",
  },
  location: {
    borderColor: "white",
    width: 10,
    height: 10,
    float: "left",
  },
  hamburger: {
    borderColor: "black",
    width: 10,
    height: 10,
    float: "right",
  },
});
export default LoginForm;
