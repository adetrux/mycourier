import useInterval from "@use-it/interval";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useEffect } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { DeliverablesList } from "../modules/deliverable/ui/DeliverablesList";
import { trackingService } from "../modules/tracking/service/trackingService";
import { colors } from "../res/colors";
import { buildHubConnection } from "../shared/hub/hub";
import { hubUrl } from "../shared/service/url";
import { RootState } from "../shared/store/rootReducer";

export function HomeScreen() {
  const isSignedIn = useSelector(
    (state: RootState) => state.userReducer.isSignedIn
  );

  const deliveringToCustomerIds = useSelector(
    (state: RootState) => state.deliverablesReducer.deliveringToCustomerIds
  );

  const trackingHubConnection = buildHubConnection(hubUrl.trackingHubUrl);

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
      if (isSignedIn) {
        const { latitude, longitude } = location?.coords;
        trackingService.setLocation({ latitude, longitude });
        trackingHubConnection.invoke(
          "SendActualLocation",
          deliveringToCustomerIds,
          latitude,
          longitude
        );
      }
    }
  }, 3000);

  useEffect(() => {
    return () => {
      trackingHubConnection
        .invoke("SendActualLocation", deliveringToCustomerIds, null, null)
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
