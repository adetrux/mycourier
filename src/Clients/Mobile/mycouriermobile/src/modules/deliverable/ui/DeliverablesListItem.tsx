import { HubConnection } from "@microsoft/signalr";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../../res/colors";
import { Deliverable } from "../models/deliverable";
import { DeliverableActionModal } from "./DeliverableActionModal";
import { DeliverableIcon } from "./DeliverableIcon";

interface DeliverablesListItemProps {
  deliverable: Deliverable;
  deliverableHubConnection: HubConnection;
}

export function DeliverablesListItem({
  deliverable,
  deliverableHubConnection
}: DeliverablesListItemProps) {
  const [modalOpened, setModalOpened] = useState<boolean>(false);

  const handlePressListItem = () => {
    setModalOpened(true);
  };

  return (
    <View>
      <DeliverableActionModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        deliverable={deliverable}
        deliverableHubConnection={deliverableHubConnection}
      />

      <TouchableOpacity onPress={handlePressListItem} style={styles.item}>
        <Text>{deliverable.name}</Text>
        <DeliverableIcon deliverable={deliverable} />
      </TouchableOpacity>
    </View>
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
