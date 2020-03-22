import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useConnection } from "../../../shared/hub/hub";
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
  const hubConnection = useConnection(hubUrl.deliverableHubUrl);
  hubConnection.on("DeliverableCreated", (deliverable: Deliverable) => {
    console.log("on");
    dispatch(setDeliverables([deliverable, ...deliverables]));
  });

  hubConnection.on("DeliverableUpdated", () => {
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

  const renderItem = (deliverableItemInfo: ListRenderItemInfo<Deliverable>) => (
    <DeliverablesListItem
      deliverable={deliverableItemInfo.item}
      hubConnection={hubConnection}
    />
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    fetchDeliverables();
  }, []);

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
