import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../res/colors";

export function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Deliverables</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 24,
    height: 60,
    width: "100%",
    paddingTop: 17,
    backgroundColor: colors.blue
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});
