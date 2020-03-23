import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { DeliverablesList } from "./src/modules/deliverable/ui/DeliverablesList";
import { colors } from "./src/res/colors";
import { store } from "./src/shared/store/store";
import { Header } from "./src/shared/ui/Header";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Header />
        <DeliverablesList />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
