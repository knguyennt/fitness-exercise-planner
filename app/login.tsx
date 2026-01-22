import { AuthContext } from "@/utils/authContext";
import { useContext, useState } from "react";
import {
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginPage() {
  const authContext = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // You can add authentication logic here
    // For now, we'll just call the auth context login
    authContext.login();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FF6B6B" />
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>FITNESS</Text>
          <Text style={styles.subtitle}>LOGIN</Text>
        </View>

        {/* Login Form */}
        <View style={styles.formContainer}>
          {/* Username Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>USERNAME</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                placeholderTextColor="#666"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password Field */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                placeholderTextColor="#666"
                secureTextEntry={true}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            activeOpacity={0.8}
          >
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>

        {/* Decorative Elements */}
        <View style={styles.decorativeContainer}>
          <View style={styles.decorativeBox1} />
          <View style={styles.decorativeBox2} />
          <View style={styles.decorativeBox3} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF6B6B", // Bright coral red background
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    justifyContent: "center",
  },
  titleContainer: {
    alignItems: "center",
    marginBottom: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#000",
    textShadowColor: "#FFF",
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FFF",
    textShadowColor: "#000",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 0,
    marginTop: -8,
  },
  formContainer: {
    backgroundColor: "#FFF",
    borderWidth: 6,
    borderColor: "#000",
    padding: 32,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "800",
    color: "#000",
    marginBottom: 8,
    letterSpacing: 1,
  },
  inputWrapper: {
    borderWidth: 4,
    borderColor: "#000",
    backgroundColor: "#FFEB3B", // Bright yellow background
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    backgroundColor: "transparent",
  },
  loginButton: {
    backgroundColor: "#4ECDC4", // Bright teal
    borderWidth: 5,
    borderColor: "#000",
    paddingVertical: 20,
    paddingHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 6,
    marginTop: 16,
  },
  loginButtonText: {
    fontSize: 24,
    fontWeight: "900",
    color: "#000",
    textAlign: "center",
    letterSpacing: 2,
  },
  decorativeContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  decorativeBox1: {
    position: "absolute",
    top: 100,
    right: 20,
    width: 40,
    height: 40,
    backgroundColor: "#FFEB3B",
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    transform: [{ rotate: "15deg" }],
  },
  decorativeBox2: {
    position: "absolute",
    bottom: 150,
    left: 30,
    width: 60,
    height: 30,
    backgroundColor: "#4ECDC4",
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    transform: [{ rotate: "-20deg" }],
  },
  decorativeBox3: {
    position: "absolute",
    top: 200,
    left: 40,
    width: 30,
    height: 50,
    backgroundColor: "#FFF",
    borderWidth: 3,
    borderColor: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 3,
    transform: [{ rotate: "45deg" }],
  },
});
