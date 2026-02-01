import React, { useEffect, useState } from "react";
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Exercise {
  id?: string;
  created_at?: string;
  name: string;
  image_url: string;
  video_url: string;
  user_id?: string;
}

interface CreateEditExerciseProps {
  visible: boolean;
  mode?: "create" | "edit";
  exercise?: Exercise;
  onSave?: (exercise: Exercise) => void;
  onCancel: () => void;
}

const CreateEditExercise: React.FC<CreateEditExerciseProps> = ({
  visible,
  mode,
  exercise,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<Exercise>({
    name: "",
    image_url: "",
    video_url: "",
  });

  useEffect(() => {
    if (exercise && mode === "edit") {
      setFormData(exercise);
    } else {
      setFormData({
        name: "",
        image_url: "",
        video_url: "",
      });
    }
  }, [exercise, mode, visible]);

  const handleInputChange = (field: keyof Exercise, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.name.trim()) {
      Alert.alert("Error", "Exercise name is required");
      return;
    }

    onSave?.(formData);
  };

  const handleCancel = () => {
    setFormData({
      name: "",
      image_url: "",
      video_url: "",
    });
    onCancel?.();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Banner */}
            <View
              style={[
                styles.banner,
                mode === "create" ? styles.createBanner : styles.editBanner,
              ]}
            >
              <Text style={styles.bannerText}>
                {mode === "create" ? "+ CREATE EXERCISE" : "✏ EDIT EXERCISE"}
              </Text>
            </View>

            {/* Form Fields */}
            <View style={styles.formContainer}>
              {/* Exercise Name */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>EXERCISE NAME *</Text>
                <TextInput
                  style={styles.input}
                  value={formData.name}
                  onChangeText={(value) => handleInputChange("name", value)}
                  placeholder="Enter exercise name"
                  placeholderTextColor="#666"
                />
              </View>

              {/* Image URL */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>IMAGE URL</Text>
                <TextInput
                  style={styles.input}
                  value={formData.image_url}
                  onChangeText={(value) =>
                    handleInputChange("image_url", value)
                  }
                  placeholder="https://example.com/image.jpg"
                  placeholderTextColor="#666"
                  autoCapitalize="none"
                />
              </View>

              {/* Video URL */}
              <View style={styles.fieldContainer}>
                <Text style={styles.label}>VIDEO URL</Text>
                <TextInput
                  style={styles.input}
                  value={formData.video_url}
                  onChangeText={(value) =>
                    handleInputChange("video_url", value)
                  }
                  placeholder="https://youtube.com/watch?v=..."
                  placeholderTextColor="#666"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={handleSave}
              >
                <Text style={[styles.buttonText, styles.saveButtonText]}>
                  SAVE
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={[styles.buttonText, styles.cancelButtonText]}>
                  CANCEL
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  popup: {
    backgroundColor: "#FFFFFF",
    width: "100%",
    maxHeight: "90%",
    borderWidth: 4,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  scrollView: {
    flex: 1,
  },
  banner: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderBottomColor: "#000000",
  },
  createBanner: {
    backgroundColor: "#00FF00",
  },
  editBanner: {
    backgroundColor: "#FFD700",
  },
  bannerText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000000",
    textAlign: "center",
    letterSpacing: 1,
  },
  formContainer: {
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "800",
    color: "#000000",
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    shadowColor: "#000000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 3,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  saveButton: {
    backgroundColor: "#FF6B6B",
  },
  cancelButton: {
    backgroundColor: "#E0E0E0",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
  saveButtonText: {
    color: "#FFFFFF",
  },
  cancelButtonText: {
    color: "#000000",
  },
});

export default CreateEditExercise;
