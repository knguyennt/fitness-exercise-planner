import { Ionicons } from "@expo/vector-icons";
import { Tabs, router } from "expo-router";
import { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import SideMenu from "../../../components/side-menu";

export default function TabLayout() {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const handleNavigation = (route: string) => {
    if (route === "training-plan") {
      router.push("/");
    } else if (route === "exercise") {
      router.push("/exercise");
    }
  };

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Training Planning",
            headerTitleAlign: "center",
            tabBarLabel: "Home",
            headerLeft: () => (
              <TouchableOpacity
                onPress={handleMenuPress}
                style={{ marginLeft: 15 }}
              >
                <Ionicons name="menu" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Tabs.Screen
          name="exercise"
          options={{
            title: "Exercise",
            headerTitleAlign: "center",
            tabBarLabel: "Exercise",
            headerLeft: () => (
              <TouchableOpacity
                onPress={handleMenuPress}
                style={{ marginLeft: 15 }}
              >
                <Ionicons name="menu" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
      </Tabs>

      <Modal
        visible={menuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseMenu}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={handleCloseMenu}
            activeOpacity={1}
          />
          <View style={styles.menuContainer}>
            <SideMenu onNavigate={handleNavigation} onClose={handleCloseMenu} />
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlay: {
    flex: 1,
  },
  menuContainer: {
    width: "75%",
    maxWidth: 300,
  },
});
