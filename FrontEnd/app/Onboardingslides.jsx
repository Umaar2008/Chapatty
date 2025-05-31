import React from "react";
import { View, Text, StyleSheet } from "react-native";
import OnBoarding from "../Components/OnBoarding";

export default function Slides() {
  return (
 <OnBoarding />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
