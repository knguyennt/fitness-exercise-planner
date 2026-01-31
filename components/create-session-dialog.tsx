import React, { useState } from "react";
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface CreateSessionDialogProps {
  visible: boolean;
  onClose: () => void;
  onCreateSession: (sessionName: string) => void;
}

export default function CreateSessionDialog({
  visible,
  onClose,
  onCreateSession,
}: CreateSessionDialogProps) {
  const [sessionName, setSessionName] = useState("");

  const handleCreate = () => {
    if (sessionName.trim()) {
      onCreateSession(sessionName.trim());
      setSessionName("");
    } else {
      Alert.alert("Error", "Please enter a session name");
    }
  };

  const handleCancel = () => {
    setSessionName("");
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.dialogContainer}>
          <Text style={styles.dialogTitle}>Create New Session</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Session Name</Text>
            <TextInput
              style={styles.textInput}
              value={sessionName}
              onChangeText={setSessionName}
              placeholder="Enter session name..."
              placeholderTextColor="#6b7280"
              autoFocus={true}
            />
          </View>

          <View style={styles.dialogButtons}>
            <TouchableOpacity
              style={[styles.dialogButton, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.dialogButton, styles.createButton]}
              onPress={handleCreate}
            >
              <Text style={styles.createButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  dialogContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 4,
    borderColor: "#000000",
    borderRadius: 0,
    padding: 24,
    width: "100%",
    maxWidth: 400,
    shadowColor: "#000000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000000",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 0,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#ffffff",
    color: "#000000",
    fontWeight: "600",
  },
  dialogButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  dialogButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 0,
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  cancelButton: {
    backgroundColor: "#ef4444",
  },
  createButton: {
    backgroundColor: "#10b981",
  },
  cancelButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});
