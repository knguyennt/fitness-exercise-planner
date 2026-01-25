import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface SideMenuProps {
  onNavigate?: (route: string) => void;
  onClose?: () => void;
  onLogout?: () => void;
}

export default function SideMenu({
  onNavigate,
  onClose,
  onLogout,
}: SideMenuProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleNavigation = (route: string) => {
    onNavigate?.(route);
    onClose?.();
  };

  const handleProfilePress = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    setShowDropdown(false);
    onLogout?.();
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

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={handleProfilePress}
          activeOpacity={0.8}
        >
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <Text style={styles.username}>Username</Text>
        </TouchableOpacity>

        {/* Dropdown */}
        {showDropdown && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.8}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
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
    flex: 1,
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
  profileContainer: {
    marginTop: "auto",
    marginBottom: 20,
    position: "relative",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#95E1D3",
    borderWidth: 3,
    borderColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF9999",
    borderWidth: 2,
    borderColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#000000",
  },
  username: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: 0.5,
  },
  dropdown: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    right: 0,
    marginBottom: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    borderColor: "#000000",
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  logoutButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FF6B6B",
  },
  logoutText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000000",
    textAlign: "center",
    letterSpacing: 0.5,
  },
});
