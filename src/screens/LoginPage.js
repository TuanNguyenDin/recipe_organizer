import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/Login";
import MealPlanScreen from "../screens/MealPlanScreen";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.user);
  return (
    <View>
      <LoginForm />
      {isLoggedIn ? <MealPlanScreen navigation={navigation} /> : ""}
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
