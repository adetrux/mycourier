import React from "react";
import { FlatList, ListRenderItemInfo, StyleSheet } from "react-native";
import { colors } from "../../../res/colors";
import { Deliverable } from "../models/deliverable";
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
  const renderItem = (deliverableItemInfo: ListRenderItemInfo<Deliverable>) => (
    <DeliverablesListItem deliverable={deliverableItemInfo.item} />
  );

  return (
    <FlatList<Deliverable>
      data={deliverables}
      keyExtractor={deliverable => deliverable.id}
      renderItem={deliverable => renderItem(deliverable)}
      style={styles.root}
    />
  );
}

const styles = StyleSheet.create({
  root: {
    //marginTop: 24,
    width: "100%"
    //backgroundColor: "#fff"
  }
});
