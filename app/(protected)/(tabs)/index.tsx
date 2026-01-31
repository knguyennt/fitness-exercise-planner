import CreateSessionDialog from "@/components/create-session-dialog";
import ExerciseDetail from "@/components/exercise-detail";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import CalendarComponent from "../../../components/calendar";
import TickCard from "../../../components/tick-card";

export default function Index() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [exerciseDetailVisible, setExerciseDetailVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [createDialogVisible, setCreateDialogVisible] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saving changes...");
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleDropdownAction = (action: string) => {
    setDropdownVisible(false);
    if (action === "create_session") {
      setCreateDialogVisible(true);
    } else {
      console.log("Action selected:", action);
    }
  };

  const handleCreateSession = (sessionName: string) => {
    console.log("Creating session:", sessionName);
    setCreateDialogVisible(false);
  };

  const closeCreateDialog = () => {
    setCreateDialogVisible(false);
  };

  const onPressCard = () => {
    setExerciseDetailVisible(true);
  };
  const closeExerciseDetail = () => {
    setExerciseDetailVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Fitness Exercise Planner</Text>
        <Text style={styles.subtitle}>
          Plan your workouts and track your fitness journey
        </Text>
      </View>

      <CalendarComponent onDateSelect={handleDateSelect} />

      <View style={styles.selectedDateContainer}>
        <View style={styles.dateHeader}>
          <Text style={styles.selectedDateText}>
            {selectedDate.toDateString()}
          </Text>

          <View style={styles.actionButtons}>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity
                style={[styles.actionButton, styles.moreButton]}
                onPress={toggleDropdown}
              >
                <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              {dropdownVisible && (
                <View style={styles.dropdown}>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleDropdownAction("create_session")}
                  >
                    <Ionicons name="add" size={16} color="#000000" />
                    <Text style={styles.dropdownText}>Create Session</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleDropdownAction("edit")}
                  >
                    <Ionicons name="pencil" size={16} color="#000000" />
                    <Text style={styles.dropdownText}>Edit Workout</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleDropdownAction("duplicate")}
                  >
                    <Ionicons name="copy-outline" size={16} color="#000000" />
                    <Text style={styles.dropdownText}>Duplicate Day</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => handleDropdownAction("delete")}
                  >
                    <Ionicons name="trash-outline" size={16} color="#000000" />
                    <Text style={styles.dropdownText}>Delete Workout</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {isEditing && (
          <View style={styles.editModeIndicator}>
            <Text style={styles.editModeText}>✨ Edit Mode Active</Text>
          </View>
        )}
      </View>

      <View style={styles.tickCardList}>
        <TickCard
          title="Push Ups"
          reps={15}
          sets={3}
          isCompleted={false}
          onPressCard={onPressCard}
        />

        <TickCard
          title="Push Ups"
          reps={15}
          sets={3}
          isCompleted={false}
          onPressCard={onPressCard}
        />
      </View>

      <Modal
        visible={exerciseDetailVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeExerciseDetail}
      >
        <ExerciseDetail />
      </Modal>

      <CreateSessionDialog
        visible={createDialogVisible}
        onClose={closeCreateDialog}
        onCreateSession={handleCreateSession}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
  },
  header: {
    padding: 24,
    backgroundColor: "#6b46c1",
    borderBottomWidth: 6,
    borderBottomColor: "#000000",
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  subtitle: {
    fontSize: 16,
    color: "#e9d5ff",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "600",
  },
  selectedDateContainer: {
    padding: 20,
    margin: 16,
    backgroundColor: "#ffffff",
    borderWidth: 4,
    borderColor: "#000000",
    borderRadius: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  dateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedDateText: {
    fontSize: 18,
    color: "#000000",
    fontWeight: "800",
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#000000",
    borderRadius: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  editButton: {
    backgroundColor: "#10b981",
  },
  saveButton: {
    backgroundColor: "#3b82f6",
  },
  moreButton: {
    backgroundColor: "#8b5cf6",
  },
  dropdownContainer: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: 52,
    right: 0,
    backgroundColor: "#ffffff",
    borderWidth: 4,
    borderColor: "#000000",
    borderRadius: 0,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
    minWidth: 180,
    zIndex: 1000,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#e5e7eb",
  },
  dropdownText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "600",
    color: "#000000",
  },
  editModeIndicator: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#fef3c7",
    borderWidth: 2,
    borderColor: "#f59e0b",
    borderRadius: 0,
  },
  editModeText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#92400e",
    textAlign: "center",
  },
  tickCardList: {
    zIndex: -1,
  },
});
