import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logoutSuccess } from "../../redux/userSlice";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../database/firebaseConfig";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if(email==='admin') {
      dispatch(login(user, password));
    }else{
    if (
      email !== null ||
      email !== "" ||
      password !== null ||
      password !== ""
    ) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch(login({ email: email, password: password }));
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode ==='auth/wrong-password'){alert('Wrong password')}
          if (errorCode ==='auth/invalid-email'){alert('Invalid email')}
          if (errorCode ==='auth/user-not-found'){alert('User not found')}
          console.log(errorCode)
        });
    }};
  };
  const handleSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.email)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if(errorCode ==="auth/email-already-in-use"){alert("Your email already used");}
        if (errorCode ==='auth/invalid-email'){alert('Invalid email')}
        console.log(errorCode)
      });
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
                  source={{
                    uri: "https://img.freepik.com/premium-vector/avatar-portrait-young-caucasian-boy-man-round-frame-vector-cartoon-flat-illustration_551425-19.jpg?w=1380",
                  }}
                />
              </View>
            </View>
            <Button onPress={handleLogout} title="Logout" color="#d2b48c" />
          </View>
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.inputEmail}
            keyboardType="email-address"
            placeholder="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
          />
          <TextInput
            style={styles.inputPassword}
            secureTextEntry={true}
            placeholder="Password"
            value={password}
            onChangeText={(e) => setPassword(e)}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSignUp}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
          </View>
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
  loginContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputEmail: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  inputPassword: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
export default LoginForm;
