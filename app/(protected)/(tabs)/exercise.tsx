import CreateEditExercise from "@/components/create-edit-exercise";
import ExerciseDetail from "@/components/exercise-detail";
import { useExercise } from "@/hooks/useExercise";
import { supabase } from "@/utils/supabase";
import React, { useEffect, useState } from "react";
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
  const [createExerciseVisible, setCreateExerciseVisible] = useState(false);

  const [editExerciseVisible, setEditExerciseVisible] = useState(false);
  const [exerciseData, setExerciseData] = useState<any[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<any>(null);
  const { createExercise, deleteExercise, updateExercise } = useExercise();

  const onPressCard = (data: any) => {
    setSelectedExercise(data);
    setExerciseDetailVisible(true);
  };
  const closeExerciseDetail = () => {
    setExerciseDetailVisible(false);
  };

  const onPressAddNew = () => {
    setCreateExerciseVisible(true);
  };

  const onPressEdit = (exercise: any) => {
    setSelectedExercise(exercise);
    setEditExerciseVisible(true);
  };

  const getExerciseData = async () => {
    const { data } = await supabase.from("Exercise").select("*");
    setExerciseData(data || []);
  };

  const saveExercise = async (exercise: any) => {
    await createExercise(exercise);
    await getExerciseData();
    setCreateExerciseVisible(false);
  };

  const updateExerciseData = async (exercise: any) => {
    await updateExercise(exercise.id, exercise);
    await getExerciseData();
    setEditExerciseVisible(false);
  };

  useEffect(() => {
    getExerciseData();
  }, []);

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
          {exerciseData.map((exercise) => (
            <TickCard
              key={exercise.id}
              title={exercise.name}
              imageSource={exercise.image_url}
              showTick={false}
              isCompleted={false}
              onPressCard={() => onPressCard(exercise)}
              onDelete={() => deleteExercise(exercise?.id)}
              onEdit={() => onPressEdit(exercise)}
            />
          ))}
        </View>
      </ScrollView>

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
        <ExerciseDetail
          exerciseName={selectedExercise?.name}
          imageUrl={selectedExercise?.image_url}
          videoUrl={selectedExercise?.video_url}
          onClose={closeExerciseDetail}
        />
      </Modal>

      <CreateEditExercise
        onCancel={() => setCreateExerciseVisible(false)}
        onSave={(exercise) => saveExercise(exercise)}
        visible={createExerciseVisible}
        mode="create"
      />

      <CreateEditExercise
        onCancel={() => setEditExerciseVisible(false)}
        onSave={(exercise) => updateExerciseData(exercise)}
        visible={editExerciseVisible}
        mode="edit"
        exercise={selectedExercise}
      />
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
    paddingBottom: 100,
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
