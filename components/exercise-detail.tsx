import React from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface ExerciseDetailProps {
  onClose?: () => void;
  onBack?: () => void;
  exerciseName?: string;
  description?: string;
  notes?: string;
  imageUrl?: string;
  videoUrl?: string;
  difficulty?: "Easy" | "Medium" | "Hard";
  duration?: string;
}

export default function ExerciseDetail({
  onClose,
  onBack,
  exerciseName = "Sample Exercise",
  description = "This is a sample exercise description that will help you understand the movement and benefits.",
  notes = "Remember to maintain proper form and breathe consistently throughout the exercise.",
  imageUrl = "https://via.placeholder.com/300x200/000/fff?text=Exercise+Image",
  videoUrl = "https://via.placeholder.com/300x200/ff6b6b/fff?text=Video+Preview",
  difficulty = "Medium",
  duration = "30 seconds",
}: ExerciseDetailProps) {
  const { width, height } = Dimensions.get("window");
  const isTablet = width > 768;

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "Easy":
        return "#00ff88";
      case "Medium":
        return "#ffff00";
      case "Hard":
        return "#ff4757";
      default:
        return "#ffff00";
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack || (() => console.log("Back pressed"))}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { flex: 1, textAlign: "center" }]}>
          {exerciseName.toUpperCase()}
        </Text>
        {onClose && (
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Main Content */}
      <View style={[styles.mainContent, isTablet && styles.mainContentTablet]}>
        {/* Left Side - Image */}
        <View
          style={[styles.imageSection, isTablet && styles.imageSectionTablet]}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: imageUrl }}
              style={styles.exerciseImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay}>
              <Text style={styles.overlayText}>EXERCISE</Text>
            </View>
          </View>

          {/* Exercise Stats */}
          <View style={styles.statsContainer}>
            <View
              style={[
                styles.statBox,
                { backgroundColor: getDifficultyColor(difficulty) },
              ]}
            >
              <Text style={styles.statLabel}>DIFFICULTY</Text>
              <Text style={styles.statValue}>{difficulty.toUpperCase()}</Text>
            </View>
            <View style={[styles.statBox, { backgroundColor: "#00d4ff" }]}>
              <Text style={styles.statLabel}>DURATION</Text>
              <Text style={styles.statValue}>{duration.toUpperCase()}</Text>
            </View>
          </View>
        </View>

        {/* Right Side - Description and Video */}
        <View
          style={[
            styles.contentSection,
            isTablet && styles.contentSectionTablet,
          ]}
        >
          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>DESCRIPTION</Text>
            <Text style={styles.descriptionText}>{description}</Text>
          </View>

          {/* Notes */}
          <View style={styles.notesContainer}>
            <Text style={styles.sectionTitle}>NOTES</Text>
            <Text style={styles.notesText}>{notes}</Text>
          </View>

          {/* Video Section */}
          <View style={styles.videoContainer}>
            <Text style={styles.sectionTitle}>VIDEO DEMO</Text>
            <TouchableOpacity style={styles.videoPreview}>
              <Image
                source={{ uri: videoUrl }}
                style={styles.videoImage}
                resizeMode="cover"
              />
              <View style={styles.playButton}>
                <Text style={styles.playButtonText}>▶</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff6b6b",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#000",
    textShadowColor: "#fff",
    textShadowOffset: { width: 3, height: 3 },
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
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
  },
  backButton: {
    backgroundColor: "#00d4ff",
    width: 40,
    height: 40,
    borderRadius: 0,
    borderWidth: 4,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
  },
  mainContent: {
    flexDirection: "column",
    gap: 20,
  },
  mainContentTablet: {
    flexDirection: "row",
  },
  imageSection: {
    flex: 1,
  },
  imageSectionTablet: {
    flex: 0.45,
    marginRight: 20,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  exerciseImage: {
    width: "100%",
    height: 200,
    borderWidth: 6,
    borderColor: "#000",
    borderRadius: 0,
  },
  imageOverlay: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#ffff00",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 3,
    borderColor: "#000",
  },
  overlayText: {
    fontSize: 12,
    fontWeight: "900",
    color: "#000",
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  statBox: {
    flex: 1,
    padding: 12,
    borderWidth: 4,
    borderColor: "#000",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "900",
    color: "#000",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "900",
    color: "#000",
  },
  contentSection: {
    flex: 1,
  },
  contentSectionTablet: {
    flex: 0.55,
  },
  descriptionContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderWidth: 4,
    borderColor: "#000",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  notesContainer: {
    backgroundColor: "#ff9ff3",
    padding: 16,
    borderWidth: 4,
    borderColor: "#000",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "900",
    color: "#000",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    lineHeight: 20,
  },
  notesText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    lineHeight: 20,
    fontStyle: "italic",
  },
  videoContainer: {
    backgroundColor: "#54a0ff",
    padding: 16,
    borderWidth: 4,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  videoPreview: {
    position: "relative",
    height: 120,
    borderWidth: 3,
    borderColor: "#000",
  },
  videoImage: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    backgroundColor: "#ffff00",
    borderWidth: 3,
    borderColor: "#000",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  playButtonText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#000",
    marginLeft: 3,
  },
  actionButton: {
    backgroundColor: "#2ed573",
    padding: 16,
    borderWidth: 4,
    borderColor: "#000",
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000",
    textTransform: "uppercase",
  },
});
