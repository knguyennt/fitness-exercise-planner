import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TickCardProps {
  title: string;
  imageSource?: any;
  reps?: number;
  sets?: number;
  isCompleted?: boolean;
  showTick?: boolean;
  allowEdit?: boolean;
  onToggleComplete?: (isCompleted: boolean) => void;
  onPressCard?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TickCard({
  title,
  imageSource,
  reps = 0,
  sets = 0,
  isCompleted = false,
  showTick = true,
  onToggleComplete,
  onPressCard,
  onEdit,
  onDelete,
  allowEdit = true,
}: TickCardProps) {
  const [checked, setChecked] = useState(isCompleted);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggleComplete?.(newChecked);
  };

  const handleMenuPress = () => {
    setShowDropdown(!showDropdown);
  };

  const handleEdit = () => {
    setShowDropdown(false);
    onEdit?.();
  };

  const handleDelete = () => {
    setShowDropdown(false);
    onDelete?.();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.cardContent} onPress={onPressCard}>
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

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{title}</Text>

          <View style={styles.statsRow}>
            {reps > 0 && (
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>REPS</Text>
                <Text style={styles.statValue}>{reps}</Text>
              </View>
            )}
            {sets > 0 && (
              <View style={styles.statBox}>
                <Text style={styles.statLabel}>SETS</Text>
                <Text style={styles.statValue}>{sets}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>

      {showTick && (
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={handleToggle}
        >
          <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
            {checked && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.menuContainer} onPress={handleMenuPress}>
        <Text style={styles.menuDots}>⋮</Text>
      </TouchableOpacity>

      {showDropdown && (
        <View style={styles.dropdown}>
          {allowEdit && (
            <TouchableOpacity style={styles.dropdownItem} onPress={handleEdit}>
              <Text style={styles.dropdownText}>Edit</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.dropdownItem} onPress={handleDelete}>
            <Text style={styles.dropdownText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
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
    bottom: 16,
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
  menuContainer: {
    position: "absolute",
    top: 12,
    right: 12,
    zIndex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  menuDots: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    lineHeight: 24,
    textAlign: "center",
  },
  dropdown: {
    position: "absolute",
    top: 56,
    right: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    zIndex: 10,
    borderRadius: 4, // Added slight rounding for modern look
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    minWidth: 100,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    textAlign: "center",
  },
});
