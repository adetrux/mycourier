import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  RefreshControl,
  StyleSheet
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useHubConnection } from "../../../shared/hub/hub";
import { hubUrl } from "../../../shared/service/url";
import { RootState } from "../../../shared/store/rootReducer";
import { Deliverable } from "../models/deliverable";
import { deliverablesService } from "../service/deliverablesService";
import { setDeliverables } from "../store/deliverablesStore";
import { DeliverablesListItem } from "./DeliverablesListItem";
import { NoAvailableDeliverable } from "./NoAvailableDeliverable";

export function DeliverablesList() {
  const dispatch = useDispatch();
  const deliverables = useSelector(
    (state: RootState) => state.deliverablesReducer.deliverables
  );

  const deliverableHubConnection = useHubConnection(hubUrl.deliverableHubUrl);
  const trackingHubConnection = useHubConnection(hubUrl.trackingHubUrl);

  deliverableHubConnection.on(
    "DeliverableCreated",
    (deliverable: Deliverable) => {
      console.log("on");
      dispatch(setDeliverables([deliverable, ...deliverables]));
    }
  );

  deliverableHubConnection.on("DeliverableUpdated", () => {
    console.log("deliverable updated");
  });

  trackingHubConnection.on(
    "ActualLocationSent",
    (_actualLatitude: number, _actualLongitude: number) => {
      // do nothing
    }
  );

  const [refreshing, setRefreshing] = useState(false);

  const fetchDeliverables = async () => {
    const fetchedDeliverables = await deliverablesService.getDeliverables();
    dispatch(setDeliverables(fetchedDeliverables));
    setRefreshing(false);
  };

  useEffect(() => {
    fetchDeliverables();
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchDeliverables();
  }, []);

  const getLocationAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
    }
    const currentLocation = await Location.getCurrentPositionAsync({});
    return currentLocation;
  };

  useEffect(() => {
    setInterval(async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        console.log(
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
        );
      } else {
        const location = await getLocationAsync();
        console.log("actual latitude", location.coords.latitude);
        console.log("actual longitude", location.coords.longitude);
        trackingHubConnection.invoke(
          "SendActualLocation",
          location?.coords.latitude,
          location?.coords.longitude
        );
      }
    }, 3000);
  }, []);

  const renderItem = (deliverableItemInfo: ListRenderItemInfo<Deliverable>) => (
    <DeliverablesListItem
      deliverable={deliverableItemInfo.item}
      deliverableHubConnection={deliverableHubConnection}
    />
  );

  return (
    <>
      <FlatList<Deliverable>
        data={deliverables}
        keyExtractor={deliverable => deliverable.id}
        renderItem={deliverable => renderItem(deliverable)}
        style={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      {deliverables.length === 0 && !refreshing && <NoAvailableDeliverable />}
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%"
  }
});
