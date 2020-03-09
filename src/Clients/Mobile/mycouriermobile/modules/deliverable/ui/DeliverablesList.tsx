import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  RefreshControl,
  StyleSheet
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/store/rootReducer";
import { NoAvailableDeliverable } from "../../../shared/ui/NoAvailableDeliverable";
import { Deliverable } from "../models/deliverable";
import { deliverablesService } from "../service/deliverablesService";
import { setDeliverables } from "../store/deliverablesStore";
import { DeliverablesListItem } from "./DeliverablesListItem";

export function DeliverablesList() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const fetchDeliverables = async () => {
    const fetchedDeliverables = await deliverablesService.getDeliverables();
    dispatch(setDeliverables(fetchedDeliverables));
    setRefreshing(false);
  };

  useEffect(() => {
    fetchDeliverables();
  }, [dispatch]);

  const deliverables = useSelector(
    (state: RootState) => state.deliverablesReducer.deliverables
  );

  const renderItem = (deliverableItemInfo: ListRenderItemInfo<Deliverable>) => (
    <DeliverablesListItem deliverable={deliverableItemInfo.item} />
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
