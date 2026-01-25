import ExerciseDetail from "@/components/exercise-detail";
import React, { useState } from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import TickCard from "../../../components/tick-card";

export default function Exercise() {
  const [exerciseDetailVisible, setExerciseDetailVisible] = useState(false);

  const onPressCard = () => {
    setExerciseDetailVisible(true);
  };
  const closeExerciseDetail = () => {
    setExerciseDetailVisible(false);
  };

  const onPressAddNew = () => {
    // TODO: Implement add new exercise functionality
    console.log("Add new exercise pressed");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Fitness Exercise Planner</Text>
          <Text style={styles.subtitle}>
            Plan your workouts and track your fitness journey
          </Text>
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

          <TickCard
            title="Push Ups"
            reps={15}
            sets={3}
            isCompleted={false}
            onPressCard={onPressCard}
          />
        </View>
      </ScrollView>

      {/* Sticky Add Button at Bottom */}
      <View style={styles.stickyButtonContainer}>
        <TouchableOpacity style={styles.addButton} onPress={onPressAddNew}>
          <Text style={styles.addButtonText}>+ ADD NEW EXERCISE</Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={exerciseDetailVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeExerciseDetail}
      >
        <ExerciseDetail />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Add padding to prevent content from being hidden behind sticky button
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
  tickCardList: {
    paddingBottom: 16,
  },
  stickyButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#f8f4ff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 4,
    borderTopColor: "#000000",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 10,
  },
  addButton: {
    backgroundColor: "#00FF00",
    borderWidth: 4,
    borderColor: "#000000",
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  addButtonText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
    textAlign: "center",
    letterSpacing: 1,
  },
});
