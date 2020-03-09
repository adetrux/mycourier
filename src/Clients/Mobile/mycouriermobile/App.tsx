import React from "react";
import { StyleSheet, View } from "react-native";
import { DeliverablesList } from "./modules/deliverable/ui/DeliverablesList";
import { colors } from "./res/colors";
import { Header } from "./shared/ui/Header";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <DeliverablesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center"
  }
});
