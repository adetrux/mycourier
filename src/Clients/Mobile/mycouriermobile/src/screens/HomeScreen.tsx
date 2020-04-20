import useInterval from "@use-it/interval";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { DeliverablesList } from "../modules/deliverable/ui/DeliverablesList";
import { colors } from "../res/colors";
import { useHubConnection } from "../shared/hub/hub";
import { hubUrl } from "../shared/service/url";
import { RootState } from "../shared/store/rootReducer";

export function HomeScreen() {
  const isSignedIn = useSelector(
    (state: RootState) => state.userReducer.isSignedIn
  );

  const trackingHubConnection = useHubConnection(hubUrl.trackingHubUrl);

  trackingHubConnection.on(
    "ActualLocationSent",
    (_actualLatitude: number, _actualLongitude: number) => {
      // do nothing
    }
  );

  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    return currentLocation;
  };

  useInterval(async () => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      console.log(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      const location = await getLocation();
      isSignedIn && console.log("actual latitude", location.coords.latitude);
      isSignedIn && console.log("actual longitude", location.coords.longitude);
      isSignedIn && console.log("isloggedin");
      isSignedIn &&
        trackingHubConnection.invoke(
          "SendActualLocation",
          "1-test-deliverable",
          "customer1@gmail.com",
          location?.coords.latitude,
          location?.coords.longitude
        );
    }
  }, 3000);

  useEffect(() => {
    return () => {
      trackingHubConnection
        .invoke(
          "SendActualLocation",
          "1-test-deliverable",
          "customer1@gmail.com",
          null,
          null
        )
        .then(() => {
          trackingHubConnection.stop();
        });
    };
  });

  return (
    <View style={styles.container}>
      <DeliverablesList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
