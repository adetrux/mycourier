import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../../../res/colors";
import { Deliverable } from "../models/deliverable";
import { DeliverableIcon } from "./DeliverableIcon";

interface DeliverablesListItemProps {
  deliverable: Deliverable;
}

export function DeliverablesListItem({
  deliverable
}: DeliverablesListItemProps) {
  return (
    <TouchableOpacity style={styles.item}>
      <Text>{deliverable.name}</Text>
      <DeliverableIcon deliverable={deliverable} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    marginTop: 6,
    padding: 24,
    backgroundColor: colors.lightBlue,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
    //marginLeft: 6,
    //marginRight: 6,
    //borderWidth: 1,
    //borderRadius: 20
  }
});
