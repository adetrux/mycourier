import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  RefreshControl
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../shared/store/rootReducer";
import { NoAvailableDeliverable } from "../../../shared/ui/NoAvailableDeliverable";
import { Deliverable } from "../models/deliverable";
import { deliverablesService } from "../service/deliverablesService";
import { setDeliverables } from "../store/deliverablesStore";
import { DeliverablesListItem } from "./DeliverablesListItem";

const deliverables: Deliverable[] = [
  {
    id: "1",
    name: "package1",
    start: 1,
    end: 2,
    accepted: false,
    delivering: false,
    delivered: false
  },
  {
    id: "2",
    name: "package2",
    start: 3,
    end: 4,
    accepted: true,
    delivering: false,
    delivered: false
  },
  {
    id: "3",
    name: "package3",
    start: 3,
    end: 4,
    accepted: true,
    delivering: true,
    delivered: false
  },
  {
    id: "4",
    name: "package4",
    start: 3,
    end: 4,
    accepted: true,
    delivering: true,
    delivered: true
  }
];

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

  // if (deliverables.length === 0) {
  //   return <NoAvailableDeliverable />;
  // } else {
  return (
    <>
      <FlatList<Deliverable>
        data={deliverables}
        keyExtractor={deliverable => deliverable.id}
        renderItem={deliverable => renderItem(deliverable)}
        style={styles.root}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
      {deliverables.length === 0 && !refreshing && <NoAvailableDeliverable />}
    </>
  );
  //}
}

const styles = StyleSheet.create({
  root: {
    //marginTop: 24,
    width: "100%"
    //backgroundColor: "#fff"
  }
});
