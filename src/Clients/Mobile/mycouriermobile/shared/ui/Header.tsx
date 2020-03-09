import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../res/colors";
import { strings } from "../../res/strings";

export function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{strings.title}</Text>
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
