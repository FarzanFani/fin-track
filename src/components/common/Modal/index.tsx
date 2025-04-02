import React, { useState } from "react";
import { Modal, View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

export default function BottomModal() {
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state

  // Toggle modal visibility
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      {/* Button to open the modal */}
      <Button title="Open Bottom Modal" onPress={toggleModal} />

      {/* Bottom Modal */}
      <Modal
        animationType="slide" // Modal animation (can be "slide", "fade", or "none")
        transparent={true} // Makes the background outside the modal transparent
        visible={modalVisible} // Whether the modal is visible or not
        onRequestClose={toggleModal} // Close modal on back press (Android)
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>This is a bottom modal!</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end", // Positions the modal at the bottom of the screen
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  closeText: {
    color: "blue",
    fontSize: 16,
  },
});
