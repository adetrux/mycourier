import { HubConnection } from "@microsoft/signalr";
import React, { useCallback } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from "react-redux";
import { Deliverable } from "../models/deliverable";
import { deliverablesService } from "../service/deliverablesService";
import { updateDeliverable } from "../store/deliverablesStore";
import {
  DeliverableStateType,
  getDeliverableState
} from "../store/deliverableState";

interface DeliverableActionModalProps {
  modalOpened: boolean;
  setModalOpened(value: React.SetStateAction<boolean>): void;
  deliverable: Deliverable;
  hubConnection: HubConnection;
}

export function DeliverableActionModal({
  modalOpened,
  setModalOpened,
  deliverable,
  hubConnection
}: DeliverableActionModalProps) {
  const dispatch = useDispatch();
  const deliverableActualState = getDeliverableState(deliverable);

  const handlePressButton = useCallback(
    (type: DeliverableStateType) => () => {
      if (deliverableActualState.type !== type) {
        const deliverableToUpdate: Deliverable = {
          ...deliverable,
          accepted: type === DeliverableStateType.PLACED ? false : true,
          delivering:
            type === DeliverableStateType.PLACED ||
            type === DeliverableStateType.ACCEPTED
              ? false
              : true,
          delivered:
            type === DeliverableStateType.PLACED ||
            type === DeliverableStateType.ACCEPTED ||
            type === DeliverableStateType.DELIVERING
              ? false
              : true
        };

        dispatch(updateDeliverable(deliverableToUpdate));
        hubConnection.invoke("UpdateDeliverable", deliverableToUpdate);
        deliverablesService.updateDeliverable(
          deliverableToUpdate.id,
          deliverableToUpdate
        );

        if (
          type === DeliverableStateType.ACCEPTED ||
          type === DeliverableStateType.DELIVERING
        ) {
          // TODO: start sending coordinates
        }
      }

      setModalOpened(false);
    },
    [deliverable, dispatch, hubConnection]
  );

  return (
    <Modal animationType="slide" transparent={false} visible={modalOpened}>
      <View style={styles.modalView}>
        <Text style={styles.title}>{deliverable.name}</Text>
        <Text style={styles.state}>{deliverableActualState.name}</Text>
        <TouchableOpacity
          onPress={handlePressButton(DeliverableStateType.PLACED)}
          style={styles.button}
        >
          <Text>Placed</Text>
          <Icon name="place" size={26} color="grey" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressButton(DeliverableStateType.ACCEPTED)}
          style={styles.button}
        >
          <Text>Accept</Text>
          <Icon name="person-pin-circle" size={26} color="#1565c0" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressButton(DeliverableStateType.DELIVERING)}
          style={styles.button}
        >
          <Text>Delivering</Text>
          <Icon name="local-shipping" size={26} color="orange" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressButton(DeliverableStateType.DELIVERED)}
          style={styles.button}
        >
          <Text>Delivered</Text>
          <Icon name="check" size={26} color="green" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    width: "100%",
    marginTop: 24,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  },
  state: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  button: {
    marginTop: 24,
    padding: 24,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20
  }
});
