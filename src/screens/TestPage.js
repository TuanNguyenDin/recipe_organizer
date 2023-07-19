import { StyleSheet, Text, View } from "react-native";
import React from "react";

const TestPage = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 26, fontWeight: "bold" }}>
      you do not have permission!!!
      </Text>
    </View>
  );
};

export default TestPage;

const styles = StyleSheet.create({});
