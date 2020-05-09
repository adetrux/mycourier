import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Platform,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { buildHubConnection } from "../../../shared/hub/hub";
import { hubUrl } from "../../../shared/service/url";
import { RootState } from "../../../shared/store/rootReducer";
import { Deliverable } from "../models/deliverable";
import { deliverablesService } from "../service/deliverablesService";
import {
  setDeliverables,
  setDeliveringToCustomerIds,
} from "../store/deliverablesStore";
import { DeliverablesListItem } from "./DeliverablesListItem";
import { NoAvailableDeliverable } from "./NoAvailableDeliverable";

export function DeliverablesList() {
  const dispatch = useDispatch();
  const deliverables = useSelector(
    (state: RootState) => state.deliverablesReducer.deliverables
  );

  const deliverableHubConnection = buildHubConnection(hubUrl.deliverableHubUrl);

  deliverableHubConnection.on(
    "DeliverableCreated",
    (deliverable: Deliverable) => {
      dispatch(setDeliverables([deliverable, ...deliverables]));
    }
  );

  deliverableHubConnection.on("DeliverableUpdated", () => {
    console.log("deliverable updated");
  });

  const [refreshing, setRefreshing] = useState(false);

  const fetchDeliverables = async () => {
    const fetchedDeliverables = await deliverablesService.getDeliverables();
    dispatch(setDeliverables(fetchedDeliverables));
    setRefreshing(false);
  };

  useEffect(() => {
    fetchDeliverables();
  }, [dispatch]);

  const fetchDeliveringToCustomerIds = async () => {
    const fetchedDeliveringToCustomerIds = await deliverablesService.getDeliveringToCustomerIds();
    dispatch(setDeliveringToCustomerIds(fetchedDeliveringToCustomerIds));
  };

  useEffect(() => {
    fetchDeliveringToCustomerIds();
  }, [dispatch]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchDeliverables();
    fetchDeliveringToCustomerIds();
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
        keyExtractor={(deliverable) => deliverable.id}
        renderItem={(deliverable) => renderItem(deliverable)}
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
    width: "100%",
  },
});
