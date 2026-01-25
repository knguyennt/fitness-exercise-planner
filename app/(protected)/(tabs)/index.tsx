import ExerciseDetail from "@/components/exercise-detail";
import React, { useState } from "react";
import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import CalendarComponent from "../../../components/calendar";
import TickCard from "../../../components/tick-card";

export default function Index() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [exerciseDetailVisible, setExerciseDetailVisible] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
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
        <Text style={styles.selectedDateText}>
          Selected Date: {selectedDate.toDateString()}
        </Text>
      </View>

      <TickCard
        title="Push Ups"
        reps={15}
        sets={3}
        isCompleted={false}
        onPressCard={onPressCard}
      />

      <Modal
        visible={exerciseDetailVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeExerciseDetail}
      >
        <ExerciseDetail />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#007AFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#E8F2FF",
    textAlign: "center",
    marginTop: 8,
  },
  selectedDateContainer: {
    padding: 16,
    margin: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedDateText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
