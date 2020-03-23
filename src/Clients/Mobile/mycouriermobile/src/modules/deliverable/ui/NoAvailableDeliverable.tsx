import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../res/colors";
import { strings } from "../../../res/strings";

export function NoAvailableDeliverable() {
  return (
    <View style={styles.view}>
      <Text>{strings.noAvailableDeliverable}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    backgroundColor: colors.lightBlue,
    marginBottom: 50,
    padding: 20,
    borderRadius: 20
  }
});
