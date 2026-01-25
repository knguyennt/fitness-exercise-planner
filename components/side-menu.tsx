import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SideMenuProps {
  onNavigate?: (route: string) => void;
  onClose?: () => void;
}

export default function SideMenu({ onNavigate, onClose }: SideMenuProps) {
  const handleNavigation = (route: string) => {
    onNavigate?.(route);
    onClose?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>NAVIGATION</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation("training-plan")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>TRAINING PLAN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation("exercise")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>EXERCISE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE066",
    borderRightWidth: 4,
    borderRightColor: "#000000",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: "#FF6B6B",
    borderWidth: 3,
    borderColor: "#000000",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 30,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000000",
    textAlign: "center",
    letterSpacing: 1,
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: "#4ECDC4",
    borderWidth: 3,
    borderColor: "#000000",
    paddingVertical: 16,
    paddingHorizontal: 24,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#000000",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
