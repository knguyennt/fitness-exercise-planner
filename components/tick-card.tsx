import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TickCardProps {
  title: string;
  imageSource?: any;
  reps?: number;
  sets?: number;
  isCompleted?: boolean;
  onToggleComplete?: (isCompleted: boolean) => void;
  onPressCard?: () => void;
}

export default function TickCard({
  title,
  imageSource,
  reps = 0,
  sets = 0,
  isCompleted = false,
  onToggleComplete,
  onPressCard,
}: TickCardProps) {
  const [checked, setChecked] = useState(isCompleted);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggleComplete?.(newChecked);
  };

  return (
    <View style={styles.container}>
      {/* Main card content - clickable */}
      <TouchableOpacity style={styles.cardContent} onPress={onPressCard}>
        {/* Image Box on Left */}
        <View style={styles.imageContainer}>
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>IMG</Text>
            </View>
          )}
        </View>

        {/* Content Area */}
        <View style={styles.contentContainer}>
          {/* Title */}
          <Text style={styles.title}>{title}</Text>

          {/* Reps and Sets Row */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>REPS</Text>
              <Text style={styles.statValue}>{reps}</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>SETS</Text>
              <Text style={styles.statValue}>{sets}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {/* Checkbox - Top Right - separate from card press */}
      <TouchableOpacity style={styles.checkboxContainer} onPress={handleToggle}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
          {checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#000000",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    position: "relative",
    shadowColor: "#000000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 0,
  },
  cardContent: {
    flexDirection: "row",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#F0F0F0",
    marginRight: 16,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0E0E0",
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666666",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statBox: {
    borderWidth: 2,
    borderColor: "#000000",
    backgroundColor: "#FFFF00",
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 60,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  checkboxContainer: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 3,
    borderColor: "#000000",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#00FF00",
  },
  checkmark: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
});
