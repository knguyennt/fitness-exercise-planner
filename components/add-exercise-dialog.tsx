import { useExercise } from "@/hooks/useExercise";
import { Exercise } from "@/utils/exerciseService";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface AddExerciseDialogProps {
  visible: boolean;
  onClose: () => void;
  onAddExercises: (selectedExerciseIds: string[]) => void;
  sessionId: string;
}

export default function AddExerciseDialog({
  visible,
  onClose,
  onAddExercises,
  sessionId,
}: AddExerciseDialogProps) {
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const { exercises, loading } = useExercise();
  const { width } = Dimensions.get("window");
  const isTablet = width > 768;

  useEffect(() => {
    if (visible) {
      setSelectedExercises([]);
    }
  }, [visible]);

  const toggleExerciseSelection = (exerciseId: string) => {
    setSelectedExercises((prev) =>
      prev.includes(exerciseId)
        ? prev.filter((id) => id !== exerciseId)
        : [...prev, exerciseId],
    );
  };

  const handleAddSelected = () => {
    if (selectedExercises.length > 0) {
      onAddExercises(selectedExercises);
      onClose();
    }
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => {
    if (!item.id) return null;

    const isSelected = selectedExercises.includes(item.id);

    return (
      <TouchableOpacity
        style={[
          styles.exerciseItem,
          isSelected && styles.exerciseItemSelected,
          isTablet && styles.exerciseItemTablet,
        ]}
        onPress={() => toggleExerciseSelection(item.id!)}
      >
        <Image
          source={{ uri: item.image_url }}
          style={styles.exerciseImage}
          resizeMode="cover"
        />
        <View style={styles.exerciseInfo}>
          <Text
            style={[
              styles.exerciseName,
              isSelected && styles.exerciseNameSelected,
            ]}
          >
            {item.name}
          </Text>
          {isSelected && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.modalContainer,
            isTablet && styles.modalContainerTablet,
          ]}
        >
          <View style={styles.header}>
            <Text style={styles.title}>SELECT EXERCISES</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.listContainer}>
            {loading ? (
              <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading exercises...</Text>
              </View>
            ) : exercises.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No exercises available</Text>
                <Text style={styles.emptySubtext}>
                  Create some exercises first in the Exercise tab
                </Text>
              </View>
            ) : (
              <FlatList
                data={exercises.filter((exercise) => exercise.id)} // Filter out exercises without IDs
                renderItem={renderExerciseItem}
                keyExtractor={(item) => item.id!}
                numColumns={isTablet ? 2 : 1}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
              />
            )}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.selectedCount}>
              {selectedExercises.length} exercise(s) selected
            </Text>
            <View style={styles.footerButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.addButton,
                  selectedExercises.length === 0 && styles.addButtonDisabled,
                ]}
                onPress={handleAddSelected}
                disabled={selectedExercises.length === 0}
              >
                <Text
                  style={[
                    styles.addButtonText,
                    selectedExercises.length === 0 &&
                      styles.addButtonTextDisabled,
                  ]}
                >
                  ADD SELECTED
                </Text>
              </TouchableOpacity>
            </View>
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
  },
  modalContainer: {
    backgroundColor: "#f8f4ff",
    margin: 20,
    borderRadius: 0,
    borderWidth: 6,
    borderColor: "#000",
    minHeight: 600,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  modalContainerTablet: {
    width: "70%",
    maxWidth: 600,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#6b46c1",
    borderBottomWidth: 4,
    borderBottomColor: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  closeButton: {
    backgroundColor: "#ff4757",
    width: 40,
    height: 40,
    borderRadius: 0,
    borderWidth: 4,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#fff",
  },
  listContainer: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
  exerciseItem: {
    backgroundColor: "#fff",
    borderWidth: 4,
    borderColor: "#000",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  exerciseItemTablet: {
    flex: 1,
    marginHorizontal: 6,
  },
  exerciseItemSelected: {
    backgroundColor: "#2ed573",
    borderColor: "#000",
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: "#000",
    marginRight: 12,
  },
  exerciseInfo: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000",
    flex: 1,
  },
  exerciseNameSelected: {
    color: "#fff",
  },
  checkmark: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#2ed573",
  },
  footer: {
    padding: 20,
    borderTopWidth: 4,
    borderTopColor: "#000",
    backgroundColor: "#fff",
  },
  selectedCount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  footerButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 4,
    borderColor: "#000",
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#2ed573",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 4,
    borderColor: "#000",
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  addButtonDisabled: {
    backgroundColor: "#ccc",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#fff",
  },
  addButtonTextDisabled: {
    color: "#999",
  },
});
